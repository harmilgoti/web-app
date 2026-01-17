import { api } from '../api';
import type { Analytics, ApiResponse } from '../types';

export const analyticsService = {
    async get(): Promise<Analytics> {
        const response = await api.get<ApiResponse<Analytics>>('/analytics');
        return response.data.data;
    },
};
