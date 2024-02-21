import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { setupInterceptors } from './interceptor';

const API_HOST = 'https://alivepools.siri.ink/api';
const axiosInstance = axios.create({ baseURL: API_HOST, timeout: 10000, });
setupInterceptors(axiosInstance);

async function makeApiRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<AxiosResponse<any>> {
    const requestOptions: AxiosRequestConfig = {
        method,
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    const response = await axiosInstance(endpoint, requestOptions);
    return response.data;
}

const getFetcher = (url: string): Promise<any> => makeApiRequest(url, 'GET');
const postFetcher = (url: string, data: any): Promise<any> => makeApiRequest(url, 'POST', data);
const putFetcher = (url: string, data: any): Promise<any> => makeApiRequest(url, 'PUT', data);
const deleteFetcher = (url: string): Promise<any> => makeApiRequest(url, 'DELETE');

export function getDomain(website: string) { return postFetcher('/domain', { website }); }


