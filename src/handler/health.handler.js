const healthService = require('../service/health.service');

const getStatus = (req, res, next) => {
    try {
        const result = healthService.get();
        res.status(200)
            .send(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getStatus
};