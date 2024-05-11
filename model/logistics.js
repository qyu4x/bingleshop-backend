'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `model/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logistics.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    payment_fees_permile: DataTypes.DECIMAL,
    logo_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Logistics',
    tableName: 'logistics',
    underscored: true,
    timestamps: false
  });
  return Logistics;
};