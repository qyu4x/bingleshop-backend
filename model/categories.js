'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `model/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Categories.hasMany(models.SubCategories, {
                foreignKey: 'category_id',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'sub_categories'
            })

            Categories.hasMany(models.Products, {
                foreignKey: 'category_id',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'product'
            })

        }
    }

    Categories.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.BIGINT,
        updated_at: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'Categories',
        tableName: 'categories',
        underscored: true,
        timestamps: false
    });
    return Categories;
};