import { AnyObject, model, Schema } from "mongoose";

export interface UserModel {

    userID: String;
    lastInteraction: Date;
    lastNode: Number;
    globals: AnyObject;

}

const userSchema = new Schema(
    {
        userID: String,
        lastInteraction: { type: Date, default: Date.now() },
        lastNode: { type: Number, default: 1 },
        globals: Object,
    },
    {
        timestamps: true,
    },
);

export default model<UserModel>("User", userSchema);
