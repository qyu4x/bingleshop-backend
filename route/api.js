const {healthRouter} = require('./health.route');
const {userRouter} = require('./user.route');

const express = require("express");
const router = express.Router();

// health
router.use('/api/v1/healths', healthRouter);

// user
router.use('/api/v1/users', userRouter)

module.exports = {
    router
};