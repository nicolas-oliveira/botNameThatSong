import { Client } from "@zenvia/sdk";
import { connect } from "./brain/database/mongo-connector";
import createWebHook from "./brokers/zenvia-broker";
import Logger from "./logger/default-logger";
import loadAllNodes from "./utils/node-loader";

class App {

    public async start() {

        // Retrieves all nodes from directory "nodeflow" and instantiates them
        loadAllNodes();

        // Connects to MongoDB
        await this.startDatabase();

        const channelType = process.env.CHANNEL;

        // Creates Zenvia Channel
        const channel = this.startZenviaClient(channelType);

        // Creates Zenvia Webhook
        const webhook = await createWebHook(channel, channelType);
        webhook.on("listening", () => {
            Logger.info("Webhook started and is listening on port 3000");
        });

        // Starts Express server
        webhook.init();

    }

    public startZenviaClient(channelType: string) {
        const client = new Client(process.env.ZENVIA_TOKEN);
        const channel = client.getChannel(channelType as any);
        return channel;
    }

    public async startDatabase() {
        await connect(process.env.MONGODB_URL);
    }

}

export default App;
