import { v4 } from 'uuid';

export default class WhatsappButtons {

    private body: string;
    private buttons: object[];
    private footer: string;

    public constructor(message: string, buttons: string[], footer?: string) {
        this.body = message;
        this.buttons = buttons.map((buttonString) => {
            return {
                id: v4() as string,
                title: buttonString
            }
        });
        this.footer = footer;
    }

    public getBody(): string {
        return this.body;
    }

    public getButtons(): object[] {
        return this.buttons;
    }

    public getFooter(): string {
        return this.footer;
    }

}