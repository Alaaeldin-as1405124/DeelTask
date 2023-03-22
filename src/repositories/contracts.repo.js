const { Contract } = require("../models/models");
const { Op } = require("sequelize");
const { ProfileType, ContractStatus } = require("../enums/enums");

class ContractsRepo {
  async getContractById(profile, contractId) {
    const { id, type } = profile?.dataValues;
    const whereClause = {
      id: contractId,
      [type === ProfileType.CLIENT ? "ClientId" : "ContractorId"]: id,
    };
    return await Contract.findOne({ where: whereClause });
  }

  async getContracts(profile) {
    const { id, type } = profile?.dataValues;
    const whereClause = {
      status: { [Op.ne]: ContractStatus.TERMINATED },
      [type === ProfileType.CLIENT ? "ClientId" : "ContractorId"]: id,
    };
    return await Contract.findAll({ where: whereClause });
  }
}

module.exports = new ContractsRepo();
