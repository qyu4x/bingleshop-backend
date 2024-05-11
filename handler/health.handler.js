const healthInfrastructure = require('../infrastructure/health.infrastructure');

const getStatus = (req, res, next) => {
    try {
        const result = healthInfrastructure.get();
        res.status(200)
            .send(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getStatus
};