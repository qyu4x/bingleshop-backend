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

        res.status(200).json({
            data: ''
        });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {

        res.status(200).json({
            data: ''
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {

        res.status(200).json({
            data: ''
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {


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
    list,
    update,
    remove
}