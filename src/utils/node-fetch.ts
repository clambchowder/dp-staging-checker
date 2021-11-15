import { request, RequestOptions } from 'https'
import { isServer } from ".";

const executeRequest = (options: RequestOptions) => new Promise((resolve, reject) => {
    const req = request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            resolve(JSON.parse(responseBody));
        });
    });

    req.on('error', (err) => {
        reject(err);
    });

    req.end();
})


export const nodeFetchJson = async (url: string): Promise<any> => {
    const urlOptions = new URL(url)
    const resp = await executeRequest(urlOptions)
    return resp;
}

export const isoFetchJson = async (url: string): Promise<any> => {
    if (isServer()) {
        return nodeFetchJson(url)
    } else {
        const resp = await fetch(url)
        const data = await resp.json()
        return data;
    }
}
