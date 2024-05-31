const {Categories} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../helper/validation.helper');
const {ResponseError} = require('../error/response-error');
const {capitalizeEachFirstWord} = require('../helper/capitalize.helper');
const {
    createCategorySchema
} = require('../payload/request/category.request');
const categoryRepository = require('../repository/category.repository')
const {findAll} = require("../repository/category.repository");

const checkCategoryMustExist = async (categoryId) => {
    const category = await categoryRepository.findOneById(categoryId);

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    return category.id;
}

const create = async (request) => {
    const category = validate(createCategorySchema, request);

    category.name = capitalizeEachFirstWord(category.name);
    const isCategoryExist = await categoryRepository.findOneByName(category.name);

    if (isCategoryExist) {
        throw new ResponseError(409, 'Category already exists');
    }

    category.id = uuidv4();
    category.is_active = true;
    category.created_at = Date.now();

    return await categoryRepository.create(category);
}

const list = async () => {
    return await findAll();
}

const remove = async (categoryId) => {
    const category = await categoryRepository.findOneById(categoryId);

    if (!category) {
        throw new ResponseError(404, 'Category not found');
    }

    category.is_active = false;
    category.updated_at = Date.now();
    await category.save()
}

module.exports = {
    create,
    list,
    remove,
    checkCategoryMustExist
}

