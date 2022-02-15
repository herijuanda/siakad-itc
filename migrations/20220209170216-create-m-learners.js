'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('m_learners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      school_year_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_school_years', key: 'id' }
      },
      study_program_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_study_programs', key: 'id' }
      },
      register_number: {
        type: Sequelize.STRING(20)
      },
      name: {
        type: Sequelize.STRING(60)
      },
      place_of_birth: {
        type: Sequelize.STRING(40)
      },
      date_of_birth: {
        type: Sequelize.DATEONLY
      },
      gender_id: {
        type: Sequelize.INTEGER
      },
      religion: {
        type: Sequelize.STRING(30)
      },
      address: {
        type: Sequelize.TEXT
      },
      postal_code: {
        type: Sequelize.INTEGER
      },
      phone_number: {
        type: Sequelize.STRING(15)
      },
      parent_name: {
        type: Sequelize.STRING(60)
      },
      parent_job: {
        type: Sequelize.STRING(40)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('m_learners');
  }
};