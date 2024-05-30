const healthHandler = require("../handler/health.handler");

const healthRouter = require('express').Router();

healthRouter.get('/ping', healthHandler.getStatus);

module.exports = {
    healthRouter
};