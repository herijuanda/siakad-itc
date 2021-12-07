'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      school_year_id: {
        type: Sequelize.INTEGER
      },
      semester_id: {
        type: Sequelize.INTEGER
      },
      lecturer_id: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING(15)
      },
      classroom: {
        type: Sequelize.STRING(30)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('d_subjects', 
                                    [
                                      'school_year_id', 
                                      'semester_id', 
                                      'lecturer_id'
                                    ]));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('d_subjects');
  }
};