'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_classroom_learners', {
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
      learner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_learners', key: 'id' }
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
    await queryInterface.dropTable('d_classroom_learners');
  }
};