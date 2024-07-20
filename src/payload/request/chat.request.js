const Joi = require("joi");

const createChatSchema = Joi.object({
    user_id_sender: Joi.string().min(2).max(255),
    user_id_recipient: Joi.string().min(2).max(255),
    message: Joi.string().min(1).max(4096).required()
})

const getChatValidation = Joi.string().uuid().required();

module.exports = {
    createChatSchema,
    getChatValidation
}