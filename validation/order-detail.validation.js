const Joi = require("joi");

const updateOrderStatusValidation = Joi.object({
    order_status: Joi.string().valid(
        'processing',
        'awaiting_shipped',
        'shipped',
        'awaiting_payment',
        'order_completed',
        'canceled', 'refunded',
        'failed').required()
})

const getOrderDetailValidation = Joi.string().required();

module.exports = {
    getOrderDetailValidation,
    updateOrderStatusValidation
}