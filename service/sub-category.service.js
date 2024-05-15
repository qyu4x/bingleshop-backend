const {Categories, SubCategories} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {capitalizeEachFirstWord} = require('../helper/capitalize.helper');
const {
    subCreateCategorySchema, getSubCategoryValidation
} = require('../validation/sub-category.validation');
const {
    getCategoryValidation
} = require('../validation/category.validation');

const checkCategoryMustExist = async (categoryId) => {
    const category = await Categories.findOne({
        where: {
            id: categoryId,
            is_active: true
        },
        attributes: ['id']
    })

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    return category.id;

}

const create = async (request, categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    const subCategory = validate(subCreateCategorySchema, request);

    categoryId = await checkCategoryMustExist(categoryId);

    subCategory.name = capitalizeEachFirstWord(subCategory.name);
    const isSubCategoryExist = await SubCategories.findOne({
        where: {
            name: subCategory.name,
            category_id: categoryId,
            is_active: true
        },
        attributes: ['id']
    });

    if (isSubCategoryExist) {
        throw new ResponseError(409, 'Sub category already exists');
    }

    subCategory.id = uuidv4();
    subCategory.category_id = categoryId;
    subCategory.is_active = true;
    subCategory.created_at = Date.now();

    await SubCategories.create(subCategory);

    return await SubCategories.findOne({
        where: {
            id: subCategory.id, category_id: categoryId
        },
        attributes: ['id', 'category_id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
    })
}

const list = async (categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    categoryId = await checkCategoryMustExist(categoryId);

    return await SubCategories.findAll({
        where: {
            category_id: categoryId,
            is_active: true
        },
        order: [
            ['name', 'ASC']
        ],
        attributes: ['id', 'category_id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
    })
}

const remove = async (categoryId, subCategoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    subCategoryId = validate(getSubCategoryValidation, subCategoryId);

    const subCategory = await SubCategories.findOne({
        where: {
            id: subCategoryId,
            category_id: categoryId,
            is_active: true
        }
    })

    if (!subCategory) {
        throw new ResponseError(404, 'Sub category not found');
    }

    subCategory.is_active = false;
    subCategory.updated_at = Date.now();
    await subCategory.save();
}

module.exports = {
    create,
    list,
    remove
}