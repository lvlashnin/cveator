'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Resume, { foreignKey: 'resumeId' });
    }
  }
  Education.init(
    {
      resumeId: DataTypes.INTEGER,
      university: DataTypes.STRING,
      degree: DataTypes.STRING,
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Education',
      tableName: 'Educations',
    },
  );
  return Education;
};
