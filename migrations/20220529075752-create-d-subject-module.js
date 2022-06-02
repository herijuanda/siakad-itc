'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_subject_modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lecturer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_lecturers', key: 'id' }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_subjects', key: 'id' }
      },
      name: {
        type: Sequelize.STRING(50)
      },
      file: {
        type: Sequelize.STRING(225)
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
    await queryInterface.dropTable('d_subject_modules');
  }
};