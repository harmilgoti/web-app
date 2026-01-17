import React, { useEffect, useState } from 'react';
import { settingsService } from '../services/settingsService';
import type { Settings } from '../types';

export const SettingsPanel: React.FC = () => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const data = await settingsService.getAll();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;

        setSaving(true);
        try {
            await settingsService.update(settings);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings', error);
            alert('Failed to save settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const updateSetting = (section: keyof Settings, key: string, value: any) => {
        if (!settings) return;
        setSettings({
            ...settings,
            [section]: {
                ...settings[section],
                [key]: value,
            },
        });
    };

    if (loading) {
        return <div className="loading">Loading settings...</div>;
    }

    if (!settings) {
        return <div className="empty-state">No settings available.</div>;
    }

    return (
        <div className="settings-panel">
            <h2>Settings</h2>

            <div className="settings-sections">
                <div className="settings-section">
                    <h3>⚙️ General</h3>
                    <div className="setting-item">
                        <label>Site Name:</label>
                        <input
                            type="text"
                            value={settings.general.siteName}
                            onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                        />
                    </div>
                    <div className="setting-item">
                        <label>Site URL:</label>
                        <input
                            type="text"
                            value={settings.general.siteUrl}
                            onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                        />
                    </div>
                    <div className="setting-item">
                        <label>Admin Email:</label>
                        <input
                            type="email"
                            value={settings.general.adminEmail}
                            onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h3>🔔 Notifications</h3>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailEnabled}
                                onChange={(e) => updateSetting('notifications', 'emailEnabled', e.target.checked)}
                            />
                            Email Notifications
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.notifications.pushEnabled}
                                onChange={(e) => updateSetting('notifications', 'pushEnabled', e.target.checked)}
                            />
                            Push Notifications
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.notifications.smsEnabled}
                                onChange={(e) => updateSetting('notifications', 'smsEnabled', e.target.checked)}
                            />
                            SMS Notifications
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>🔒 Security</h3>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.security.twoFactorAuth}
                                onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                            />
                            Two-Factor Authentication
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>Session Timeout (minutes):</label>
                        <input
                            type="number"
                            value={settings.security.sessionTimeout}
                            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="setting-item">
                        <label>Password Expiry (days):</label>
                        <input
                            type="number"
                            value={settings.security.passwordExpiry}
                            onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h3>🎨 Appearance</h3>
                    <div className="setting-item">
                        <label>Theme:</label>
                        <select
                            value={settings.appearance.theme}
                            onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                    <div className="setting-item">
                        <label>Language:</label>
                        <input
                            type="text"
                            value={settings.appearance.language}
                            onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                        />
                    </div>
                    <div className="setting-item">
                        <label>Timezone:</label>
                        <input
                            type="text"
                            value={settings.appearance.timezone}
                            onChange={(e) => updateSetting('appearance', 'timezone', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <button className="save-button" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : '💾 Save Settings'}
            </button>
        </div>
    );
};
