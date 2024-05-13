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
        token: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
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