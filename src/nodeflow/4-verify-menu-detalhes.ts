import searchGenius from "../controllers/genius-controller";
import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class VerificarMenuDetalhes extends AbstractNode {
    public getID(): number {
        return 4;
    }

    public async run(input: UserInput): Promise<void> {
        if (
            input.getMessage() === "1 - Ver letra" ||
            input.getMessage() === "1"
        ) {
        } else if (
            input.getMessage() === "2 - Ver o preview da música" ||
            input.getMessage() === "2"
        ) {
        } else if (
            input.getMessage() === "3 - Sair" ||
            input.getMessage() === "3"
        ) {
        } else {
            this.sendTextMessage("Não entendi :/");
            this.setNextInteractionNode(4);
        }
    }
}
