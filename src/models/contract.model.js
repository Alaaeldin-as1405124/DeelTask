const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Profile = require("./profile.model");
const { ContractStatus } = require("../enums/enums");

class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(
        ContractStatus.NEW,
        ContractStatus.IN_PROGRESS,
        ContractStatus.TERMINATED
      ),
    },
  },
  {
    sequelize,
    modelName: "Contract",
  }
);

Profile.hasMany(Contract, { as: "Contractor", foreignKey: "ContractorId" });
Contract.belongsTo(Profile, { as: "Contractor" });
Profile.hasMany(Contract, { as: "Client", foreignKey: "ClientId" });
Contract.belongsTo(Profile, { as: "Client" });

module.exports = Contract;
