const categoriesInfrastructure = require('../service/categories.service');

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const categoryResponse = await categoriesInfrastructure.create(request);
        res.status(200).json({
            data: categoryResponse
        });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const categoryResponse = await categoriesInfrastructure.list();
        res.status(200).json({
            data: categoryResponse
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        await categoriesInfrastructure.remove(categoryId);
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