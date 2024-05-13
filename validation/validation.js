const {ResponseError} = require("../error/response-error");
require('joi');

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: true
    })

    if (result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value;
    }
}

module.exports = {
    validate
}