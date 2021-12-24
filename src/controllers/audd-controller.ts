import axios from "axios";
import { SongResponse } from "../types/song";

async function recognizeMusic(url: string) {
  const body = {
    api_token: process.env.AUDD_TOKEN,
    return: "spotify",
    url: url
  }

  const response = (await axios.post("https://api.audd.io/", body)).data as SongResponse;

  if (response && response.result) {
    return {
      artist: response.result.artist,
      title: response.result.title,
      album: response.result.album,
      spotify: {
        picture:
          (response.result.spotify?.album?.images[0]?.url ?
            response.result.spotify?.album.images[0].url
            : undefined),
        preview:
          (response.result.spotify?.preview_url ?
            response.result.spotify?.preview_url
            : undefined)
      },
      song_link: response.result.song_link
    };
  }
}

export default recognizeMusic;
