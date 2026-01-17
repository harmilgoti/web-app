import { api } from '../api';
import type { Settings, ApiResponse } from '../types';

export const settingsService = {
    async getAll(): Promise<Settings> {
        const response = await api.get<ApiResponse<Settings>>('/settings');
        return response.data.data;
    },

    async update(settings: Partial<Settings>): Promise<Settings> {
        const response = await api.put<ApiResponse<Settings>>('/settings', settings);
        return response.data.data;
    },

    async getSection(section: 'general' | 'notifications' | 'security' | 'appearance'): Promise<any> {
        const response = await api.get<ApiResponse<any>>(`/settings/${section}`);
        return response.data.data;
    },
};
