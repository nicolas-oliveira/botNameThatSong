

let currentNode: number = 1;

export function getUserCurrentNode(userID: string) {
    return currentNode;
}

export function setUserCurrentNode(userID: string, nodeID: number) {
    currentNode = nodeID;
}