export class UserInput {
    private userID: string;
    private type: InputType;
    private fileUrl: string;
    private text: string;
    private receiverID: string;

    public constructor(
        userID: string,
        type: InputType,
        audioUrl: string,
        text: string,
        receiverID: string,
    ) {
        this.userID = userID;
        this.type = type;
        this.fileUrl = audioUrl;
        this.text = text;
        this.receiverID = receiverID;
    }

    public getUserID(): string {
        return this.userID;
    }

    public getType(): InputType {
        return this.type;
    }

    public getFileUrl(): string {
        return this.fileUrl;
    }

    public getMessage(): string {
        return this.text;
    }

    public getReceiverID(): string {
        return this.receiverID;
    }
}

export type InputType = "AUDIO" | "TEXT" | "OTHER";
