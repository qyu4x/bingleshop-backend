import {getHealthCheck} from "../handler/health-check.handler.js";

import express from "express";
const healthCheckRoutes = express.Router();

healthCheckRoutes.get("/health-checks", getHealthCheck);

export {healthCheckRoutes};