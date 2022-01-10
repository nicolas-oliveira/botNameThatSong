import axios from "axios";
import WhatsappList from "../../types/whatsapp-list";

export default async function sendList(from: string, to: string, buttons: WhatsappList) {
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
                "header": "Resultados",
                "body": "Aqui está uma lista de músicas relacionadas",
                "button": "Clique aqui para ver",
                "sections":
                    [
                        {
                            "title": "Resultados",
                            "rows":
                                [

                                    {
                                        "id": "1",
                                        "title": "She will be loved",
                                        "description": "Maroon 5"
                                    }
                                ]
                        }

                    ]
            }
        ]
    }, config);
}