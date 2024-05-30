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
            Products.belongsTo(models.Categories, {
                foreignKey: 'category_id',
                as: 'category'
            })

            Products.belongsTo(models.SubCategories, {
                foreignKey: 'sub_category_id',
                as: 'sub_category'
            })

            Products.hasMany(models.OrdersDetails, {
                foreignKey: 'product_id',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                as: 'order_details'
            })
        }
    }

    Products.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        category_id: DataTypes.UUID,
        sub_category_id: DataTypes.UUID,
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