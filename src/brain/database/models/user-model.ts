import { model, Schema } from "mongoose";

interface UserModel {



}

const userSchema = new Schema(
    {

    },
    {
        timestamps: true
    }
);

export default model<UserModel>('User', userSchema);