import { api } from '../api';
import type { Product, ApiResponse } from '../types';

export const productService = {
    async getAll(filters?: { category?: string; inStock?: boolean }): Promise<Product[]> {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.inStock !== undefined) params.append('inStock', String(filters.inStock));

        const response = await api.get<ApiResponse<Product[]>>(`/products?${params.toString()}`);
        return response.data.data;
    },

    async getCategories(): Promise<string[]> {
        const response = await api.get<ApiResponse<string[]>>('/products/categories');
        return response.data.data;
    },
};
