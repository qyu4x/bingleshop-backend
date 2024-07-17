const logisticService = require('../service/logistic.service');
const {WebResponse} = require("../payload/response/web.response");

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const logisticResponse = await logisticService.create(request);
        res.status(200).json(new WebResponse(logisticResponse, null));
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const logisticResponse = await logisticService.list();
        res.status(200).json(new WebResponse(logisticResponse, null));
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const logisticId = req.params.logisticId;

        await logisticService.remove(logisticId);
        res.status(200).json(new WebResponse('OK', null));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    remove
}