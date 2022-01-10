import ButtonTitleTooLong from "../errors/button-title-too-long";

export default class WhatsappButtons {

    private body: string;
    private buttons: Object[];
    private footer: string;

    public constructor(message: string, buttons: string[], footer?: string) {
        this.body = message;
        this.buttons = buttons.map((buttonString) => {
            if (buttonString.length > 20)
                throw new ButtonTitleTooLong("The button title \"" + buttonString + "\" is too long "
                    + "(20 chars max)")
            return {
                id: buttonString,
                title: buttonString
            }
        });
        this.footer = footer;
    }

    public getBody(): string {
        return this.body;
    }

    public getButtons(): Object[] {
        return this.buttons;
    }

    public getFooter(): string {
        return this.footer;
    }

}