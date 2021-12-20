import axios from 'axios';

async function search(query: string) {

    let config = {
        headers: {
            Authorization: `Bearer ${process.env.GENIUS_TOKEN}`,
            Accept: 'application/json'
        },
        params: {
            q: query
        }
    }

    const response = (await axios.get("https://api.genius.com/search", config)).data;

    return response;

}

export default search;