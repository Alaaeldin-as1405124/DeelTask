const { Job, Contract, Profile, sequelize } = require("../models/models");
const { ContractStatus } = require("../enums/enums");

class BalanceRepo {
  async depositBalance(profile, depositAmount) {
    const { id, type } = profile?.dataValues;
    const MAX_DEPOSIT_PERCENTAGE = 25; //max deposit precentage allowed

    return sequelize.transaction(async (t) => {
      const client = await Profile.findByPk(id, {
        lock: t.LOCK.UPDATE,
      });

      const jobsToPay = await Job.sum("price", {
        include: [
          {
            model: Contract,
            where: {
              ClientId: id,
              status: ContractStatus.IN_PROGRESS,
              "$Job.paid$": null,
            },
          },
        ],
        transaction: t,
      });

      const maxDepositAmount = jobsToPay * (MAX_DEPOSIT_PERCENTAGE / 100);
      if (maxDepositAmount === 0) {
        throw new Error(
          `You can not Deposit money because there is no unpaid jobs`
        );
      }

      if (depositAmount > maxDepositAmount) {
        throw new Error(
          `Deposit amount exceeds the maximum allowed. Your deposit should not exceed ${maxDepositAmount}`
        );
      }

      const updatedBalance = client.balance + depositAmount;

      return await client.update(
        { balance: updatedBalance },
        { transaction: t }
      );
    });
  }
}

module.exports = new BalanceRepo();
