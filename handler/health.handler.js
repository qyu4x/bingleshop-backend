import healthInfrastructure from '../infrastructure/health.infrastructure.js';

const getStatus = (req, res, next) => {
    try {
        const result = healthInfrastructure.get();
        res.status(200)
            .send(result)
    } catch (error) {
        next(error)
    }
}

export default {
    getStatus
};