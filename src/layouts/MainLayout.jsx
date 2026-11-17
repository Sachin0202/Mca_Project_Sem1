import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { LogOut, AlertCircle } from 'lucide-react';

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    // In actual auth flow, tokens would be cleared
    localStorage.removeItem('logmonitor_auth_token');
    alert('Logged out successfully! Redirecting to Dashboard as guest admin.');
    navigate('/');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      {/* Main Content Area */}
      <div className={`main-content-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          onLogoutClick={() => setShowLogoutModal(true)}
        />

        <main className="page-container">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Administrator Logout"
        icon={LogOut}
        footer={
          <>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={handleConfirmLogout}
            >
              Confirm Logout
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--error-bg)',
            color: 'var(--error-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Are you sure you want to sign out?
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              You will need to re-authenticate with your administrator credentials to access system telemetry, export confidential audit reports, and configure server firewall alerts.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MainLayout;
