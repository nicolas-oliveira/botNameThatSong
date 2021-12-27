import AbstractNode from "../brain/cortex/abstract-node";
import { UserInput } from "../brain/cortex/input-types";


export default class StartNode extends AbstractNode {

    public getID(): number {
        return 1;
    }

    public async run(input: UserInput) {
        // Test
        this.sendTextMessage("Hello, " + input.getText());

    }



}