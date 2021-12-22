import { protos, v1p1beta1 as speech } from "@google-cloud/speech";
import { google } from "@google-cloud/speech/build/protos/protos";
import getAndEncode from "../utils/base64-download";

// Init Types
type SpeechRequest =
    protos.google.cloud.speech.v1p1beta1.ILongRunningRecognizeRequest;
type RecognitionConfig = google.cloud.speech.v1p1beta1.IRecognitionConfig;

async function transcript(url: string) {
    try {
        const audioFile: string = await getAndEncode(url);

        const client = new speech.SpeechClient();

        const sampleRateHertz = 16000;
        const languageCode = "en-US";
        const alternativeLanguageCodes = ["en-US", "pt-BR"];

        const config: RecognitionConfig = {
            encoding: "OGG_OPUS", // Whatsapp's Encoding
            sampleRateHertz, // Whatsapp's Sample Rate
            languageCode, // Primary Code
            alternativeLanguageCodes, // Two languages we're using
        };

        const audio = {
            content: audioFile,
        };

        const request: SpeechRequest = {
            config: config,
            audio: audio,
        };

        const [operation]: any = await client.longRunningRecognize(request);
        const [response] = await operation.promise();
        const transcription: string[] = response.results.map(
            (result: { alternatives: { transcript: any }[] }) =>
                result.alternatives[0].transcript,
        );

        return transcription;
    } catch (error) {
        throw error;
    }
}

export default transcript;
