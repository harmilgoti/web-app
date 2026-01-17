import React, { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';
import type { Analytics } from '../types';

export const AnalyticsDashboard: React.FC = () => {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const data = await analyticsService.get();
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading analytics...</div>;
    }

    if (!analytics) {
        return <div className="empty-state">No analytics data available.</div>;
    }

    return (
        <div className="analytics-dashboard">
            <h2>Analytics Dashboard</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.overview.totalUsers}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.overview.totalProducts}</div>
                        <div className="stat-label">Total Products</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <div className="stat-value">${analytics.overview.totalRevenue.toFixed(2)}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✓</div>
                    <div className="stat-content">
                        <div className="stat-value">{analytics.overview.activeUsers}</div>
                        <div className="stat-label">Active Users</div>
                    </div>
                </div>
            </div>

            <div className="analytics-sections">
                <div className="analytics-section">
                    <h3>Sales Overview</h3>
                    <div className="sales-stats">
                        <div className="sales-item">
                            <span className="sales-label">Today:</span>
                            <span className="sales-value">${analytics.sales.today.toFixed(2)}</span>
                        </div>
                        <div className="sales-item">
                            <span className="sales-label">This Week:</span>
                            <span className="sales-value">${analytics.sales.thisWeek.toFixed(2)}</span>
                        </div>
                        <div className="sales-item">
                            <span className="sales-label">This Month:</span>
                            <span className="sales-value">${analytics.sales.thisMonth.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="analytics-section">
                    <h3>Top Products</h3>
                    <div className="top-products">
                        {analytics.topProducts.map((product) => (
                            <div key={product.id} className="top-product-item">
                                <span className="product-name">{product.name}</span>
                                <span className="product-sales">{product.sales} sales</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="analytics-section">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        {analytics.recentActivity.map((activity) => (
                            <div key={activity.id} className="activity-item">
                                <div className="activity-type">{activity.type.replace('_', ' ')}</div>
                                <div className="activity-description">{activity.description}</div>
                                <div className="activity-time">
                                    {new Date(activity.timestamp).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="refresh-button" onClick={fetchAnalytics}>
                🔄 Refresh Analytics
            </button>
        </div>
    );
};
