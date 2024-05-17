const productService = require('../service/product.service');

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const categoryId = req.params.categoryId;
        const subCategoryId = req.params.subCategoryId;

        const productResponse = await productService.create(request, categoryId, subCategoryId);
        res.status(200).json({
            data: productResponse
        });
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const productId = req.params.productId;

        const productResponse = await productService.get(productId);
        res.status(200).json({
            data: productResponse
        });
    } catch (error) {
        next(error);
    }
}

const search = async (req, res, next) => {
    try {
        const request = {
            title: req.query.keyword,
            categoryId: req.query.category_id,
            subCategoryId: req.query.sub_category_id,
            page: req.query.page ?? 1,
            size: req.query.size ?? 10
        }

        const productResponse = await productService.search(request);
        res.status(200).json({
            data: productResponse
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body;
        const productId = req.params.productId;

        await productService.update(request, productId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const productId = req.params.productId;

        await productService.remove(productId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    get,
    search,
    update,
    remove
}