'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('addresses', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            user_id: {
                allowNull: false,
                type: Sequelize.UUID
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phone_number: {
                allowNull: false,
                type: Sequelize.STRING
            },
            street: {
                allowNull: false,
                type: Sequelize.STRING
            },
            province: {
                allowNull: false,
                type: Sequelize.STRING
            },
            city: {
                allowNull: false,
                type: Sequelize.STRING
            },
            district: {
                allowNull: false,
                type: Sequelize.STRING
            },
            postal_code: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            is_main_address: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_active: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: true
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
        await queryInterface.dropTable('addresses');
    }
};