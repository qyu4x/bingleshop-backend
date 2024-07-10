require("./middleware/instrument.middleware.js");
const Sentry = require("@sentry/node");

const express = require('express');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const bodyParser = require("body-parser")
const {errorMiddleware} = require("./middleware/error.middleware");
const {routeNotFoundMiddleware} = require("./middleware/route-not-found.middleware");
const {loggerMiddleware} = require("./middleware/logger.middleware");
const {setupSwagger} = require('./helper/swagger')
const {setupSocket} = require('./helper/socketio');

const YAML = require('yamljs');

const {router} = require('./route/api');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/api/swagger.yaml'));

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || 'bingleshop';

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(loggerMiddleware);
app.use(express.json());

app.use("/", router);

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);
app.use(routeNotFoundMiddleware)

const server = app.listen(port, () => {
    console.log(`${appName} running on port ${port}`)
})

setupSocket(server)
