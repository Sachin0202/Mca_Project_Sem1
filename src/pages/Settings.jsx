import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Sliders,
  Bell,
  Shield,
  Palette,
  Save,
  CheckCircle2,
  RefreshCw,
  Server,
  Lock,
  Globe,
  Database
} from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile'); // profile | app | notifications | thresholds | theme
  const [toastMessage, setToastMessage] = useState(null);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'Sachin Kumar',
    email: 'sachin.admin@logmonitor.internal',
    title: 'Lead Administrator & MCA Researcher',
    phone: '+91 98765 43210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Application Preferences State
  const [appPrefs, setAppPrefs] = useState({
    serverHost: 'prod-nginx-cluster-01.internal',
    retentionDays: '60',
    autoRefreshInterval: '10',
    logFormat: 'combined',
    maxBatchSize: '5000',
    compressionEnabled: true
  });

  // Notification Settings State
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    emailAddress: 'alerts@logmonitor.internal',
    slackWebhook: 'https://hooks.slack.com/services/T000/B000/XXXX',
    slackEnabled: true,
    smsAlerts: false,
    smsNumber: '+91 98765 43210',
    notifyOnCritical: true,
    notifyOnWarning: true,
    notifyOnInfo: false
  });

  // Alert Thresholds State
  const [thresholds, setThresholds] = useState({
    errorRateThreshold: 5.0,
    latencyThresholdMs: 1500,
    failedAuthThreshold: 10,
    cpuThreshold: 85,
    memoryThreshold: 90
  });

  // Theme & Appearance State
  const [themePrefs, setThemePrefs] = useState({
    accentColor: '#2563eb',
    compactMode: false,
    showGeoIP: true,
    enableAnimations: true
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Settings successfully updated and persisted!');
  };

  return (
    <div>
      {/* Toast */}
      {toastMessage && (
        <div className="toast-notification success">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h1>
            <SettingsIcon size={28} style={{ color: 'var(--primary-blue)' }} />
            Application Settings & Configuration
          </h1>
          <p className="page-header-subtitle">
            Fine-tune log retention limits, alerting parameters, security thresholds, and personal preferences
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleSaveSettings}
          >
            <Save size={15} />
            <span>Save All Configurations</span>
          </button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="settings-tabs-nav">
        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={16} />
          <span>Admin Profile</span>
        </button>

        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'app' ? 'active' : ''}`}
          onClick={() => setActiveTab('app')}
        >
          <Sliders size={16} />
          <span>Application Preferences</span>
        </button>

        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={16} />
          <span>Notification Integrations</span>
        </button>

        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'thresholds' ? 'active' : ''}`}
          onClick={() => setActiveTab('thresholds')}
        >
          <Shield size={16} />
          <span>Alerting Thresholds</span>
        </button>

        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
          onClick={() => setActiveTab('theme')}
        >
          <Palette size={16} />
          <span>Theme & Appearance</span>
        </button>
      </div>

      {/* TAB CONTENT: Admin Profile */}
      {activeTab === 'profile' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <User size={18} style={{ color: 'var(--primary-blue)' }} />
                Administrator Profile Credentials
              </div>
              <div className="card-subtitle">Manage personal identity details and system authentication credentials</div>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  SK
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{profile.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{profile.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Role: Super Administrator &bull; MCA Academic Project</div>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Administrator Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                  <Lock size={16} /> Change Password
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={profile.currentPassword}
                      onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={profile.newPassword}
                      onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-primary">
                  <Save size={15} />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Application Preferences */}
      {activeTab === 'app' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Server size={18} style={{ color: 'var(--primary-blue)' }} />
                Server Ingestion & Retention Preferences
              </div>
              <div className="card-subtitle">Set telemetry storage periods, parsing engines, and poll intervals</div>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Primary Web Server Hostname</label>
                  <input
                    type="text"
                    value={appPrefs.serverHost}
                    onChange={(e) => setAppPrefs({ ...appPrefs, serverHost: e.target.value })}
                  />
                  <span className="form-help-text">Used for tagging incoming telemetry packets</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Historical Log Retention Window</label>
                  <select
                    value={appPrefs.retentionDays}
                    onChange={(e) => setAppPrefs({ ...appPrefs, retentionDays: e.target.value })}
                  >
                    <option value="30">30 Days (Fastest queries, low disk usage)</option>
                    <option value="60">60 Days (Recommended default)</option>
                    <option value="90">90 Days (Quarterly compliance archive)</option>
                    <option value="365">365 Days (Full annual regulatory audit)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Live Telemetry Refresh Interval</label>
                  <select
                    value={appPrefs.autoRefreshInterval}
                    onChange={(e) => setAppPrefs({ ...appPrefs, autoRefreshInterval: e.target.value })}
                  >
                    <option value="5">Every 5 Seconds (High Real-time Frequency)</option>
                    <option value="10">Every 10 Seconds (Standard Balanced)</option>
                    <option value="30">Every 30 Seconds (Low Network Overhead)</option>
                    <option value="0">Manual Refresh Only</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Default Log Parsing Standard</label>
                  <select
                    value={appPrefs.logFormat}
                    onChange={(e) => setAppPrefs({ ...appPrefs, logFormat: e.target.value })}
                  >
                    <option value="combined">Nginx / Apache Combined Log Format</option>
                    <option value="common">Apache Common Log Format (CLF)</option>
                    <option value="springboot">Spring Boot JSON Structured Logback</option>
                    <option value="w3c">W3C Extended Log Format</option>
                  </select>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <label className="switch-label">
                  <div>
                    <div style={{ fontWeight: 600 }}>Enable GZIP Compressed Archiving</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Automatically compress indexed logs older than 7 days to preserve storage capacity
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={appPrefs.compressionEnabled}
                    onChange={(e) => setAppPrefs({ ...appPrefs, compressionEnabled: e.target.checked })}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary">
                  <Save size={15} />
                  <span>Save Ingestion Settings</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Bell size={18} style={{ color: 'var(--primary-blue)' }} />
                Alert Routing & Webhook Integrations
              </div>
              <div className="card-subtitle">Direct incident notifications to email or team Slack channels</div>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="switch-label">
                  <div>
                    <div style={{ fontWeight: 600 }}>Email Notification Dispatch</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Send email bulletins whenever error thresholds are breached
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={notifSettings.emailAlerts}
                    onChange={(e) => setNotifSettings({ ...notifSettings, emailAlerts: e.target.checked })}
                  />
                  <span className="switch-slider" />
                </label>

                {notifSettings.emailAlerts && (
                  <div className="form-group" style={{ marginTop: '0.75rem' }}>
                    <label className="form-label">Alert Dispatch Email Address</label>
                    <input
                      type="email"
                      value={notifSettings.emailAddress}
                      onChange={(e) => setNotifSettings({ ...notifSettings, emailAddress: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <label className="switch-label">
                  <div>
                    <div style={{ fontWeight: 600 }}>Slack / Discord Incoming Webhook</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Broadcast real-time incident cards directly into your DevOps channels
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={notifSettings.slackEnabled}
                    onChange={(e) => setNotifSettings({ ...notifSettings, slackEnabled: e.target.checked })}
                  />
                  <span className="switch-slider" />
                </label>

                {notifSettings.slackEnabled && (
                  <div className="form-group" style={{ marginTop: '0.75rem' }}>
                    <label className="form-label">Incoming Webhook URL</label>
                    <input
                      type="text"
                      value={notifSettings.slackWebhook}
                      onChange={(e) => setNotifSettings({ ...notifSettings, slackWebhook: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <h4 style={{ marginBottom: '0.75rem' }}>Notification Severity Filter</h4>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notifSettings.notifyOnCritical}
                      onChange={(e) => setNotifSettings({ ...notifSettings, notifyOnCritical: e.target.checked })}
                    />
                    <span style={{ fontWeight: 600, color: 'var(--error-red)' }}>CRITICAL Alerts</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notifSettings.notifyOnWarning}
                      onChange={(e) => setNotifSettings({ ...notifSettings, notifyOnWarning: e.target.checked })}
                    />
                    <span style={{ fontWeight: 600, color: 'var(--warning-orange)' }}>WARNING Alerts</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notifSettings.notifyOnInfo}
                      onChange={(e) => setNotifSettings({ ...notifSettings, notifyOnInfo: e.target.checked })}
                    />
                    <span style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>INFO / Operational Events</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary">
                  <Save size={15} />
                  <span>Save Notification Routes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Alerting Thresholds */}
      {activeTab === 'thresholds' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Shield size={18} style={{ color: 'var(--primary-blue)' }} />
                System Anomaly & Incident Thresholds
              </div>
              <div className="card-subtitle">Automated triggers that raise system alarms and flag suspicious IPs</div>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">HTTP Error Rate Alarm (% of total requests)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={thresholds.errorRateThreshold}
                    onChange={(e) => setThresholds({ ...thresholds, errorRateThreshold: Number(e.target.value) })}
                  />
                  <span className="form-help-text">Triggers WARNING when rate &gt; 5.0%, CRITICAL when &gt; 10%</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Maximum Response Latency Tolerance (ms)</label>
                  <input
                    type="number"
                    value={thresholds.latencyThresholdMs}
                    onChange={(e) => setThresholds({ ...thresholds, latencyThresholdMs: Number(e.target.value) })}
                  />
                  <span className="form-help-text">Flags slow-query bottlenecks when exceeded</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Brute-Force Login Attempt Limit (per minute)</label>
                  <input
                    type="number"
                    value={thresholds.failedAuthThreshold}
                    onChange={(e) => setThresholds({ ...thresholds, failedAuthThreshold: Number(e.target.value) })}
                  />
                  <span className="form-help-text">IP is temporarily blacklisted upon reaching threshold</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Server Memory Saturation Threshold (%)</label>
                  <input
                    type="number"
                    value={thresholds.memoryThreshold}
                    onChange={(e) => setThresholds({ ...thresholds, memoryThreshold: Number(e.target.value) })}
                  />
                  <span className="form-help-text">Warns before OOM (Out-of-memory) errors occur</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary">
                  <Save size={15} />
                  <span>Apply Threshold Limits</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Theme & Appearance */}
      {activeTab === 'theme' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Palette size={18} style={{ color: 'var(--primary-blue)' }} />
                Dashboard Theme & Visual Density
              </div>
              <div className="card-subtitle">Customize styling accents, table density and display options</div>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Primary Brand Accent Color</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {[
                    { color: '#2563eb', label: 'Primary Blue (Default)' },
                    { color: '#0ea5e9', label: 'Cyan Teal' },
                    { color: '#8b5cf6', label: 'Indigo Purple' },
                    { color: '#10b981', label: 'Emerald Green' }
                  ].map((item) => (
                    <button
                      key={item.color}
                      type="button"
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: themePrefs.accentColor === item.color ? `2px solid ${item.color}` : '1px solid var(--border-color)',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => setThemePrefs({ ...themePrefs, accentColor: item.color })}
                    >
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: item.color }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <label className="switch-label">
                  <div>
                    <div style={{ fontWeight: 600 }}>Show IP Geolocation Badges</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Resolve client IP addresses to geographic country origin in tables
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={themePrefs.showGeoIP}
                    onChange={(e) => setThemePrefs({ ...themePrefs, showGeoIP: e.target.checked })}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <label className="switch-label">
                  <div>
                    <div style={{ fontWeight: 600 }}>Smooth Chart Transitions & Animations</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Enable fluid CSS animations on load and dataset transitions
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={themePrefs.enableAnimations}
                    onChange={(e) => setThemePrefs({ ...themePrefs, enableAnimations: e.target.checked })}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary">
                  <Save size={15} />
                  <span>Save Visual Preferences</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
