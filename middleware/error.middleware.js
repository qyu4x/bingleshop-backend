const {ResponseError} = require('../error/response-error');

const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            code: 500,
            errors: err.message
        }).end();
    }
}

module.exports = {
    errorMiddleware
}