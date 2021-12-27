import WhatsappButtons from "../types/whatsapp-buttons";


function createButtons(body: string, buttons: string[], footer?: string): WhatsappButtons {
    return new WhatsappButtons(body, buttons, footer);
}

export default createButtons;