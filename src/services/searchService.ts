import { api } from '../api';
import type { SearchResult, ApiResponse } from '../types';

export const searchService = {
    async search<T>(query: string, type: 'all' | 'products' | 'users' = 'all', page: number = 1, pageSize: number = 10): Promise<SearchResult<T>> {
        const response = await api.get<ApiResponse<SearchResult<T>>>('/search', {
            params: { q: query, type, page, pageSize },
        });
        return response.data.data;
    },
};
