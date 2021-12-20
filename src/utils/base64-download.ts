import https from 'https';

async function getAndEncode(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            resp.setEncoding('base64');
            let body = "";
            resp.on('data', (data) => { body += data });
            resp.on('end', () => {
                resolve(body as string);
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

export default getAndEncode;