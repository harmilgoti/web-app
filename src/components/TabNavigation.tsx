import React from 'react';

export type TabType = 'users' | 'products' | 'analytics' | 'search' | 'upload' | 'settings';

interface TabNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    const tabs: { id: TabType; label: string; icon: string }[] = [
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'analytics', label: 'Analytics', icon: '📊' },
        { id: 'search', label: 'Search', icon: '🔍' },
        { id: 'upload', label: 'Upload', icon: '📤' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <nav className="tab-navigation">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
};
