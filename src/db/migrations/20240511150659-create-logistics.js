'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('logistics', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payment_fees_permile: {
                type: Sequelize.DECIMAL,
                allowNull: false,
                defaultValue: 0.00
            },
            logo_url: {
                type: Sequelize.STRING
            },
            is_active: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            description: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('logistics');
    }
};