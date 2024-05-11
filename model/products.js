'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `model/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    id: DataTypes.UUID,
    categories_id: DataTypes.STRING,
    sub_categories_id: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    is_preorder: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'products',
    underscored: true,
    timestamps: false
  });
  return Products;
};