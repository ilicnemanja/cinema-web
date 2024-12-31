import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiHandler = async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    try {
        const response = await apiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios error
            throw error.response?.data;
        } else {
            // Handle unexpected errors
            throw error;
        }
    }
};