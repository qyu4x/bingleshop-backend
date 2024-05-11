'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sub_categories', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            category_id: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('sub_categories');
    }
};