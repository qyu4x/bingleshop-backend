const Joi = require("joi");

const createOrderValidation = Joi.object({
    payment_method_id: Joi.string().required(),
    total_price: Joi.number().min(100).required(),
    note: Joi.string().default(''),
    order_details: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(),
            logistic_id: Joi.string().required(),
            address_id: Joi.string().required(),
            quantity: Joi.number().min(1).required().default(1),
            unit_price: Joi.number().required()
        })
    )
})

const getOrderValidation = Joi.string().required()

module.exports = {
    createOrderValidation,
    getOrderValidation
}