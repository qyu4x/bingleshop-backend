'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        return Promise.all([
            queryInterface.addColumn(
                'users',
                'otp_is_active',
                {
                    allowNull: true,
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                }
            ),
            queryInterface.addColumn(
                'users',
                'otp_code',
                {
                    allowNull: true,
                    type: Sequelize.STRING
                }
            ),
            queryInterface.addColumn(
                'users',
                'otp_validation_expired_at',
                {
                    allowNull: true,
                    type: Sequelize.BIGINT
                }
            ),
            queryInterface.addColumn(
                'users',
                'avatar_url',
                {
                    allowNull: true,
                    type: Sequelize.STRING
                }
            ),

        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return Promise.all([
            queryInterface.removeColumn('users', 'otp_is_active'),
            queryInterface.removeColumn('users', 'otp_code'),
            queryInterface.removeColumn('users', 'otp_validation_expired_at'),
            queryInterface.removeColumn('users', 'avatar_url'),
        ])
    }
};
