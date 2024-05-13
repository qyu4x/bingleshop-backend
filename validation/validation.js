const {ResponseError} = require("../error/response-error");

const validation = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: true
    })

    if (result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return result;
    }
}

module.exports = {
    validation
}