import {healthRouter} from "./health.route.js";

import express from "express";
const router = express.Router();

// Health API
router.use("/api/v1/healths", healthRouter);

export {
    router
};