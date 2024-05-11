'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `model/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    id: DataTypes.UUID,
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    street: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    is_main_address: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    underscored: true,
    timestamps: false
  });
  return Address;
};