const express = require('express');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const bodyParser = require("body-parser")
const {errorMiddleware} = require("./middleware/error.middleware");
const {routeNotFoundMiddleware} = require("./middleware/route-not-found.middleware");
const {loggerMiddleware} = require("./middleware/logger.middleware");

const {router} = require('./route/api');

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || 'bingleshop';

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json())
app.use(loggerMiddleware);
app.use(express.json());

app.use("/", router);

app.use(errorMiddleware);
app.use(routeNotFoundMiddleware)

app.listen(port, () => {
    console.log(`${appName} running on port ${port}`)
})
