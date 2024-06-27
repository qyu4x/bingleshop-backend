const healthHandler = require("../handler/health.handler");

const healthRouter = require('express').Router();

/**
 * @openapi
 * /api/v1/healths/ping:
 *   get:
 *     summary: Retrieve health of application
 *     description: Retrieve current health of application.
 *     responses:
 *       200:
 *         description: Application is healthy.
 */
healthRouter.get('/ping', healthHandler.getStatus);

module.exports = {
    healthRouter
};