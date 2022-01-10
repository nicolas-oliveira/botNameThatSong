import config from "../config";


export default function makeListFromGenius(geniusResult): string[] {
    const results = [];
    let rank = 1;
    for (const hit of geniusResult.hits.splice(0, config.MAX_GENIUS_RESULTS)) {
        results.push(
            `*${rank}* 👉 ` + (hit.result.full_title as string).replace("by", "*por*") +
            "\n\nLink:  " + hit.result.url);
        rank++;
    }
    return results;

}