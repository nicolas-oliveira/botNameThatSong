import { Client } from "@zenvia/sdk";
import createWebHook from "./controllers/webhook-controller";

class App {
    /*
     *TODO: Add Logger, Add Dashboard Controller, Streamline a little more
     */

    public async start() {
        const client = new Client(process.env.ZENVIA_TOKEN);
        const channelType = process.env.CHANNEL as any;
        const channel = client.getChannel(channelType);
        const webhook = await createWebHook(channel, channelType);
        webhook.on("listening", () => {
            console.info("Webhook started and is listening on port 3000");
        });

        webhook.init();
    }
}

export default App;
