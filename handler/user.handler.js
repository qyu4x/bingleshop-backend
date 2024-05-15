const userInfrastructure = require('../service/user.service');

const register = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userInfrastructure.register(request);
        res.status(200).json({
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userInfrastructure.login(request);
        res.status(200).json({
            data: {
                token: userResponse
            }
        });
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await userInfrastructure.logout(userId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const userResponse = await userInfrastructure.get(userId);
        res.status(200).json({
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    logout,
    get
}