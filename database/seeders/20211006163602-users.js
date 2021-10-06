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
   await queryInterface.bulkInsert('Users', [
     {
       username: 'admin',
       password: '123123',
       email: 'adminz@gmail.com',
       phone: '+855964577771',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      username: 'editor',
      password: '123123',
      email: 'editor@gmail.com',
      phone: '+855964577772',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user',
      password: '123123',
      email: 'user@gmail.com',
      phone: '+855964577773',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
