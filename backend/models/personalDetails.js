'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonalDetails extends Model {
    static associate(models) {
      PersonalDetails.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  PersonalDetails.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      fullName: DataTypes.STRING,
      workEmail: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      github: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PersonalDetails',
    },
  );

  return PersonalDetails;
};
