const userHandler = require('../handler/user.handler.js');
const {authorize} = require('../middleware/auth.middleware');

const userRouter = require('express').Router();

userRouter.post('/', userHandler.register);

module.exports = {
    userRouter
}