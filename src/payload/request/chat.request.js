const Joi = require("joi");

const createChatSchema = Joi.object({
    user_id_sender: Joi.string().min(2).max(255).required(),
    user_id_recipient: Joi.string().min(2).max(255).required(),
    message: Joi.string().min(2).max(4096).required()
})

const getChatValidation = Joi.string().uuid().required();

module.exports = {
    createChatSchema,
    getChatValidation
}