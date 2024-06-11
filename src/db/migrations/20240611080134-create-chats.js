'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id_sender: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      user_id_recipient: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      read_at: {
        type: Sequelize.BIGINT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: Date.now()
      },
      updated_at: {
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};