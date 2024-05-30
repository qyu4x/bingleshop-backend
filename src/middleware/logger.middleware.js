const {logger} = require('../helper/logger.helper');

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
            meta: {
                ip: req.ip,
                userAgent: req.get('User-Agent')
            }
        });
    });

    next();
};

module.exports = {
    loggerMiddleware
};