import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class MenuDetalhesNode extends AbstractNode {
    public getID(): number {
        return 3;
    }

    public async run(input: UserInput): Promise<void> {
        if (input.getMessage().includes("letra")) {
            this.sendTextMessage(
                "Você pode ver algumas coisas sobre a sua música:",
            );

            this.sendButtons("", [
                "1 - Ver letra",
                "2 - Tocar preview",
                "3 - Terceira opcao",
            ]);
        } else {
            this.sendTextMessage("Não entendi :/");
        }
    }
}
