
/* 

Callbacks that the Node can use to interact with external dependencies
but without having to interact with them directly

This is done through Dependency Injection

Find out more here: https://en.wikipedia.org/wiki/Dependency_injection

*/

export interface CallbackBundle {
    messageCallback: Function;
    changeNodeCallback: Function;
    setGlobalCallback: Function;
    getGlobalCallback: Function;
    emitEventCallback: Function;
}