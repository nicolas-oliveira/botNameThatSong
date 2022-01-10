import axios from "axios";
import * as cheerio from 'cheerio';

export default async function scavengeLyrics(genius_url) {
	try {
		let { data } = await axios.get(genius_url);
		const $ = cheerio.load(data as string);
		let lyrics = $('div[class="lyrics"]').text().trim();
		if (!lyrics) {
			lyrics = ''
			$('div[class^="Lyrics__Container"]').each((i, elem) => {
				if ($(elem).text().length !== 0) {
					let snippet = $(elem).html()
						.replace(/<br>/g, '\n')
						.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
					lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
				}
			})
		}
		return lyrics.split("[").join("*[").split("]").join("]*");
	} catch (e) {
		throw e;
	}
}