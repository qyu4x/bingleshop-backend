const {Products, Categories, SubCategories} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {formatCurrency} = require('../helper/i18n-currency.helper');
const {
    getProductValidation, createProductValidation
} = require('../validation/product.validation');
const {
    getCategoryValidation
} = require('../validation/category.validation');
const {
    getSubCategoryValidation
} = require('../validation/sub-category.validation');
const {checkCategoryMustExist} = require('./category.service');
const {checkSubCategoryMustExist} = require('./sub-category.service');
const {ProductResponse} = require('../payload/response/product.response');
const {CategoryResponse} = require('../payload/response/category.response');
const {SubCategoryResponse} = require('../payload/response/sub-category.response');
const {CurrencyResponse} = require("../payload/response/currency.response");


const mapToProductResponse = (productResponse) => {
    return new ProductResponse(
        productResponse.id,
        productResponse.title,
        productResponse.stock,
        new CurrencyResponse(
            productResponse.price,
            formatCurrency(productResponse.price, 'id-ID', 'IDR', 'code'),
            formatCurrency(productResponse.price, 'id-ID', 'IDR', 'symbol')
        ),
        new CategoryResponse(
            productResponse.category.id,
            productResponse.category.name,
            productResponse.category.description
        ),
        new SubCategoryResponse(
            productResponse.sub_category.id,
            productResponse.sub_category.name,
            productResponse.sub_category.description
        ),
        productResponse.is_preorder,
        productResponse.description,
        productResponse.is_active,
        productResponse.created_at,
        productResponse.updated_at
    );
}
const create = async (request, categoryId, subCategoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);
    subCategoryId = validate(getSubCategoryValidation, subCategoryId);

    categoryId = await checkCategoryMustExist(categoryId);
    subCategoryId = await checkSubCategoryMustExist(categoryId, subCategoryId);

    const product = validate(createProductValidation, request);

    product.id = uuidv4();
    product.category_id = categoryId;
    product.sub_category_id = subCategoryId;
    product.is_active = true;
    product.created_at = Date.now()

    await Products.create(product);
    const productResponse = await Products.findByPk(product.id, {
        include: [
            {
                model: Categories,
                as: 'category',
                attributes: ['id', 'name', 'description']
            },
            {
                model: SubCategories,
                as: 'sub_category',
                attributes: ['id', 'name', 'description']
            }
        ]
    })

    return mapToProductResponse(productResponse);
}

const get = async (productId) => {
    productId = validate(getProductValidation, productId);

    const productResponse = await Products.findByPk(productId, {
        where: {
            is_active: true
        },
        include: [
            {
                model: Categories,
                as: 'category',
                attributes: ['id', 'name', 'description']
            },
            {
                model: SubCategories,
                as: 'sub_category',
                attributes: ['id', 'name', 'description']
            }
        ]
    })

    if (!productResponse) {
        throw new ResponseError(404, 'Product not found');
    }

    return mapToProductResponse(productResponse);
}

const list = async (request) => {

}

const update = async (request, productId) => {
    productId = validate(getProductValidation, productId);
    const product = await get(productId);
}

const remove = async (productId) => {
    productId = validate(getProductValidation, productId);
}

module.exports = {
    create,
    get,
    list,
    update,
    remove
}

