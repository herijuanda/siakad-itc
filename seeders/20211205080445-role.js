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
        name: 'Superadmin',
        slug: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        slug: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Instruktur',
        slug: 'instruktur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peserta Didik',
        slug: 'peserta-didik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pembimbing OJT',
        slug: 'pembimbing-ojt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    return queryInterface.bulkInsert('roles', values);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('roles', null, {});
  }
};
