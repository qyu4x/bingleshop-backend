const Joi = require("joi");

const createCategorySchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(5).required()
})

const getCategoryValidation = Joi.string().uuid().required();

module.exports = {
    createCategorySchema,
    getCategoryValidation
}