'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('m_subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      study_program_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_study_programs', key: 'id' }
      },
      name: {
        type: Sequelize.STRING(60)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('m_subjects', ['study_program']));    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('m_subjects');
  }
};