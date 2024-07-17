const {ResponseError} = require('../error/response-error');
const {WebResponse} = require("../payload/response/web.response");

const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json(
            new WebResponse(null, err.message)
        ).end();
    } else {
        console.log(err);
        res.status(500).json(
            new WebResponse(null, err.message)
        ).end();
    }
}

module.exports = {
    errorMiddleware
}
