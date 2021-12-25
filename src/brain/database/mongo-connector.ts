
import mongoose, { Mongoose } from "mongoose";
import Logger from "../../logger/default-logger";

export async function connect(connection_string: string) {
    try {
        await mongoose.connect(connection_string);
        Logger.info("MongoDB has successfully been connected!");
    } catch (error) {
        Logger.error("There was an error when attempting to connect to MongoDB. "
            + "Please, check connection string.");
        Logger.error(error);
    }
}
