
export interface UserInput {

    type: InputType;
    audioUrl: string;
    text: string;

}

export type InputType = "AUDIO" | "TEXT" | "OTHER";