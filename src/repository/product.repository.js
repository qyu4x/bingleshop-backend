const {Products, Categories, SubCategories, ProductImages} = require('../model');

const create = async (product) => {
    return await Products.create(product);
}

const findByIdWithCategoryAndSubCategory = async (productId) => {
    return await Products.findByPk(productId, {
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
            },
            {
                model: ProductImages,
                as: 'product_images',
                attributes: ['id', 'url', 'sequence']
            }
        ]
    });
}

const searchByFiltersAndPagination = async (filters, skip, size) => {
    return await Products.findAll({
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
            },
            {
                model: ProductImages,
                as: 'product_images',
                attributes: ['id', 'url', 'sequence']
            }
        ],
        offset: skip,
        limit: size
    })
}

const findTotalByFilters = async (filters) => {
    return await Products.count({
        where: filters
    });
}

const findOneById = async (productId) => {
    return await Products.findOne({
        where: {
            id: productId,
            is_active: true
        }
    });
}

module.exports = {
    create,
    findByIdWithCategoryAndSubCategory,
    searchByFiltersAndPagination,
    findTotalByFilters,
    findOneById
}