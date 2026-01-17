export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    imageUrl: string;
}

export interface Analytics {
    overview: {
        totalUsers: number;
        totalProducts: number;
        totalRevenue: number;
        activeUsers: number;
    };
    sales: {
        today: number;
        thisWeek: number;
        thisMonth: number;
    };
    topProducts: Array<{
        id: string;
        name: string;
        sales: number;
    }>;
    recentActivity: Array<{
        id: string;
        type: string;
        description: string;
        timestamp: string;
    }>;
}

export interface Settings {
    general: {
        siteName: string;
        siteUrl: string;
        adminEmail: string;
    };
    notifications: {
        emailEnabled: boolean;
        pushEnabled: boolean;
        smsEnabled: boolean;
    };
    security: {
        twoFactorAuth: boolean;
        sessionTimeout: number;
        passwordExpiry: number;
    };
    appearance: {
        theme: 'light' | 'dark' | 'auto';
        language: string;
        timezone: string;
    };
}

export interface SearchResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface UploadedFile {
    id: string;
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    uploadedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    count?: number;
}
