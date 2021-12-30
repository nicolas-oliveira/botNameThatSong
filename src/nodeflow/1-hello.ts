import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";
import createButtons from "../factories/button-content-factory";

export default class HelloNode extends AbstractNode {
    public getID(): number {
        return 1;
    }

    public async run(input: UserInput): Promise<void> {
        if (input.getMessage()?.toLocaleLowerCase() === "testar globais") {
            this.sendTextMessage("Ok, agora você pode testar variáveis de contexto");
            this.sendTextMessage("Utilize 'checarglobal', logo em seguida 'setarglobal' e depois 'checarglobal' de novo");
            this.goToNode(15);
        } else {
            this.sendButtons("O que você deseja fazer?", [
                "Testar globais",
                "Converter música",
                "Terceira opcao qualquer",
            ]);
        }
    }
}
