const express = require('express');
require('dotenv/config');
const {routeNotFoundMiddleware} = require('./middleware/route-not-found.middleware');
const {router} = require('./route/api');
const {errorMiddleware} = require('./middleware/error.middleware');
const {Categories} = require('./model')

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || "uwupedia";

const app = express();
app.use(express.json());

app.use("/", router);

app.use(errorMiddleware);
app.use(routeNotFoundMiddleware)

app.listen(port, () => {
    console.log(`${appName} running on port ${port}`)
})