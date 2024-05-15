const {Categories} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {capitalizeEachFirstWord} = require('../helper/capitalize.helper');
const {
    createCategorySchema
} = require('../validation/categories.validation');

const create = async (request) => {
    const category = validate(createCategorySchema, request);

    category.name = capitalizeEachFirstWord(category.name);
    const isCategoryExist = await Categories.findOne({
        where: {
            name: category.name
        },
        attributes: ['id']
    });

    if (isCategoryExist) {
        throw new ResponseError(409, 'Category already exists');
    }

    category.id = uuidv4();
    category.is_active = true;
    category.created_at = Date.now();

    return await Categories.create(category);
}

const list = async () => {
    return await Categories.findAll({
        where: {
            is_active: true
        },
        order: [
            ['name', 'ASC']
        ]
    })
}

const remove = async (categoryId) => {
    const category = await Categories.findOne({
        where: {
            id: categoryId
        }
    })

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
    remove
}