const {Categories, SubCategories} = require('../model');

const findOneByCategoryIdAndSubCategoryId = async (categoryId, subCategoryId) => {
    return await SubCategories.findOne({
        where: {
            id: subCategoryId,
            category_id: categoryId,
            is_active: true
        },
        attributes: ['id', 'category_id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
    });
}

const findOneByNameAndCategoryId = async (name, categoryId) => {
    return await SubCategories.findOne({
        where: {
            name: name,
            category_id: categoryId,
            is_active: true
        },
        attributes: ['id']
    });
}

const create = async (subCategory) => {
    return await SubCategories.create(subCategory);
}

const findAllByCategoryId = async (categoryId) => {
    return await SubCategories.findAll({
        where: {
            category_id: categoryId,
            is_active: true
        },
        order: [
            ['name', 'ASC']
        ],
        attributes: ['id', 'category_id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
    });
}


module.exports = {
    findOneByCategoryIdAndSubCategoryId,
    findOneByNameAndCategoryId,
    findAllByCategoryId,
    create
}