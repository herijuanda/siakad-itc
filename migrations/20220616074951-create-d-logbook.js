'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('d_logbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentoring_id: {
        type: Sequelize.INTEGER,
        references: { model: 'd_mentorings', key: 'id' }
      },
      date: {
        type: Sequelize.DATE,
      },
      time_in: {
        type: Sequelize.TIME,
      },
      time_out: {
        type: Sequelize.TIME,
      },
      event: {
        type: Sequelize.STRING
      },
      problem: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      score: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('d_logbooks');
  }
};