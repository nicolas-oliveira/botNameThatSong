import config from "../config";
import Logger from "../utils/default-logger";

export default class ApiError extends Error {

    public constructor(error: unknown, message: string) {
        super(message);
        if (error && config.DEBUG) {
            Logger.error(error);
        }
    }

}