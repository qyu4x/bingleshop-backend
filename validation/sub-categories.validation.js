const Joi = require("joi");

const subCreateCategorySchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(5).required()
})

module.exports = {
    subCreateCategorySchema
}