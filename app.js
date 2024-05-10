import express from "express";
import "dotenv/config";
import {routeNotFoundMiddleware} from "./middleware/route-not-found.middleware.js";
import {router} from "./route/api.js";
import {errorMiddleware} from "./middleware/error.middleware.js";

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