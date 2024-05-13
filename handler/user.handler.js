const userInfrastructure = require('../infrastructure/user.infrastructure');

const register = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userInfrastructure.register(request);

        res.status(200).json({
            data: userResponse
        });
    }catch (error) {
        next(error);
    }
}

module.exports = {
    register
}