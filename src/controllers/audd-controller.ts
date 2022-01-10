import axios from "axios";
import ApiError from "../errors/api-error";
import { SongResponse } from "../types/song";

async function recognizeMusic(url: string) {
    try {
        const body = {
            api_token: process.env.AUDD_TOKEN,
            return: "spotify,apple_music",
            url: url,
        };

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
                apple_music: {
                    preview:
                        (response.result.apple_music?.previews[0]?.url ?
                            response.result.apple_music?.previews[0].url
                            : undefined),
                    genres:
                        (response.result.apple_music?.genreNames ?
                            response.result.apple_music?.genreNames
                            : undefined)
                },
                song_link: response.result.song_link
            };
        }
    } catch (error) {
        throw new ApiError(error, "Error while trying to retrieve info from AudD");
    }
}

export default recognizeMusic;
