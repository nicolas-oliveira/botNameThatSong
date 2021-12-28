import { model, Schema } from "mongoose";

interface UserModel {}

const userSchema = new Schema(
    {
        userID: String,
        lastInteraction: { type: Date, default: Date.now },
        lastNode: Number,
        global: Object,
    },
    {
        timestamps: true,
    },
);

export default model<UserModel>("User", userSchema);
