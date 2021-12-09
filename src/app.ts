import { Client } from "@zenvia/sdk";
import createWebHook from "./controllers/webhook-controller";

class App {
    /*
     *TODO: Add Logger, Add Dashboard Controller, Streamline a little more
     */

    public async start() {
        const client = new Client(process.env.ZENVIA_TOKEN),
            channel = client.getChannel(process.env.CHANNEL as any),
            webhook = await createWebHook(channel);
        webhook.on("listening", () => {
            console.info("Webhook is listening");
        });

        webhook.init();
    }
}

export default App;
