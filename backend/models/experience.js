'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    static associate(models) {
      Experience.belongsTo(models.Resume, { foreignKey: 'resumeId' });
    }
  }
  Experience.init(
    {
      resumeId: DataTypes.INTEGER,
      company: DataTypes.STRING,
      role: DataTypes.STRING,
      duration: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Experience',
    },
  );
  return Experience;
};
