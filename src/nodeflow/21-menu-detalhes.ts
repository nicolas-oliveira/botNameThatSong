import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class MenuDetalhesNode extends AbstractNode {
    public getID(): number {
        return 21;
    }

    public async run(input: UserInput): Promise<void> {
        this.sendButtons(
            "Você pode ver algumas coisas sobre a sua música:",
            ["Ver letra", "Ouvir um pedacinho", "Tentar outra música"],
        );
        // Awaits for user input
        this.setNextInteractionNode(22);
    }
}
