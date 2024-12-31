import { apiHandler } from "./base.api";

interface LoginResponse {
    access_token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await apiHandler<LoginResponse>('post', '/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export interface ProfileResponse {
    sub: string;
    email: string;
    role: "ADMIN" | "CUSTOMER";
    iat: number;
    exp: number;
}

export const profile = async (token: string): Promise<ProfileResponse> => {
    try {
        const response = await apiHandler<ProfileResponse>('get', '/auth/profile', undefined, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Profile fetch failed');
    }
}