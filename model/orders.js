'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `model/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Orders.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            })

            Orders.belongsTo(models.PaymentMethods, {
                foreignKey: 'payment_method_id',
                as: 'payment_method'
            })

            Orders.hasMany(models.OrdersDetails, {
                foreignKey: 'order_id',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'order_details'
            })
        }
    }

    Orders.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: DataTypes.UUID,
        payment_method_id: DataTypes.UUID,
        total_price: DataTypes.DECIMAL,
        payment_status: DataTypes.BOOLEAN,
        payment_date: DataTypes.BIGINT,
        note: DataTypes.TEXT,
        created_at: DataTypes.BIGINT,
        updated_at: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'Orders',
        tableName: 'orders',
        underscored: true,
        timestamps: false
    });
    return Orders;
};