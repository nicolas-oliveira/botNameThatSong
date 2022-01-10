import axios from "axios";
import WhatsappList from "../../types/whatsapp-list";

export default async function sendList(from: string, to: string, list: WhatsappList) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "X-API-TOKEN": process.env.ZENVIA_TOKEN,
        }
    };
    const result = await axios.post("https://api.zenvia.com/v2/channels/whatsapp/messages", {
        "from": from,
        "to": to,
        "contents": [
            {
                "type": "list",
                "header": list.getHeader(),
                "body": list.getBody(),
                "button": list.getButton(),
                "sections":
                    [
                        {
                            "title": list.getSectionName(),
                            "rows": list.getContents()
                        }

                    ]
            }
        ]
    }, config);
}