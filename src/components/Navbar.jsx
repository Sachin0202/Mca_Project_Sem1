import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Calendar,
  ChevronDown,
  User,
  ShieldCheck,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar, onLogoutClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dynamic breadcrumb / title based on route
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return { title: 'System Dashboard', subtitle: 'Real-time telemetry and server performance overview' };
      case '/logs':
        return { title: 'Server Logs Management', subtitle: 'Inspect, filter, search and debug HTTP log events' };
      case '/errors':
        return { title: 'HTTP Error Analytics', subtitle: 'Deep dive into 4xx client and 5xx server exceptions' };
      case '/alerts':
        return { title: 'System Security & Alerts', subtitle: 'Live anomaly thresholds and incident response queue' };
      case '/upload':
        return { title: 'Log File Ingestion', subtitle: 'Upload and parse Apache, Nginx and Spring Boot logs' };
      case '/reports':
        return { title: 'Performance & Audit Reports', subtitle: 'Generate and export comprehensive server telemetry' };
      case '/users':
        return { title: 'Admin User Management', subtitle: 'Manage operator credentials, roles and system access' };
      case '/settings':
        return { title: 'Application Preferences', subtitle: 'Configure alerting thresholds, storage and integrations' };
      default:
        return { title: 'LogMonitor Admin', subtitle: 'Smart Web Server Log Management' };
    }
  };

  const pageInfo = getPageInfo();

  // Format current date: e.g. "Wednesday, Nov 11, 2026"
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const sampleNotifications = [
    {
      id: 1,
      title: '5xx Spike on Checkout',
      time: '2 mins ago',
      level: 'critical',
      desc: '344 Internal Server Errors logged in 5m window.'
    },
    {
      id: 2,
      title: 'Brute-force Attempt Blocked',
      time: '6 mins ago',
      level: 'warning',
      desc: 'IP 45.33.32.156 rate limited after 48 failed attempts.'
    },
    {
      id: 3,
      title: 'HikariCP Pool Resized',
      time: '25 mins ago',
      level: 'info',
      desc: 'Active pool scaled to 250 connections.'
    }
  ];

  return (
    <header className="top-navbar">
      {/* Left section: Sidebar toggle & Page Header */}
      <div className="navbar-left">
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation sidebar"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-page-title-group">
          <span className="navbar-breadcrumbs">LogMonitor / Admin</span>
          <span className="navbar-page-title">{pageInfo.title}</span>
        </div>
      </div>

      {/* Right section: Date, Notifications, Profile */}
      <div className="navbar-right">
        {/* Date Display */}
        <div className="navbar-date-display">
          <Calendar size={14} style={{ color: 'var(--primary-blue)' }} />
          <span>{formattedDate}</span>
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            type="button"
            className="navbar-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            title="System Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="dropdown-menu" style={{ width: '320px' }}>
              <div className="dropdown-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Bell size={16} />
                  <span>Notifications (3 unread)</span>
                </div>
                <button
                  type="button"
                  style={{ background: 'transparent', color: 'var(--primary-blue)', fontSize: '0.75rem', fontWeight: 600 }}
                  onClick={() => setShowNotifications(false)}
                >
                  Mark read
                </button>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="dropdown-item"
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      borderBottom: '1px solid var(--border-subtle)',
                      padding: '0.85rem 1rem'
                    }}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/alerts');
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.82rem' }}>
                        {notif.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {notif.desc}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '0.6rem 1rem', textAlign: 'center', backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
                <button
                  type="button"
                  style={{ background: 'transparent', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.78rem' }}
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/alerts');
                  }}
                >
                  View All System Alerts &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <div
            className="navbar-profile-trigger"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            role="button"
            tabIndex={0}
          >
            <div className="profile-avatar">SK</div>
            <div className="profile-info">
              <span className="profile-name">Sachin Kumar</span>
              <span className="profile-role">Lead Administrator</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </div>

          {showProfileMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Sachin Kumar</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>sachin.admin@logmonitor.internal</div>
                </div>
              </div>

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
              >
                <User size={16} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
              >
                <SettingsIcon size={16} />
                <span>System Preferences</span>
              </button>

              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/dashboard');
                }}
              >
                <ShieldCheck size={16} />
                <span>Cluster Health (99.8%)</span>
              </button>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="dropdown-item"
                style={{ color: 'var(--error-red)' }}
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogoutClick();
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
