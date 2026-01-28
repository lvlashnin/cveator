'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      Skill.belongsTo(models.Resume, { foreignKey: 'resumeId' });
    }
  }
  Skill.init(
    {
      resumeId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Skill',
    },
  );
  return Skill;
};
