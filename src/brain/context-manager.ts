import { IChannel } from "@zenvia/sdk";
import { AbstractContent } from "@zenvia/sdk/dist/lib/contents/abstract-content";
import createText from "../factories/text-content-factory";
import StartNode from "../nodeflow/1-startnode";
import AbstractNode from "./cortex/abstract-node";
import { CallbackBundle } from "./cortex/callback-bundle";
import { UserInput } from "./cortex/input-types";

class ContextManager {

    // Get data from mongo and execute node using NodeEngine

    public async handleRequest(userInput: UserInput, channel: IChannel): Promise<void> {

        const callbackBundle = this.createDependencyBundle(userInput, channel);

        const node: AbstractNode = null; // TODO: FIND NODE USING MONGO

        node.setCallbackBundle(callbackBundle);
        node.run(userInput); // Runs node

    }

    private createDependencyBundle(userInput: UserInput, channel: IChannel): CallbackBundle {

        // Message Callback
        const messageCallback = (content: AbstractContent) =>
            channel.sendMessage(
                userInput.getReceiverID(),
                userInput.getUserID(),
                content
            );

        // Change Node Callback
        const changeNodeCallback = () => { };

        // Set Global Callback
        const setGlobalCallback = async () => { };

        // Change Node Callback
        const getGlobalCallback = async () => { };

        // Change Node Callback
        const emitEventCallback = () => { };

        return {
            messageCallback,
            changeNodeCallback,
            setGlobalCallback,
            getGlobalCallback,
            emitEventCallback
        }

    }

}

export default new ContextManager();