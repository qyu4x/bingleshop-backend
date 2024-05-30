'use strict';

const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const role = require('../../helper/role.helper');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        username: 'shironeko',
        full_name: 'Admin Shiro Neko',
        email: 'shironeko@bingleshop.com',
        password: await bcrypt.hash('nekonyan', 10),
        birth_date: '2000-10-10',
        role: role.admin,
        is_active: true,
        created_at: Date.now()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
