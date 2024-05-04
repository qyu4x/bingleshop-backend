import {healthCheckRoutes}  from "./health-check.route.js";

import express from "express";
const routes = express.Router();

// wrap routers
routes.use("/app", healthCheckRoutes);

export {routes};