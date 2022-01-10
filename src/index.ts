import dotenv from "dotenv";

import config from "./config";
import App from "./app";
import Logger from "./utils/default-logger";
// import HelloNode from "./nodeflow/1-hello";

dotenv.config();

if (config.DEBUG) {
    Logger.info("App initialized in Debug Mode");
}

const app = new App();

app.start();
