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
      semester_id: {
        type: Sequelize.INTEGER,
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
    }).then(() => queryInterface.addIndex('m_subjects', ['semester_id']));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('m_subjects');
  }
};