'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `model/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Address, {
                foreignKey: 'user_id',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'addresses'

            })

            User.hasMany(models.Orders, {
                foreignKey: 'user_id',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'orders'
            })

            User.hasMany(models.Chat, {
                foreignKey: 'user_id_sender',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'senders'
            })

            User.hasMany(models.Chat, {
                foreignKey: 'user_id_recipient',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'recipients'
            })
        }
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        username: DataTypes.UUID,
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        role: DataTypes.ENUM('USER', 'ADMIN'),
        is_active: DataTypes.BOOLEAN,
        otp_is_active: DataTypes.BOOLEAN,
        otp_code: DataTypes.STRING,
        otp_validation_expired_at: DataTypes.BIGINT,
        avatar_url: DataTypes.STRING,
        created_at: DataTypes.BIGINT,
        updated_at: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        timestamps: false
    });
    return User;
};