import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";
import createButtons from "../factories/button-content-factory";

export default class HelloNode extends AbstractNode {
    public getID(): number {
        return 1;
    }

    public async run(input: UserInput): Promise<void> {
        this.sendButtons("O que você deseja fazer?", [
            "Ver letra",
            "Tocar preview",
            "Terceira opcao",
        ]);
    }
}
