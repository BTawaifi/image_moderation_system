import axios from 'axios';
import * as fs from 'fs';
import path = require("path");

/**
 * GET Image From URL As Stream And Store It
 * @param url 
 * @param userId 
 * @returns Promise<string>
 */
export async function downloadImage(url: string, userId: number): Promise<string> {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        //maxBodyLength change this to prevent DDOS
    });
    return storeStream(response.data, userId)
}

/**
 * Stores Stream In A File
 * @param readStream 
 * @param userId 
 * @returns 
 */
export function storeStream(readStream: any, userId: number): Promise<string> {
    const DateArr = new Date().toString().split(' ');
    const location = process.env['STORAGE_LOCATION'] ? process.env['STORAGE_LOCATION'] : "./images/"
    const directory = path.join(location + '/' + DateArr[1] + '-' + DateArr[2] + '-' + DateArr[3]);
    const extention: string = readStream.headers['content-type']?.split('/')[1]
    const filepath = directory + '/' + userId + "_" + Math.random() * 100 + '.' + (extention ? extention : 'jpg');

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        readStream.pipe(fs.createWriteStream(filepath))
            .on('error', () => reject("ERROR"))
            .once('close', () => resolve(filepath.split('images\\').join('')));
    });
}
