const {Products, Categories, SubCategories} = require('../model');
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {formatCurrency} = require('../helper/i18n-currency.helper');
const {
    getProductValidation,
    createProductValidation,
    searchProductValidation,
    updateProductValidation, updateStockProductValidation
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

    const productResponse = await Products.findOne({
        where: {
            id: productId,
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

const search = async (request) => {
    request = validate(searchProductValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = {
        is_active: true,
        stock: {[Op.gt]: 0}
    };

    if (request.title) {
        filters.title = {[Op.iLike]: `%${request.title}%`};
    }

    if (request.categoryId) {
        filters.category_id = request.categoryId;
    }

    if (request.subCategoryId) {
        filters.sub_category_id = request.subCategoryId;
    }

    const products = await Products.findAll({
        where: filters,
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
        ],
        offset: skip,
        limit: request.size
    })

    const totalProduct = await Products.count({
        where: filters
    })

    return {
        data: products.map(productResponse => mapToProductResponse(productResponse)),
        pagination: {
            current_page: request.page,
            total_item: totalProduct,
            total_page: Math.floor(totalProduct / request.size)
        }
    };
}

const update = async (request, productId) => {
    const product = validate(updateProductValidation, request);
    productId = validate(getProductValidation, productId);

    await checkCategoryMustExist(product.category_id);
    await checkSubCategoryMustExist(product.category_id, product.sub_category_id);

    const availableProduct = await Products.findOne({
        where: {
            id: productId,
            is_active: true
        }
    });

    if (!availableProduct) {
        throw new ResponseError(404, 'Product not found');
    }

    availableProduct.title = product.title;
    availableProduct.price = product.price;
    availableProduct.stock = product.stock;
    availableProduct.is_preorder = product.is_preorder;
    availableProduct.description = product.description;
    availableProduct.updated_at = Date.now();
    await availableProduct.save()
}

const remove = async (productId) => {
    productId = validate(getProductValidation, productId);

    const availableProduct = await Products.findOne({
        where: {
            id: productId,
            is_active: true
        }
    });

    if (!availableProduct) {
        throw new ResponseError(404, 'Product not found');
    }

    availableProduct.is_active = false;
    availableProduct.updated_at = Date.now();
    await availableProduct.save();
}

const updateStock = async (productId, sold) => {
    sold = validate(updateStockProductValidation, sold);

    const availableProduct = await Products.findOne({
        where: {
            id: productId,
            is_active: true
        }
    });

    availableProduct.stock = availableProduct.stock - sold;

    await availableProduct.save();
}

module.exports = {
    create,
    get,
    search,
    update,
    remove,
    updateStock
}

