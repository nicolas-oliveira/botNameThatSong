import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class MenuDetalhesNode extends AbstractNode {
    public getID(): number {
        return 4;
    }

    public async run(input: UserInput): Promise<void> {
        if (music) {
            let content = [new TextContent("Testado")];

            if (music.artist) {
                text = `${text}Artista: *${music.artist}*\n`;
            }
            if (music.title) {
                text = `${text}Título: *${music.title}*\n`;
            }
            if (music.album) {
                text = `${text}Álbum: *${music.album}*\n`;
            }

            this.sendTextMessage(...content);
        }
    }
}
