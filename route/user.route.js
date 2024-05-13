const userHandler = require('../handler/user.handler.js');
const {authorize} = require('../middleware/auth.middleware');

const userRouter = require('express').Router();

userRouter.post('/', userHandler.register);
userRouter.post('/login', userHandler.login);
userRouter.get('/current', authorize(['USER', 'ADMIN']), userHandler.get);

module.exports = {
    userRouter
}