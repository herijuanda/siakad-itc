'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_learner_values', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classroom_id: {
        type: Sequelize.INTEGER,
        references: { model: 'd_classrooms', key: 'id' }
      },
      classroom_learner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'd_classroom_learners', key: 'id' }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_subjects', key: 'id' }
      },
      lecturer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_lecturers', key: 'id' }
      },
      learner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_learners', key: 'id' }
      },
      absen: {
        type: Sequelize.INTEGER
      },
      tugas: {
        type: Sequelize.INTEGER
      },
      midterm: {
        type: Sequelize.INTEGER
      },
      sikap: {
        type: Sequelize.INTEGER
      },
      final: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('d_learner_values');
  }
};