'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_classroom_timetables', {
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
      // timetable: {
      //   type: Sequelize.DATE
      // },
      day_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_days', key: 'id' }
      },
      time_first: {
        type: Sequelize.TIME,
      },
      time_last: {
        type: Sequelize.TIME,
      },
      room: {
        type: Sequelize.STRING(100)
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
    await queryInterface.dropTable('d_classroom_timetables');
  }
};