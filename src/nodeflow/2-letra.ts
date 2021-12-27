import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class HelloNode extends AbstractNode {
    public getID(): number {
        return 2;
    }

    public async run(input: UserInput): Promise<void> {
        if (input.getMessage().includes("letra")) {
            this.sendTextMessage("Vamos buscar por letra...");
        } else {
            this.sendTextMessage("Não entendi :/");
        }
    }
}
