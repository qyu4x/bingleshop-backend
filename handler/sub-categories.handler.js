const subCategoriesService = require('../service/sub-categories.service');

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const categoryId = req.params.categoryId;

        const subCategoryResponse = await subCategoriesService.create(request, categoryId);
        res.status(200).json({
            data: subCategoryResponse
        });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        const subCategoryResponse = await subCategoriesService.list(categoryId);
        res.status(200).json({
            data: subCategoryResponse
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const subCategoryId = req.params.subCategoryId;

        await subCategoriesService.remove(categoryId, subCategoryId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    remove
}