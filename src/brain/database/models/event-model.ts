import { model, Schema } from "mongoose";

interface EventModel {



}

const eventSchema = new Schema(
    {

    }
);

export default model<EventModel>('User', eventSchema);