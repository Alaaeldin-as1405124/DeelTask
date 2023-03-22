const { Job, Contract, Profile, sequelize } = require("../models/models");
const { Op } = require("sequelize");
const { ProfileType, ContractStatus } = require("../enums/enums");

class JobsRepo {
  async getUnPaidJobs(profile) {
    const { id, type } = profile?.dataValues;

    return await Job.findAll({
      include: [
        {
          model: Contract,
          as: "Contract",
          where: {
            [type === ProfileType.CLIENT ? "ClientId" : "ContractorId"]: id,
            status: { [Op.ne]: ContractStatus.TERMINATED },
            "$Job.paid$": null,
          },
          required: true, // Only return jobs with matching contracts
        },
      ],
    });
  }
  async pay(profile, jobId) {
    const { id, type } = profile?.dataValues;

    return await sequelize.transaction(async (transaction) => {
      //find the client, and lock update
      const client = await Profile.findByPk(id, {
        lock: transaction.LOCK.UPDATE,
      });

      //find the job and lock updating
      const job = await Job.findByPk(jobId, {
        include: [
          {
            model: Contract,
            include: [
              { model: Profile, as: "Contractor" },
              { model: Profile, as: "Client", lock: transaction.LOCK.UPDATE },
            ],
          },
        ],
        lock: transaction.LOCK.UPDATE,
      });

      if (job.paid === true) {
        throw new Error("You can not pay a job which is already paid.");
      }
      //check the balance condition
      if (client.balance < job.price) {
        throw new Error("Insufficient funds.");
      }

      //deduct the balance with the job price
      client.balance -= job.price;
      //move the amount to the contractor balance
      job.Contract.Contractor.balance += job.price;
      //change job payment status
      job.paid = true;
      //assign payment date
      job.paymentDate = new Date();
      //update & return all in the same transaction
      return await Promise.all([
        client.save({ transaction }),
        job.save({ transaction }),
        job.Contract.Client.save({ transaction }),
        job.Contract.Contractor.save({ transaction }),
      ]);
    });
  }
}

module.exports = new JobsRepo();
