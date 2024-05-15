const Joi = require("joi");

const createPaymentValidation = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    payment_fees: Joi.number().min(0).required(),
    logo_url: Joi.string().uri().required(),
    description: Joi.string().min(5).required()
})

module.exports = {
    createPaymentValidation
}