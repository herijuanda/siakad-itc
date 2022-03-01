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
      role_id: 1,
      name: 'Superadmin',
      username: 'superadmin',
      email: 'superadmin@siakad.com',
      password: '$2y$10$VerQyWU6c8EWhNthk1gtnuvYvOdwiB/cyj8Vl36s4JZVI7xPwMcNq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role_id: 2,
      name: 'Admin',
      username: 'admin',
      email: 'admin@siakad.com',
      password: '$2y$10$VerQyWU6c8EWhNthk1gtnuvYvOdwiB/cyj8Vl36s4JZVI7xPwMcNq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  return queryInterface.bulkInsert('users', values);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('users', null, {});
  }
};
