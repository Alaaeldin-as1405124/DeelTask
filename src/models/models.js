const sequelize = require("../database/sequelize");
const Profile = require("./profile.model");
const Contract = require("./contract.model");
const Job = require("./job.model");

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
