'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            category_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            sub_category_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL,
                defaultValue: 0.00
            },
            stock: {
                type: Sequelize.INTEGER
            },
            is_preorder: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('products');
    }
};