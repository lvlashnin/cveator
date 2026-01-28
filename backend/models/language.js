'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.belongsTo(models.Resume, {
        foreignKey: 'resumeId',
        onDelete: 'CASCADE',
      });
    }
  }
  Language.init(
    {
      language: DataTypes.STRING,
      level: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Language',
    },
  );
  return Language;
};
