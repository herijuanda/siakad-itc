'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('d_student_record_sheets', {
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
      // classroom_learner_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'd_classroom_learners', key: 'id' }
      // },
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
      datetime: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('d_student_record_sheets');
  }
};