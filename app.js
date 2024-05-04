import express from "express";
import "dotenv/config";
import {internalServerError} from "./middleware/internal-server-error.middleware.js";
import {routesNotFound} from "./middleware/routes-not-found.middleware.js";
import {routes} from "./route/routes.js";

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || "uwupedia";

const app = express();
app.use(express.json());

app.use("/", routes);

app.use(internalServerError);
app.use(routesNotFound)

app.listen(port, () => {
    console.log(`${appName} running on port ${port}`)
})