import axios, { AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptor';
import { CheckDomainPayload, Message } from '@/app/interfaces/website';
import { Res } from '@/app/interfaces/generic_res';

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

export function getDomain({ url, args }: { url: string, args: CheckDomainPayload }): Promise<Res<Message>> {
    return makeApiRequest(url, POST, args);
}

export function SignIn({ email, password }: { email: string, password: string }): Promise<Res<Message>> {
    return makeApiRequest('/user/signin', POST, { email, password });
}

