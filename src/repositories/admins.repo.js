const { Profile, Job, Contract } = require("../models/models");
const { Op, fn, col, literal } = require("sequelize");
const { ProfileType } = require("../enums/enums");

class AdminsRepo {
  async getBestProfessions(startDate, endDate) {
    //Check if start date & end date are the same, then we need to update the end date to be at the end of the day time
    if (startDate.getTime() == endDate.getTime()) {
      endDate.setHours(23, 59, 59, 999);
    }

    return await Profile.findAll({
      where: {
        type: ProfileType.CONTRACTOR,
      },
      include: [
        {
          model: Contract,
          as: "Contractor", //because there are multiple associations
          include: [
            {
              model: Job,
              as: "Jobs",
              where: {
                paid: true,
                paymentDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              attributes: [], //exclude all attributes
            },
          ],
          attributes: [],
          required: true, //get only the matched items, so if the totalEarn = null, it won't return result
        },
      ],
      attributes: [
        "profession",
        [fn("SUM", col("Contractor.Jobs.price")), "totalEarned"],
      ],
      group: ["profession"],
      order: [[literal("totalEarned"), "DESC"]],
      limit: 1,
      subQuery: false, //to avoid applying the limit to the sub queries
    });
  }
  async getBestClients(startDate, endDate, limit = 2) {
    //Check if start date & end date are the same, then we need to update the end date to be at the end of the day time
    if (startDate.getTime() == endDate.getTime()) {
      endDate.setHours(23, 59, 59, 999);
    }

    return await Profile.findAll({
      where: {
        type: ProfileType.CLIENT,
      },
      include: [
        {
          model: Contract,
          as: "Client", //because there are multiple associations
          include: [
            {
              model: Job,
              as: "Jobs",
              where: {
                paid: true,
                paymentDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              attributes: [], //exclude all attributes
            },
          ],
          attributes: [], //exclude all attributes
          required: true,
        },
      ],
      group: ["Profile.id"], //group by each client
      // raw: true,
      attributes: [
        "id",
        [
          literal(`coalesce(firstName, '') || ' ' || coalesce(lastName, '')`),
          "fullName",
        ], //we can use it without coalesce, but for null safety issues
        [fn("SUM", col("Client.Jobs.price")), "paid"],
      ],
      order: [[literal("paid"), "DESC"]],
      limit,
      subQuery: false,
    });
  }
}

module.exports = new AdminsRepo();
