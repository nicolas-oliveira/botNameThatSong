function loadAllNodes(): void {
    const allModules: { [key: string]: NodeRequire } = {};
    if (process.env.NODE_ENV == "dev") {
        require("fs")
            .readdirSync(__dirname + "/../nodeflow/")
            .forEach(function (file) {
                if (file.match(/\.ts$/) !== null && file !== "index.ts") {
                    var name = file.replace(".ts", "");
                    allModules[name] = require("./../nodeflow/" + file);
                }
            });
        for (const module in allModules) {
            new (allModules[module] as any).default();
        }
    } else {
        require("fs")
            .readdirSync(__dirname + "/../nodeflow/")
            .forEach(function (file) {
                if (file.match(/\.js$/) !== null && file !== "index.js") {
                    var name = file.replace(".js", "");
                    allModules[name] = require("./../nodeflow/" + file);
                }
            });
        for (const module in allModules) {
            new (allModules[module] as any).default();
        }
    }
}

export default loadAllNodes;
