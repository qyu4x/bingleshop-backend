const Joi = require("joi");

const createAddressSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    phone_number: Joi.string().pattern(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/)
        .max(15).min(10).required(),
    street: Joi.string().max(255).required(),
    city: Joi.string().max(100).required(),
    province: Joi.string().max(100).required(),
    district: Joi.string().max(100).required(),
    postal_code: Joi.number().required(),
    is_main_address: Joi.boolean().required()
})

const getAddressValidation = Joi.string().uuid().required();

module.exports = {
    createAddressSchema,
    getAddressValidation
}