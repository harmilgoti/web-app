import { useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import type { TabType } from './components/TabNavigation';
import { UserManager } from './components/UserManager';
import { ProductCatalog } from './components/ProductCatalog';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SearchPanel } from './components/SearchPanel';
import { FileUpload } from './components/FileUpload';
import { SettingsPanel } from './components/SettingsPanel';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManager />;
      case 'products':
        return <ProductCatalog />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'search':
        return <SearchPanel />;
      case 'upload':
        return <FileUpload />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <UserManager />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Demo App - Multi-API Integration</h1>
        <p className="app-subtitle">Explore various API response types and integrations</p>
      </header>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + Express</p>
      </footer>
    </div>
  );
}

export default App;
