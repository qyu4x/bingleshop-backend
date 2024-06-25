require("./middleware/instrument.middleware.js");
const Sentry = require("@sentry/node");

const express = require('express');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const {errorMiddleware} = require("./middleware/error.middleware");
const {routeNotFoundMiddleware} = require("./middleware/route-not-found.middleware");
const {loggerMiddleware} = require("./middleware/logger.middleware");

const {router} = require('./route/api');

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || 'bingleshop';

const app = express();
app.use(loggerMiddleware);
app.use(express.json());

app.use("/", router);

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.use(errorMiddleware);
app.use(routeNotFoundMiddleware)

app.listen(port, () => {
    console.log(`${appName} running on port ${port}`)
})