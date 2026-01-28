'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate(models) {
      Resume.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      Resume.hasMany(models.Experience, {
        foreignKey: 'resumeId',
        as: 'experiences',
        onDelete: 'CASCADE',
      });
      Resume.hasMany(models.Education, {
        foreignKey: 'resumeId',
        as: 'educations',
        onDelete: 'CASCADE',
      });
      Resume.hasMany(models.Skill, { foreignKey: 'resumeId', as: 'skills', onDelete: 'CASCADE' });
      Resume.hasMany(models.Language, {
        foreignKey: 'resumeId',
        as: 'languages',
        onDelete: 'CASCADE',
      });
      Resume.hasMany(models.Hobby, {
        foreignKey: 'resumeId',
        as: 'hobbies',
        onDelete: 'CASCADE',
      });
    }
  }
  Resume.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled Resume',
      },
      summary: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Resume',
    },
  );
  return Resume;
};
