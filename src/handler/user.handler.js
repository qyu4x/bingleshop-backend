const userService = require('../service/user.service');

const register = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userService.register(request);
        res.status(200).json({
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
}

const verifyOtpCode = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const request = req.body;

        await userService.verifyOtpCode(userId, request);
        res.status(200).json({
            data: 'OK'
        });
    } catch (error) {
        next(error);
    }
}

const refreshOtpCode = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        await userService.refreshOtpCode(userId);
        res.status(200).json({
            data: 'OK'
        });
    } catch (error) {
        next(error);
    }
}


const login = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userService.login(request);
        res.status(200).json({
            data: {
                token: userResponse
            }
        });
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const userResponse = await userService.get(userId);
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
    get,
    verifyOtpCode,
    refreshOtpCode
}