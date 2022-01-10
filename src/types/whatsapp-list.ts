import ButtonTitleTooLong from "../errors/button-title-too-long";

export default class WhatsappList {

    private body: string;
    private header: string;
    private button: string;
    private sectionName: string;
    private contents: { id: string, title: string, description: string }[];
    private footer: string;

    public constructor(message: string, button: string,
        header: string, sectionName: string,
        ...contents: { title: string, description: string }[]) {
        this.body = message;
        this.button = button;
        this.header = header;
        this.sectionName = sectionName;
        let id = 1;
        this.contents = contents.map((content: { title: string, description: string }) => {
            const obj = {
                id: (id++).toString(),
                title: content.title,
                description: content.description
            };
            return obj;
        });
    }

    public getBody(): string {
        return this.body;
    }

    public getHeader(): string {
        return this.header;
    }

    public getSectionName(): string {
        return this.sectionName;
    }

    public getContents(): { id: string, title: string, description: string }[] {
        return this.contents;
    }

    public getButton(): string {
        return this.button;
    }

    public getFooter(): string {
        return this.footer;
    }

}