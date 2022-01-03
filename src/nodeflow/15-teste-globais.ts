import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class TestNode extends AbstractNode {
    public getID(): number {
        return 15;
    }

    public async run(input: UserInput): Promise<void> {
        if (input.getMessage().includes("letra")) {
            this.sendTextMessage("Vamos buscar por letra...");
        } else if (input.getMessage().startsWith("checarglobal")) {
            if (await this.getGlobal("teste") == "123") {
                this.sendTextMessage("Legal! 'teste' está setado para 123");
            } else {
                this.sendTextMessage("Não está setado");
            }
        } else if (input.getMessage() == "setarglobal") {
            this.setGlobal("teste", "123");
        }
    }
}
