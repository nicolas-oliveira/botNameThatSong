import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class MenuDetalhesNode extends AbstractNode {
    public getID(): string {
        return "node_MbeHWV8xThG0VjF";
    }

    public async run(input: UserInput): Promise<void> {
        // this.sendButtons(
        //     "Você pode ver algumas coisas sobre a sua música:",
        //     ["Ver letra", "Ouvir um pedacinho", "Tentar outra música"],
        // );
        this.sendList(
            "Você pode ver algumas coisas sobre a sua música :",
            "Clique aqui",
            "Resultado",
            "O que você quer fazer?",
            {
                title: "Ver letra",
                description: undefined
            },
            {
                title: "Ouvir um pedacinho",
                description: undefined
            },
            {
                title: "Tentar outra música",
                description: undefined
            },
            {
                title: "Por enquanto é só",
                description: undefined
            }
        );
        // Awaits for user input
        this.setNextInteractionNode(22);
    }
}
