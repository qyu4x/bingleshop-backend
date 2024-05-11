const healthHandler = require("../handler/health.handler");

const express = require("express");

const healthRouter = express.Router();

healthRouter.get("/ping", healthHandler.getStatus);

module.exports = {
    healthRouter
};