'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'Users',
        {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          username: { type: Sequelize.STRING, allowNull: false },
          loginEmail: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          passwordHash: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },

        {
          transaction,
        },
      );

      await queryInterface.createTable(
        'PersonalDetails',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          fullName: { type: Sequelize.STRING },
          workEmail: { type: Sequelize.STRING },
          phone: { type: Sequelize.STRING },
          address: { type: Sequelize.STRING },
          linkedin: { type: Sequelize.STRING },
          github: { type: Sequelize.STRING },
          website: { type: Sequelize.STRING },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Resumes',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'My Resume',
          },
          summary: { type: Sequelize.TEXT },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Experiences',
        {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          resumeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Resumes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          company: { type: Sequelize.STRING },
          role: { type: Sequelize.STRING },
          duration: { type: Sequelize.STRING },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Educations',
        {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          resumeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Resumes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          university: { type: Sequelize.STRING },
          degree: { type: Sequelize.STRING },
          startDate: { type: Sequelize.DATEONLY },
          endDate: { type: Sequelize.DATEONLY },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Skills',
        {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          resumeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Resumes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          name: { type: Sequelize.STRING },
          level: { type: Sequelize.STRING },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Languages',
        {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          resumeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Resumes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          language: { type: Sequelize.STRING },
          level: { type: Sequelize.STRING },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Hobbies',
        {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          resumeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Resumes', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          name: { type: Sequelize.STRING },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
        },
        { transaction },
      );
      await queryInterface.addIndex('Users', ['loginEmail'], {
        unique: true,
        name: 'users_login_email_unique',
        transaction,
      });

      await queryInterface.addIndex('PersonalDetails', ['userId'], {
        unique: true,
        name: 'personal_details_user_id_unique',
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hobbies');
    await queryInterface.dropTable('Languages');
    await queryInterface.dropTable('Skills');
    await queryInterface.dropTable('Educations');
    await queryInterface.dropTable('Experiences');
    await queryInterface.dropTable('Resumes');
    await queryInterface.dropTable('PersonalDetails');
    await queryInterface.dropTable('Users');
  },
};
