import { IChannel } from "@zenvia/sdk";
import { AbstractContent } from "@zenvia/sdk/dist/lib/contents/abstract-content";

import WhatsappButtons from "../types/whatsapp-buttons";
import sendButtons from "../integrations/zenvia/button-content";
import AbstractNode from "./cortex/abstract-node";
import { CallbackBundle } from "./cortex/callback-bundle";
import { UserInput } from "./cortex/input-types";
import {
    getUserCurrentNode,
    setUserCurrentNode,
} from "../database/databaseControllers/user-controller";
import nodeEngine from "./node-engine";

class ContextManager {
    // Get data from mongo and execute node using NodeEngine

    public async handleRequest(
        userInput: UserInput,
        channel: IChannel,
    ): Promise<void> {
        const callbackBundle = this.createDependencyBundle(userInput, channel);

        const currentNode: number = getUserCurrentNode(userInput.getUserID());

        const node: AbstractNode = nodeEngine.getNodeFromRegistry(currentNode);

        node.setCallbackBundle(callbackBundle); // Sets context
        node.run(userInput); // Runs node
    }

    private createDependencyBundle(
        userInput: UserInput,
        channel: IChannel,
    ): CallbackBundle {
        // Message Callback
        const messageCallback = (content: AbstractContent) => {
            channel.sendMessage(
                userInput.getReceiverID(),
                userInput.getUserID(),
                content,
            );
        };

        const buttonsCallback = async (buttons: WhatsappButtons) => {
            sendButtons(
                userInput.getReceiverID(),
                userInput.getUserID(),
                buttons,
            );
        };

        // Change Node Callback
        const changeNodeCallback = (nodeID: number) => {
            // Sets next node to specified ID
            setUserCurrentNode(userInput.getUserID(), nodeID);
        };

        // Set Global Callback
        const setGlobalCallback = async (key: string, value: Object) => {
            // Sets Global
        };

        // Change Node Callback
        const getGlobalCallback = async () => {
            return undefined; //TODO
        };

        // Change Node Callback
        const emitEventCallback = (eventName: string, eventDetails: Object) => {
            // EMIT EVENT
        };

        return {
            messageCallback,
            buttonsCallback,
            changeNodeCallback,
            setGlobalCallback,
            getGlobalCallback,
            emitEventCallback,
        };
    }
}

export default new ContextManager();
