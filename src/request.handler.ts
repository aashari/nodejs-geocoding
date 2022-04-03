import { get as getHTTPS } from 'https';

export async function get(url: string): Promise<string> {
    return new Promise((resolve, reject) => getHTTPS(url, (res) => {
        let data: string = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
    }).on('error', (e) => reject(e)));
}
