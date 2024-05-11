'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdersDetails.init({
    id: DataTypes.UUID,
    order_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    logistic_id: DataTypes.STRING,
    address_id: DataTypes.STRING,
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