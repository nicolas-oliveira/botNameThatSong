import dotenv from "dotenv";

import Config from "./config";
import App from "./app";
import Logger from "./utils/default-logger";
// import HelloNode from "./nodeflow/1-hello";

dotenv.config();

if (process.env.DEBUG == "true") {
    Config.DEBUG = true;
    Logger.info("App initialized in Debug Mode");
}

const app = new App();

app.start();
