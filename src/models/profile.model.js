const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const { ProfileType } = require("../enums/enums");

class Profile extends Sequelize.Model {}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
    },
    type: {
      type: Sequelize.ENUM(ProfileType.CLIENT, ProfileType.CONTRACTOR, ProfileType.ADMIN),
    },
  },
  {
    sequelize,
    modelName: "Profile",
  }
);

module.exports = Profile;
