'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(60)
      },
      username: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(60)
      },
      password: {
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
    }).then(() => queryInterface.addIndex('users', ['role_id']));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};