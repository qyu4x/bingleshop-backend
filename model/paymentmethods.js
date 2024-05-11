'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `model/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentMethods.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    payment_fees: DataTypes.DECIMAL,
    logo_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'PaymentMethods',
    tableName: 'payment_methods',
    underscored: true,
    timestamps: false
  });
  return PaymentMethods;
};