const userInfrastructure = require('../infrastructure/user.infrastructure');

const register = async (req, res, next) => {
    try {
        const userResponse = await userInfrastructure.register(req.body);
        res.status(200).json({
            data: userResponse
        });
    }catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const userResponse = await userInfrastructure.login(req.body);
        res.status(200).json({
            data: {
                token: userResponse
            }
        });
    }catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const userResponse = await userInfrastructure.get(req.user.id);
        res.status(200).json({
            data: userResponse
        });
    }catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    get
}