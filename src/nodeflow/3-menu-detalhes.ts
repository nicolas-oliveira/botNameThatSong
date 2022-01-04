import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class MenuDetalhesNode extends AbstractNode {
    public getID(): number {
        return 3;
    }

    public async run(input: UserInput): Promise<void> {
        if (input) {
            this.sendButtons(
                "Você pode ver algumas coisas sobre a sua música:",
                ["1 - Ver letra", "2 - Ver o preview da música", "3 - Sair"],
            );
            this.setNextInteractionNode(4);
        }
    }
}
