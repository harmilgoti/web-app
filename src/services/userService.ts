import { api } from '../api';
import type { User, ApiResponse } from '../types';

export const userService = {
    async getAll(): Promise<User[]> {
        const response = await api.get<ApiResponse<User[]>>('/users');
        return response.data.data;
    },

    async create(user: Omit<User, 'id'>): Promise<User> {
        const response = await api.post<ApiResponse<User>>('/users', user);
        return response.data.data;
    },

    async getById(id: string): Promise<User> {
        const response = await api.get<ApiResponse<User>>(`/users/${id}`);
        return response.data.data;
    },
};
