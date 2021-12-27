
/* 

Callbacks that the Node can use to interact with external dependencies
but without having to interact with them directly

This is done through Dependency Injection

Find out more here: https://en.wikipedia.org/wiki/Dependency_injection

*/

import { AbstractContent } from "@zenvia/sdk/dist/lib/contents/abstract-content";
import WhatsappButtons from "../../types/whatsapp-buttons";

type MessageCallback = (content: AbstractContent) => void;
type ButtonsCallback = (buttons: WhatsappButtons) => Promise<void>;
type ChangeNodeCallback = (nodeID: number) => void;
type SetGlobalCallback = (key: string, value: Object) => void;
type GetGlobalCallback = (key: string) => Promise<Object>;
type emitEventCallback = (eventName: string, eventDetails: Object) => void;

export interface CallbackBundle {
    messageCallback: MessageCallback;
    buttonsCallback: ButtonsCallback;
    changeNodeCallback: ChangeNodeCallback;
    setGlobalCallback: SetGlobalCallback;
    getGlobalCallback: GetGlobalCallback;
    emitEventCallback: emitEventCallback;
}