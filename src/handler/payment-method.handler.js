const paymentMethodService = require('../service/payment-method.service');
const {WebResponse} = require("../payload/response/web.response");

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const paymentMethodResponse = await paymentMethodService.create(request);
        res.status(200).json(new WebResponse(paymentMethodResponse, null));
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const paymentMethodResponse = await paymentMethodService.list();
        res.status(200).json(new WebResponse(paymentMethodResponse, null));
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const paymentMethodId = req.params.paymentMethodId;

        await paymentMethodService.remove(paymentMethodId);
        res.status(200).json(new WebResponse("OK", null));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    remove
}