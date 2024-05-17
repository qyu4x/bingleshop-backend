const orderDetailService = require('../service/order-detail.service');

const get = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.user.id;

        const orderDetailResponses = await orderDetailService.get(userId, orderId);
        res.status(200).json({
            data: orderDetailResponses
        });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const orderDetailResponses = await orderDetailService.list(userId);
        res.status(200).json({
            data: orderDetailResponses
        });
    } catch (error) {
        next(error);
    }
}

const getSpecific = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.orderId;
        const orderDetailId = req.params.orderDetailId;

        const orderDetailResponse = await orderDetailService.getSpecific(userId, orderId, orderDetailId);
        res.status(200).json({
            data: orderDetailResponse
        });
    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        const request = req.body;
        const orderId = req.params.orderId;
        const orderDetailId = req.params.orderDetailId;

        await orderDetailService.updateOrderStatus(request, orderId, orderDetailId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

const updateOrderStatusReceived = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const orderDetailId = req.params.orderDetailId;

        await orderDetailService.updateOrderStatusReceived(orderId, orderDetailId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    get,
    list,
    getSpecific,
    updateOrderStatus,
    updateOrderStatusReceived
}