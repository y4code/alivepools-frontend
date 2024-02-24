import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { setupInterceptors } from './interceptor';
import { Message, Res } from '@/app/interfaces/model';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const API_HOST = 'https://alivepools.siri.ink/api';
const axiosInstance = axios.create({ baseURL: API_HOST, timeout: 10000, });
setupInterceptors(axiosInstance);

const makeApiRequest = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<any> => {
    const requestOptions: AxiosRequestConfig = {
        method,
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    const response = await axiosInstance(API_HOST + endpoint, requestOptions);
    return response.data;
}


export function getDomain({url, args}: {url: string, args: { website: string }}) {
    return makeApiRequest(url, POST, args);
}