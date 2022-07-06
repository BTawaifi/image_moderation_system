
import axios from 'axios';
import FormData from 'form-data';
import type { PrefilterResponseType } from '../types/Prefilter_Response';

/**
 * Send Image URL To Prefilter
 * @param imageUrl 
 * @returns Promise<prefilterResponse>
 */
export function sendImageUrlToPrefilter(imageUrl: string): Promise<PrefilterResponseType> {
    return axios.get('https://api.sightengine.com/1.0/check.json', {
        params: {
            'url': imageUrl,
            'models': 'nudity,wad,offensive,face-attributes,gore',
            'api_user': process.env['PREFILTER_API_USER'],
            'api_secret': process.env['PREFILTER_API_SECRET'],
        }
    })
        .then(function (response: { data: PrefilterResponseType; }) {
            return response.data;
        })
        .catch((error: any) => {
            if (error.response)
                console.log(error.response.data);

            else
                console.log(error.message);

            throw new Error(error);
        });
}

/**
 * Send Readable imageBytes Stream To Prefilter as multipart/form-data
 * @param imageBytes 
 * @returns Promise<prefilterResponse>
 */
export function sendImageBytesToPrefilter(imageBytes: any): Promise<PrefilterResponseType> {

    //Create readable ```"multipart/form-data"``` streams
    const data = new FormData();
    data.append('media', imageBytes);
    data.append('models', 'nudity,wad,offensive,face-attributes,gore');
    data.append('api_user', process.env['PREFILTER_API_USER']);
    data.append('api_secret', process.env['PREFILTER_API_SECRET']);

    return axios({
        method: 'post',
        url: 'https://api.sightengine.com/1.0/check.json',
        data: data,
        headers: data.getHeaders()
    })
        .then(function (response: { data: PrefilterResponseType }) {
            return response.data;
        })
        .catch((error: any) => {
            if (error.response)
                console.log(error.response.data);

            else
                console.log(error.message);

            throw new Error(error);
        });
}