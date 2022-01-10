import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class Hello extends AbstractNode {
    public getID(): number {
        return 26;
    }

    public async run(input: UserInput, music): Promise<void> {
        let messageBot = "Encontramos essa música:\n\n";
        if (music.artist) {
            messageBot = `${messageBot}Artista: *${music.artist}*\n`;
        }
        if (music.title) {
            messageBot = `${messageBot}Título: *${music.title}*\n\n`;
        }
        if (music.album) {
            messageBot = `${messageBot}Álbum: *${music.album}*\n\n`;
        }

        if (music.apple_music?.genres) {
            messageBot = `${messageBot}Gêneros Musicais: *${music.apple_music.genres.join(", ")}*`
        }

        this.setGlobals({ "lastSong": music });

        await this.sendTextMessage(messageBot);

        // Go to options node
        this.runNode(21, input, music);
    }

}
