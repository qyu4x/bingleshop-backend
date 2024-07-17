const orderService = require('../service/order.service');
const {WebResponse} = require("../payload/response/web.response");

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const user = req.user;

        const orderResponse = await orderService.create(request, user);
        res.status(200).json(new WebResponse(orderResponse, null));
    } catch (error) {
        next(error);
    }
}

const updatePaymentStatus = async (req, res, next) => {
    try {
        const paymentCode = req.params.paymentCode;
        const orderId = req.params.orderId;

        await orderService.updatePaymentStatus(paymentCode, orderId);
        res.status(200).json(new WebResponse("OK", null));
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const orderResponse = await orderService.list(userId);
        res.status(200).json(new WebResponse(orderResponse, null));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    updatePaymentStatus,
    list
}