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
    }
  }
  Orders.init({
    id: DataTypes.UUID,
    user_id: DataTypes.STRING,
    payment_method_id: DataTypes.STRING,
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