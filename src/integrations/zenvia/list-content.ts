import axios from "axios";
import WhatsappButtons from "../../types/whatsapp-buttons";

export default function sendList(
    from: string,
    to: string,
    buttons: WhatsappButtons,
) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-API-TOKEN": process.env.ZENVIA_TOKEN,
        },
    };
    return axios.post(
        "https://api.zenvia.com/v2/channels/whatsapp/messages",
        {
            from: from,
            to: to,
            contents: [
                {
                    type: "button",
                    body: buttons.getBody(),
                    ...(buttons.getFooter() && { footer: buttons.getFooter() }),
                    buttons: buttons.getButtons(),
                },
            ],
        },
        config,
    );
}
