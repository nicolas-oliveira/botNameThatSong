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
import recognizeMusic from "./audio-controller";

async function createWebHook(channel: IChannel, channelType: any) {

  return new WebhookController({
    channel: channelType,

    messageEventHandler: async (messageEvent: WebMessageEvent) => {
      let content: AbstractContent[] = [
        createText(
          "Olá! Bem-vindo(a) ao seu Bot para descobrir músicas novas."
        ),
      ];

      if (
        messageEvent.message.contents[0].type === "file" &&
        messageEvent.message.contents[0].fileMimeType.includes("audio")
      ) {
        const music = await recognizeMusic(
          messageEvent.message.contents[0].fileUrl
        );

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
            text = `${text}*Clique para ouvir* ⇒ ${music.song_link}`
          }
          content = [createText(text)];
          // if (music.spotify && music.spotify.picture) {
          //   content.push(createFile(music.spotify.picture, "image/jpeg"));
          // }
          if (music.spotify && music.spotify.preview) {
            content.push(createText("Caso queria ouvir um pouquinho:"));
            content.push(createFile(music.spotify.preview, "audio/mpeg"));
          }
        } else {
          content = [
            createText("Não foi possível reconhecer a música no seu áudio 😞"),
          ];
        }
      }

      channel
        .sendMessage(
          messageEvent.message.to,
          messageEvent.message.from,
          ...content
        )
        .then((response) => {
          console.debug("Response:", response);
        });
    },
  });

}

export default createWebHook;
