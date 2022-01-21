import WhatsappButtons from "../types/whatsapp-buttons";
import WhatsappList from "../types/whatsapp-list";


export function createButtons(body: string, buttons: string[], footer?: string): WhatsappButtons {
    return new WhatsappButtons(body, buttons, footer);
}


export function createList(body: string, button: string, header: string,
    sectionName: string, ...contents: { title: string, description: string | undefined }[]): WhatsappList {
    return new WhatsappList(body, button, header, sectionName, ...contents);
}