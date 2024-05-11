'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubCategories.init({
    id: DataTypes.UUID,
    parent_categories_id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'SubCategories',
    tableName: 'sub_categories',
    underscored: true,
    timestamps: false
  });
  return SubCategories;
};