'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders_details', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            order_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            product_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            logistic_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            address_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            order_status: {
                type: Sequelize.ENUM(
                    'processing',
                    'awaiting_shipped',
                    'shipped',
                    'awaiting_payment',
                    'order_completed',
                    'canceled',
                    'refunded',
                    'failed'),
                allowNull: false,
                defaultValue: 'awaiting_payment'
            },
            unit_price: {
                type: Sequelize.DECIMAL
            },
            received_at: {
                type: Sequelize.BIGINT
            },
            is_received: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('orders_details');
    }
};