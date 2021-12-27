import {
    FileContent,
    IChannel,
    TextContent,
    WebhookController,
} from "@zenvia/sdk";
import { AbstractContent } from "@zenvia/sdk/dist/lib/contents/abstract-content";
import createFile from "../factories/file-content-factory";
import createText from "../factories/text-content-factory";
import { WebMessageEvent } from "../types/message-event";
import recognizeMusic from "../controllers/audd-controller";
import transcript from "../controllers/gcloud-controller";
import searchGenius from "../controllers/genius-controller";
import Logger from "../logger/default-logger";
import { InputType, UserInput } from '../brain/cortex/input-types';
import ContextManager from "../brain/context-manager";

async function createWebHook(channel: IChannel, channelType: any) {
    return new WebhookController({
        channel: channelType,

        messageEventHandler: async (messageEvent: WebMessageEvent) => {
            let messageType: InputType;
            let fileUrl: string;

            // Define message type
            try {
                if (messageEvent?.message?.contents[0]?.type === "file") {
                    if (messageEvent?.message?.contents[0]?.fileMimeType?.includes("audio")) {
                        messageType = "AUDIO";
                    } else {
                        messageType = "OTHER";
                    }
                    fileUrl = messageEvent.message.contents[0].fileUrl;
                } else {
                    messageType = "TEXT";
                }
            } catch (error) {
                Logger.error(error);

                // Sends I'm sorry message :(
                channel.sendMessage(
                    messageEvent.message.to,
                    messageEvent.message.from,
                    createText("Não é possível processar seu pedido no momento. Por favor, tente mais tarde.")
                );
            }

            // Creates input object
            const userInput: UserInput = new UserInput(
                messageEvent.message.from,
                messageType,
                fileUrl,
                messageEvent.message.contents[0].text,
                messageEvent.message.to
            )

            // Finds node and executes it
            ContextManager.handleRequest(userInput, channel)
                .then(() => {
                    // Success
                }).catch((error) => {
                    Logger.error(error);
                    // TODO: Reset user node
                    channel.sendMessage(
                        messageEvent.message.to,
                        messageEvent.message.from,
                        createText("Não é possível processar seu pedido no momento. Por favor, tente mais tarde.")
                    );
                });

            /* IGNORE:
            let content: AbstractContent[] = [];
            // channel
            //   .sendMessage(
            //     messageEvent.message.to,
            //     messageEvent.message.from,
            //     createText("Só um segundo...")
            //   );
            await channel.sendMessage(
                messageEvent.message.to,
                messageEvent.message.from,
                createText("Só um segundo..."));
            if (
                messageEvent?.message?.contents[0]?.type === "file" &&
                messageEvent?.message?.contents[0]?.fileMimeType?.includes(
                    "audio",
                )
            ) {
                const audioUrl = messageEvent.message.contents[0].fileUrl;
                const music = await recognizeMusic(audioUrl);
        
                Logger.log(audioUrl);
        
                if (music) {
                    let text = "";
                    if (music.title) {
                        text = `${text}*Título* ⇒ ${music.title}\n`;
                    }
                    if (music.artist) {
                        text = `${text}*Artista* ⇒ ${music.artist}\n\n`;
                    }
                    if (music.album) {
                        text = `${text}*Álbum* ⇒ ${music.album}\n`;
                    }
                    if (music.song_link) {
                        text = `${text}*Clique para ouvir* ⇒ ${music.song_link}`;
                    }
                    content = [createText(text)];
                    // Imagem de Capa
                    // if (music.spotify && music.spotify.picture) {
                    //   content.push(createFile(music.spotify.picture, "image/jpeg"));
                    // }
        
                    // Caso a música tenha um preview no spotify:
        
                    if (music.spotify && music.spotify.preview) {
                        content.push(
                            createText("Caso queria ouvir um pouquinho:"),
                        );
                        content.push(
                            createFile(music.spotify.preview, "audio/mpeg"),
                        );
                    }
                } else {
                    const transcriptResult: string[] = (await transcript(
                        audioUrl,
                    )) as string[]; // Google
        
                    Logger.log("info",
                        transcriptResult.join(",")
                            ? transcriptResult.join(",")
                            : "No transcript",
                    );
        
                    if (transcriptResult.join(",")) {
                        const geniusSearchResult: any = await searchGenius(
                            transcriptResult.join(","),
                        );
                        if (
                            geniusSearchResult &&
                            geniusSearchResult.response?.hits?.length !== 0
                        ) {
                            let text = "";
                            if (
                                geniusSearchResult.response.hits.length > 1
                            ) {
                                text = "Possíveis músicas relacionadas: \n";
                                let rank = 1;
                                for (const hit of geniusSearchResult.response.hits.splice(
                                    0,
                                    5,
                                )) {
                                    text += `[${rank}] *Título* ⇒ ${hit.result.title}\n`;
                                    text += `[${rank}] *Artista* ⇒ ${hit.result.artist_names}\n\n`;
                                    rank++;
                                }
                            } else {
                                text = `${text}*Título* ⇒ ${geniusSearchResult.response.hits[0].result.title}\n`;
                                text = `${text}*Artista* ⇒ ${geniusSearchResult.response.hits[0].result.artist_names}\n\n`;
                            }
                            //text = `${text}*Álbum* ⇒ ${music.album}\n`;
                            content = [createText(text)];
                        } else {
                            content = [
                                createText(
                                    `Não entendi o que você falou, o que eu ouvi foi: ${transcriptResult.join(
                                        ",",
                                    )}`,
                                ),
                            ];
                        }
                    } else {
                        content = [
                            createText(
                                "Não foi possível reconhecer a música no seu áudio 😞",
                            ),
                        ];
                    }
                }
            } else {
                // TODO: Search by lyrics
            }
        
            if (content.length !== 0) {
                channel
                    .sendMessage(
                        messageEvent.message.to,
                        messageEvent.message.from,
                        ...content,
                    )
                    .then((response) => {
                        Logger.info("Response:", response);
                    })
                    .catch((error) => {
                        Logger.error(error);
                    });
            }
            */
        },
    });
}

export default createWebHook;
