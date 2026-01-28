'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.PersonalDetails, {
        foreignKey: 'userId',
        as: 'personalDetails',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Resume, {
        foreignKey: 'userId',
        as: 'resumes',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      loginEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
