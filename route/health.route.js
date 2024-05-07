import healthHandler from "../handler/health.handler.js";

import express from "express";
const healthRouter = express.Router();

healthRouter.get("/ping", healthHandler.getStatus);

export  {
    healthRouter
};