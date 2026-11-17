import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Page components
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import ErrorAnalysis from './pages/ErrorAnalysis';
import Alerts from './pages/Alerts';
import LogUpload from './pages/LogUpload';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Main 8 Academic Project Routes */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="logs" element={<Logs />} />
        <Route path="errors" element={<ErrorAnalysis />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="upload" element={<LogUpload />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
