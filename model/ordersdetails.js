'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrdersDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `model/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrdersDetails.belongsTo(models.Orders, {
                foreignKey: 'order_id',
                as: 'order'
            })

            OrdersDetails.belongsTo(models.Products, {
                foreignKey: 'product_id',
                as: 'product'
            })

            OrdersDetails.belongsTo(models.Logistics, {
                foreignKey: 'logistic_id',
                as: 'logistic'
            })

            OrdersDetails.belongsTo(models.Address, {
                foreignKey: 'address_id',
                as: 'address'
            })

        }
    }

    OrdersDetails.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        order_id: DataTypes.STRING,
        product_id: DataTypes.UUID,
        logistic_id: DataTypes.UUID,
        address_id: DataTypes.UUID,
        quantity: DataTypes.INTEGER,
        order_status: DataTypes.ENUM(
            'processing',
            'awaiting_shipped',
            'shipped',
            'awaiting_payment',
            'order_completed',
            'canceled',
            'refunded',
            'failed'),
        unit_price: DataTypes.DECIMAL,
        received_at: DataTypes.BIGINT,
        is_received: DataTypes.BOOLEAN,
        created_at: DataTypes.BIGINT,
        updated_at: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'OrdersDetails',
        tableName: 'orders_details',
        underscored: true,
        timestamps: false

    });
    return OrdersDetails;
};