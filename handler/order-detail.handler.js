const orderDetailService = require('../service/order-detail.service');

const get = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        const orderDetailResponses= await orderDetailService.get(orderId);
        res.status(200).json({
            data: orderDetailResponses
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get
}