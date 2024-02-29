import axios, { AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptor';
import { CheckDomainPayload, CheckDomainResponse } from '@/app/interfaces/website';
import { Res } from '@/app/interfaces/generic_res';
import { SigninPayload, SigninResponse, SignupPayload } from '@/app/interfaces/auth';
import { Task } from '@/app/interfaces/task';

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

export function getDomain({ url, args }: { url: string, args: CheckDomainPayload }): Promise<Res<CheckDomainResponse>> {
    return makeApiRequest(url, POST, args);
}

export function signIn({ url, args }: { url: string, args: SigninPayload }): Promise<Res<SigninResponse>> {
    return makeApiRequest(url, POST, args);
}

export function signUp({ url, args }: { url: string, args: SignupPayload }): Promise<Res<null>> {
    return makeApiRequest(url, POST, args);
}

export function signUpConfirmation({ url, args }: { url: string, args: { email: string, code: string } }): Promise<Res<null>> {
    return makeApiRequest(url, POST, args);
}

export function getTasks({ url }: { url: string }): Promise<Res<Task[]>> {
    return makeApiRequest(url, GET);
}

export function getTaskById({ url }: { url: string }): Promise<Res<Task>> {
    return makeApiRequest(url, GET);
}

export function updateTaskById({ url, args }: { url: string, args: { data: Task } }): Promise<Res<null>> {
    return makeApiRequest(url, PUT, args);
}

export function deleteTaskById({ url }: { url: string }): Promise<Res<null>> {
    return makeApiRequest(url, DELETE);
}