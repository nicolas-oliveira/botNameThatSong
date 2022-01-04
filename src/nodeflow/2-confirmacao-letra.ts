import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";
import recognizeMusic from "../controllers/audd-controller";

export default class LetraNode extends AbstractNode {
    public getID(): number {
        return 2;
    }

    public async run(input: UserInput): Promise<void> {
        try {
            const music = await recognizeMusic(input.getFileUrl());

            if (music) {
                let messageBot = "É a música que você queria?\n\n";
                if (music.artist) {
                    messageBot = `${messageBot}Artista: *${music.artist}*\n`;
                }
                if (music.title) {
                    messageBot = `${messageBot}Título: *${music.title}*\n`;
                }
                if (music.album) {
                    messageBot = `${messageBot}Álbum: *${music.album}*\n`;
                }

                this.sendTextMessage(messageBot);
                this.runNode(3, input);
            } else {
                this.sendTextMessage(
                    "Não foi possível identificar a música do áudio.",
                );
            }
        } catch {
            this.sendTextMessage(
                "Não foi possível identificar a música do áudio.",
            );
        }
    }
}
