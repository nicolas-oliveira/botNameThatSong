import post from "got";
import FormData from "form-data";
import { SongResponse } from "../types/song";

async function recognizeMusic(url: string) {
  
  const form = new FormData();
  form.append("api_token", process.env.AUDD_TOKEN);
  form.append("url", url);
  form.append("return", "deezer");

  const response: SongResponse = await post("https://api.audd.io/", {
    body: form,
    responseType: "json",
    resolveBodyOnly: true,
  });

  if (response && response.result) {
    return {
      artist: response.result.artist,
      title: response.result.title,
      album: response.result.album,
      deezer: {
        picture:
          response.result.deezer && response.result.deezer.artist
            ? response.result.deezer.artist.picture_medium
            : undefined,
        preview: response.result.deezer
          ? response.result.deezer.preview
          : undefined,
      },
    };
  }
}

export default recognizeMusic;
