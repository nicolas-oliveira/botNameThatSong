import NodeEngine from "../node-engine";
import { UserInput } from "./input-types";

export default abstract class AbstractNode {

    public constructor() {
        NodeEngine.addNodeToRegistry(this.getID(), this);
    }

    public abstract getID(): number;

    /**
     * This function will execute the actual code inside the Node
     * @param input - Input provided by user
     */
    public abstract run(input: UserInput): Promise<void> | void;

    /**
     * This function will tell context manager which flow it should go to next
     * @param {number} id - ID to which the flow will jump next
     */
    public goToNode(id: number): Promise<void> {
        // To Implement
        return undefined;
    }

    /**
     * Sends the user a message of text type
     * @param text - Message to be sent to the user
     */
    public sendTextMessage(text: string): Promise<void> {
        // To Implement
        return undefined;
    }

    /**
     * Sends the user a message of audio type
     * @param audioUrl - Audio's URL to be sent
     * @param type - Type of audio (e.g. audio/mpeg)
     */
    public sendAudioMessage(audioUrl: string, type?: string): Promise<void> {
        // To Implement
        return undefined;
    }



}