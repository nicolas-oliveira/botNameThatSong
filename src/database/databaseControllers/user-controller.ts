import userSchema from "../models/user-model";

let currentNode: number = 1;

export async function getUserCurrentNode(userID: string) {
    return await userSchema.find({ userID }, "lastNode").exec();
}

export async function setUserCurrentNode(userID: string, nodeID: number) {
    return await userSchema.create({ userID, lastNode: nodeID });
}
