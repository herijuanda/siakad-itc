'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_classrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING(15)
      },
      school_year_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_school_years', key: 'id' }
      },
      study_program_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_study_programs', key: 'id' }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_subjects', key: 'id' }
      },
      lecturer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'm_lecturers', key: 'id' }
      },
      name: {
        type: Sequelize.STRING(30)
      },
      actived: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
    // }).then(() => { 
    //   queryInterface.addIndex('d_classrooms', 
    //                                 [
    //                                   'school_year_id', 
    //                                   'study_program_id',
    //                                 ]);
    //   queryInterface.addIndex('d_classrooms', 
    //                                 [
    //                                   'subject_id',
    //                                   'lecturer_id'
    //                                 ]);
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('d_classrooms');
  }
};