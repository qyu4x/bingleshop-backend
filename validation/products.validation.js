const Joi = require("joi");

const createProductValidation = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    price: Joi.number().min(100).required(),
    is_preorder: Joi.boolean().required().default(false),
    description: Joi.string().min(5).required()
})

module.exports = {
    createProductValidation
}