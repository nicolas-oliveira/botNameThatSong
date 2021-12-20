import speech, { protos } from '@google-cloud/speech';
import getAndEncode from '../utils/base64-download';

// Creates a client
type IRecognitionConfig = protos.google.cloud.speech.v1.IRecognitionConfig

async function transcript(url: string) {
    try {
        const audioFile: string = await getAndEncode(url);

        const client = new speech.SpeechClient();

        const sampleRateHertz = 48000;
        const languageCode = 'en-US';

        const config: IRecognitionConfig = {
            encoding: "OGG_OPUS",
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
        };
        const audio = {
            content: audioFile,
        };

        const request = {
            config: config,
            audio: audio,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription: string[] = response.results
            .map(result => result.alternatives[0].transcript)
        return transcription;
    } catch (error) {
        console.log(error);
        return "";
    }
}

export default transcript;