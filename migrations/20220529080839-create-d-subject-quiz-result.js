'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_subject_quiz_results', {
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
      learner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_learners', key: 'id' }
      },
      lecturer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_lecturers', key: 'id' }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_subjects', key: 'id' }
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        references: { model: 'd_subject_quizzes', key: 'id' }
      },
      answer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'd_subject_quiz_answers', key: 'id' }
      },
      correct: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('d_subject_quiz_results');
  }
};