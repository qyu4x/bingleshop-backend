'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            payment_method_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            total_price: {
                type: Sequelize.DECIMAL
            },
            payment_status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            payment_date: {
                type: Sequelize.BIGINT
            },
            note: {
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
        await queryInterface.dropTable('orders');
    }
};