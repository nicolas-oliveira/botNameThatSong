function loadAllNodes(): void {
    const allModules: { [key: string]: NodeRequire } = {};
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
}

export default loadAllNodes;
