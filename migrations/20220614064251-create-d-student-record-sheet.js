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
        type: Sequelize.INTEGER
      },
      subject_id: {
        type: Sequelize.INTEGER
      },
      learner_id: {
        type: Sequelize.INTEGER
      },
      datetime: {
        type: Sequelize.DATE
      },
      catatan: {
        type: Sequelize.STRING(225)
      },
      keterangan: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('d_student_record_sheets');
  }
};