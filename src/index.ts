import dotenv from "dotenv";
import Config from './config';
import App from "./app";
import Logger from "./logger/default-logger";
import StartNode from "./nodeflow/1-startnode";

dotenv.config();

if (process.env.DEBUG == 'true') {
    Config.DEBUG = true;
    Logger.info("App initialized in Debug Mode");
}

const app = new App();

app.start();
