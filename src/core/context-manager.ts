import { IChannel } from "@zenvia/sdk";
import { AbstractContent } from "@zenvia/sdk/dist/lib/contents/abstract-content";

import WhatsappButtons from "../types/whatsapp-buttons";
import sendButtons from "../integrations/zenvia/button-content";
import AbstractNode from "./cortex/abstract-node";
import { CallbackBundle } from "./cortex/callback-bundle";
import { UserInput } from "./cortex/input-types";
import {
    getGlobal,
    getUserInfo,
    setGlobal,
    setUserCurrentNode,
} from "../database/databaseControllers/user-controller";
import nodeEngine from "./node-engine";
import moment from "moment";
import NodeRuntimeError from "../errors/node-runtime-error";

class ContextManager {
    // Get data from mongo and execute node using NodeEngine

    public async handleRequest(
        userInput: UserInput,
        channel: IChannel,
    ): Promise<void> {
        const callbackBundle = this.createDependencyBundle(userInput, channel);

        const info = await getUserInfo(userInput.getUserID());

        const lastInteraction: Date = info.lastInteraction;

        // Gets which node to go to
        let currentNode: number = info.lastNode as number;

        // If it's been more than 5 seconds, restart interaction
        if (moment.now() - lastInteraction.getTime() > 1000 * 60 * 1) {
            // Resets
            currentNode = 1;
        }

        // In case the node has been deleted, resets flow.
        if (!nodeEngine.isNodeSet(currentNode))
            currentNode = 1;

        let node: AbstractNode = nodeEngine.getNodeFromRegistry(currentNode);

        node.setCallbackBundle(callbackBundle); // Sets context
        try {
            node.run(userInput); // Runs node
        } catch (error) {
            throw new NodeRuntimeError("Error while running node " + currentNode);
        }
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
            return await setGlobal(userInput.getUserID(), key, value);
        };

        // Change Node Callback
        const getGlobalCallback = async (key: string) => {
            return getGlobal(userInput.getUserID(), key);
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
