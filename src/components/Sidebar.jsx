import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Bell,
  UploadCloud,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Server,
  Activity
} from 'lucide-react';

export const Sidebar = ({
  isCollapsed,
  mobileOpen,
  onCloseMobile,
  onLogoutClick,
  activeAlertCount = 4
}) => {
  const menuItems = [
    {
      title: 'Main Menu',
      items: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/logs', label: 'Logs', icon: FileText },
        { path: '/errors', label: 'Error Analysis', icon: AlertTriangle },
        { path: '/alerts', label: 'Alerts', icon: Bell, badge: activeAlertCount },
        { path: '/upload', label: 'Log Upload', icon: UploadCloud },
        { path: '/reports', label: 'Reports', icon: BarChart3 }
      ]
    },
    {
      title: 'System & Administration',
      items: [
        { path: '/users', label: 'User Management', icon: Users },
        { path: '/settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <Server size={22} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-title">LogMonitor</span>
              <span className="sidebar-brand-sub">Server Intelligence</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {menuItems.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '0.75rem' }}>
              {!isCollapsed && (
                <div className="sidebar-section-title">{section.title}</div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className="sidebar-item-icon">
                      <Icon size={19} />
                    </span>
                    {!isCollapsed && (
                      <>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="sidebar-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer Area */}
        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="sidebar-system-pill">
              <span className="system-status-dot" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, color: '#f8fafc' }}>Server Online</span>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Cluster: Prod-US-East</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={onLogoutClick}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut size={19} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
