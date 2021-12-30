import DatabaseError from "../../errors/database-error";
import userSchema, { UserModel } from "../models/user-model";

let currentNode: number = 1;

// Get node they should go to
export async function getUserInfo(userID: string) {
    try {
        const result = await userSchema.findOne({ userID }, "lastNode lastInteraction");
        if (!result) {
            return await userSchema.create({ userID, lastNode: 1, lastInteraction: new Date() });
        }
        return result;
    } catch (error) {
        throw new DatabaseError("Error while trying to retrieve user information in MongoDB");
    }
}

// Next time user interacts, they're gonna go to this node...
export async function setUserCurrentNode(userID: string, nodeID: number) {
    try {
        await userSchema.updateOne({ userID },
            {
                "$set": { lastNode: nodeID, lastInteraction: new Date() }
            }
        );
    } catch (error) {
        throw new DatabaseError("Error while trying to set current node in MongoDB");
    }
}

export async function setGlobal(userID: string, key: string, data: Object) {
    try {
        let globalsObject = {};
        globalsObject["globals." + key] = data;

        return await userSchema.findOneAndUpdate({ userID },
            {
                "$set": globalsObject
            });
    } catch (error) {
        throw new DatabaseError("Error while trying to Set Global in MongoDB");
    }
}

export async function getGlobal(userID: string, key: string) {
    try {
        const result = (await userSchema.findOne({ userID }, "globals"));
        return (key ? result.globals[key] : result.globals);
    } catch (error) {
        throw new DatabaseError("Error while trying to Get Global in MongoDB");
    }
}
