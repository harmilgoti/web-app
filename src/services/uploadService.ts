import { api } from '../api';
import type { UploadedFile, ApiResponse } from '../types';

export const uploadService = {
    async uploadFile(file: File): Promise<UploadedFile> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<ApiResponse<UploadedFile>>('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    },

    async getAllFiles(): Promise<UploadedFile[]> {
        const response = await api.get<ApiResponse<UploadedFile[]>>('/uploads');
        return response.data.data;
    },
};
