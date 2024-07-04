'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ProductImages.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'product'
      })
    }
  }
  ProductImages.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    product_id: DataTypes.UUID,
    sequence: DataTypes.INTEGER,
    url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'ProductImages',
    tableName: 'product_images',
    underscored: true,
    timestamps: false
  });
  return ProductImages;
};