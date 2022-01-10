import ButtonTitleTooLong from "../errors/button-title-too-long";

export default class WhatsappList {

    private body: string;
    private button: string;
    private contents: string[];
    private footer: string;

    public constructor(message: string, button: string) {
        this.body = message;
        this.button = button;

    }

    public getBody(): string {
        return this.body;
    }

    public getButton(): string {
        return this.button;
    }

    public getFooter(): string {
        return this.footer;
    }

}