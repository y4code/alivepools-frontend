import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { setupInterceptors } from './interceptor';

const API_HOST = 'https://alivepools.siri.ink/api';
const axiosInstance = axios.create({ baseURL: API_HOST, timeout: 10000, });
setupInterceptors(axiosInstance);

const makeApiRequest = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<AxiosResponse<any>> => {
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

export const getDomain = (website: string) => postFetcher('/domain', { website });
export const signIn = (email: string, password: string) => postFetcher('/user/signin', { email, password });
export const signUp = (email: string, password: string) => postFetcher('/user/signup', { email, password });
export const signUpConfirmation = (email: string, code: string) => postFetcher('/user/signup/confirmation', { email, code });
export const getTasks = () => getFetcher('/tasks');
export const getTaskById = (taskId: string) => getFetcher(`/task/${taskId}`);
export const updateTaskById = (taskId: string, data: any) => putFetcher(`/task/${taskId}`, data);
export const deleteTaskById = (taskId: string) => deleteFetcher(`/task/${taskId}`);