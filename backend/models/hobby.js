'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hobby extends Model {
    static associate(models) {
      Hobby.belongsTo(models.Resume, { foreignKey: 'resumeId' });
    }
  }
  Hobby.init(
    {
      resumeId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Hobby',
    },
  );
  return Hobby;
};
