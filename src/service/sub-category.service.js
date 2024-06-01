const {Categories, SubCategories} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../helper/validation.helper');
const {ResponseError} = require('../error/response-error');
const {capitalizeEachFirstWord} = require('../helper/capitalize.helper');
const {
    subCreateCategorySchema, getSubCategoryValidation
} = require('../payload/request/sub-category.request');
const {
    getCategoryValidation
} = require('../payload/request/category.request');
const {checkCategoryMustExist} = require('./category.service');
const subCategoryRepository = require("../repository/sub-category.repository");


const checkSubCategoryMustExist = async (categoryId, subCategoryId) => {
    const category = await subCategoryRepository.findOneByCategoryIdAndSubCategoryId(categoryId, subCategoryId);

    if (!category) {
        throw new ResponseError(404, "Sub category not found");
    }

    return category.id;
}

const create = async (request, categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    const subCategory = validate(subCreateCategorySchema, request);

    categoryId = await checkCategoryMustExist(categoryId);

    subCategory.name = capitalizeEachFirstWord(subCategory.name);
    const isSubCategoryExist = await subCategoryRepository.findOneByNameAndCategoryId(subCategory.name, categoryId);

    if (isSubCategoryExist) {
        throw new ResponseError(409, 'Sub category already exists');
    }

    subCategory.id = uuidv4();
    subCategory.category_id = categoryId;
    subCategory.is_active = true;
    subCategory.created_at = Date.now();

    return await subCategoryRepository.create(subCategory);
}

const list = async (categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    categoryId = await checkCategoryMustExist(categoryId);

    return await subCategoryRepository.findAllByCategoryId(categoryId);
}

const remove = async (categoryId, subCategoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    subCategoryId = validate(getSubCategoryValidation, subCategoryId);

    const subCategory = await subCategoryRepository.findOneByCategoryIdAndSubCategoryId(categoryId, subCategoryId);

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
    remove,
    checkSubCategoryMustExist
}