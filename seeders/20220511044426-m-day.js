'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const values = [
      {
        english: 'Monday',
        indonesian: 'Senin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        english: 'Tuesday',
        indonesian: 'Selasa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        english: 'Wednesday',
        indonesian: 'Rabu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        english: 'Thursday',
        indonesian: 'Kamis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        english: 'Friday',
        indonesian: 'Jum\'at',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        english: 'Saturday',
        indonesian: 'Sabtu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        english: 'Sunday',
        indonesian: 'Minggu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    return queryInterface.bulkInsert('m_days', values);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('m_days', null, {});
  }
};
