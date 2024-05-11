const {healthRouter} = require('./health.route');

const express = require("express");
const router = express.Router();

// Health API
router.use("/api/v1/healths", healthRouter);

module.exports = {
    router
};