import AbstractNode from "../brain/cortex/abstract-node";


export default class StartNode extends AbstractNode {

    public getID(): number {
        return 1;
    }

    public run(input: any) {

        if (input.type == "audio") {
            this.goToNode(2);
        } else {

        }

    }



}