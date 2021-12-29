import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";
import createButtons from "../factories/button-content-factory";

export default class Hello extends AbstractNode {
    public getID(): number {
        return 1;
    }

    public async run(input: UserInput): Promise<void> {
        this.sendTextMessage("Olá sou o bot");
        this.sendTextMessage(
            "Você pode pedir para que eu identifique diversas músicas de algumas formas diferentes, como mandando áudio com um pedaço da música, cantando ou falando e até escrevendo uma parte da letra. Vamos lá!?",
        );
    }
}
