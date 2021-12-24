import Config from "../config";
import DuplicatedNodeException from "../errors/duplicated-node-error";
import Logger from "../logger/default-logger";
import AbstractNode from "./cortex/abstract-node";

// Implement a map where it stores the type of the class as value to the key being the ID number
// Instantiates the node and runs it

class NodeEngine {

    private map: Map<number, AbstractNode> = new Map();

    public addNodeToRegistry(id: number, node: AbstractNode) {
        if (this.map.has(id)) {
            throw new DuplicatedNodeException(`A Node with the ID ${id} has already been registed before`)
        }
        this.map.set(id, node);
        if (Config.DEBUG) {
            Logger.info(`Node registered with ID ${id}`);
        }
    }

    public getNodeFromRegistry(id: number): AbstractNode {
        return this.map.get(id);
    }

}

export default new NodeEngine();