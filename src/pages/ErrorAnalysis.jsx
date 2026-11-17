import React, { useState } from 'react';
import {
  AlertTriangle,
  Bug,
  ShieldAlert,
  Server,
  TrendingDown,
  Info,
  Calendar,
  Eye,
  CheckCircle2,
  FileCode,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

// Sample hourly error frequency
const errorFrequencyData = [
  { time: '00:00', client4xx: 22, server5xx: 8, total: 30 },
  { time: '02:00', client4xx: 12, server5xx: 3, total: 15 },
  { time: '04:00', client4xx: 7, server5xx: 1, total: 8 },
  { time: '06:00', client4xx: 18, server5xx: 4, total: 22 },
  { time: '08:00', client4xx: 52, server5xx: 18, total: 70 },
  { time: '10:00', client4xx: 96, server5xx: 44, total: 140 },
  { time: '12:00', client4xx: 125, server5xx: 55, total: 180 },
  { time: '14:00', client4xx: 142, server5xx: 58, total: 200 },
  { time: '16:00', client4xx: 165, server5xx: 65, total: 230 },
  { time: '18:00', client4xx: 118, server5xx: 52, total: 170 },
  { time: '20:00', client4xx: 98, server5xx: 42, total: 140 },
  { time: '22:00', client4xx: 71, server5xx: 30, total: 101 }
];

// Error Distribution by status code
const errorCodesData = [
  { code: '404', name: 'Not Found', count: 786, fill: '#f59e0b' },
  { code: '500', name: 'Internal Error', count: 344, fill: '#ef4444' },
  { code: '403', name: 'Forbidden', count: 192, fill: '#fbbf24' },
  { code: '503', name: 'Unavailable', count: 126, fill: '#dc2626' },
  { code: '401', name: 'Unauthorized', count: 88, fill: '#d97706' },
  { code: '502', name: 'Bad Gateway', count: 42, fill: '#b91c1c' }
];

// Error Breakdown Table Records
const errorIncidents = [
  {
    code: 404,
    description: 'Resource Not Found',
    count: 786,
    type: '4xx Client',
    share: '54.36%',
    primaryUrl: '/api/v1/products/item-undefined',
    impact: 'Low',
    recommendation: 'Fix dead client-side routing links and ensure deprecated catalog items return 301 redirects instead of 404.'
  },
  {
    code: 500,
    description: 'Internal Server Error',
    count: 344,
    type: '5xx Server',
    share: '23.79%',
    primaryUrl: '/api/v1/orders/checkout',
    impact: 'Critical',
    recommendation: 'NullPointerException in Stripe payment gateway wrapper. Patch StripeGateway.java:142 with null-safe optional check.'
  },
  {
    code: 403,
    description: 'Forbidden Access Attempt',
    count: 192,
    type: '4xx Client',
    share: '13.28%',
    primaryUrl: '/admin/config/database.yml',
    impact: 'Medium',
    recommendation: 'Attacker scanning for configuration credentials. Edge WAF rules active; client IPs automatically blacklisted.'
  },
  {
    code: 503,
    description: 'Service Unavailable (Pool Saturation)',
    count: 126,
    type: '5xx Server',
    share: '8.71%',
    primaryUrl: '/api/v1/analytics/realtime-stream',
    impact: 'High',
    recommendation: 'HikariCP connection pool exhausted during traffic peaks. Increase max pool size from 100 to 250 in application.properties.'
  },
  {
    code: 401,
    description: 'Unauthorized Authentication Failure',
    count: 88,
    type: '4xx Client',
    share: '6.08%',
    primaryUrl: '/api/v1/auth/login',
    impact: 'Medium',
    recommendation: 'Repeated bad password guesses. Rate limiter in place (max 10 attempts per minute per IP).'
  }
];

export const ErrorAnalysis = () => {
  const [selectedRange, setSelectedRange] = useState('24h');
  const [activeModalError, setActiveModalError] = useState(null);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h1>
            <Bug size={28} style={{ color: 'var(--error-red)' }} />
            HTTP Error Analytics & Root Cause
          </h1>
          <p className="page-header-subtitle">
            Diagnostic insights into 4xx client anomalies and 5xx backend server exceptions
          </p>
        </div>

        <div className="page-header-actions">
          <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#ffffff', padding: '0.3rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              className={`btn-secondary ${selectedRange === '24h' ? 'active' : ''}`}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                border: 'none',
                backgroundColor: selectedRange === '24h' ? 'var(--primary-blue)' : 'transparent',
                color: selectedRange === '24h' ? '#ffffff' : 'var(--text-secondary)'
              }}
              onClick={() => setSelectedRange('24h')}
            >
              24 Hours
            </button>
            <button
              type="button"
              className={`btn-secondary ${selectedRange === '7d' ? 'active' : ''}`}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                border: 'none',
                backgroundColor: selectedRange === '7d' ? 'var(--primary-blue)' : 'transparent',
                color: selectedRange === '7d' ? '#ffffff' : 'var(--text-secondary)'
              }}
              onClick={() => setSelectedRange('7d')}
            >
              7 Days
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <section className="error-summary-strip">
        <div className="error-stat-item">
          <div className="error-stat-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="error-stat-details">
            <span className="error-stat-title">Total HTTP Errors</span>
            <div className="error-stat-number">1,446</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--success-green)', fontWeight: 600 }}>
              &darr; 3.1% vs previous period
            </span>
          </div>
        </div>

        <div className="error-stat-item">
          <div className="error-stat-icon" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="error-stat-details">
            <span className="error-stat-title">4xx Client Errors</span>
            <div className="error-stat-number">986</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              68.2% of total errors
            </span>
          </div>
        </div>

        <div className="error-stat-item">
          <div className="error-stat-icon" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <Server size={24} />
          </div>
          <div className="error-stat-details">
            <span className="error-stat-title">5xx Server Errors</span>
            <div className="error-stat-number">460</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--error-red)', fontWeight: 600 }}>
              31.8% of total errors
            </span>
          </div>
        </div>

        <div className="error-stat-item">
          <div className="error-stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="error-stat-details">
            <span className="error-stat-title">Top Culprit Error</span>
            <div className="error-stat-number" style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>
              404 Not Found
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              786 events (54.4% share)
            </span>
          </div>
        </div>
      </section>

      {/* Dual Charts: Frequency & Distribution */}
      <section className="charts-grid">
        {/* Error Frequency Line Chart */}
        <ChartCard
          title="Hourly Error Timeline: 4xx vs 5xx"
          subtitle="Fluctuation in client failures versus server exceptions over the day"
          icon={TrendingDown}
        >
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={errorFrequencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="client4xx" name="4xx Client Errors" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="server5xx" name="5xx Server Exceptions" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Error Distribution Bar Chart */}
        <ChartCard
          title="Errors by HTTP Status Code"
          subtitle="Relative volume per HTTP error code"
          icon={BarChart}
        >
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={errorCodesData} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="code" type="category" tick={{ fontSize: 12, fill: '#0f172a', fontWeight: 600 }} axisLine={false} />
                <Tooltip
                  formatter={(val, name, item) => [`${val} occurrences`, `${item.payload.code} - ${item.payload.name}`]}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Error Breakdown Table */}
      <section className="dashboard-full-width">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <AlertTriangle size={18} style={{ color: 'var(--error-red)' }} />
                Detailed Error Classification & Mitigation
              </div>
              <div className="card-subtitle">Impact level, affected endpoints, and recommended resolution steps</div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Status Code</th>
                  <th>Error Description</th>
                  <th>Category</th>
                  <th>Volume</th>
                  <th>Proportion</th>
                  <th>Impact</th>
                  <th>Target Endpoint</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {errorIncidents.map((incident) => (
                  <tr key={incident.code}>
                    <td>
                      <StatusBadge type="statusCode" value={incident.code} />
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {incident.description}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{incident.type}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700 }}>{incident.count.toLocaleString()}</span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--text-secondary)' }}>{incident.share}</span>
                    </td>
                    <td>
                      <span className={`badge ${incident.impact === 'Critical' ? 'badge-error' : incident.impact === 'High' ? 'badge-warning' : 'badge-neutral'}`}>
                        {incident.impact}
                      </span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {incident.primaryUrl}
                      </code>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        onClick={() => setActiveModalError(incident)}
                      >
                        <Eye size={13} />
                        <span>Mitigate</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Error Detail & Mitigation Modal */}
      {activeModalError && (
        <Modal
          isOpen={!!activeModalError}
          onClose={() => setActiveModalError(null)}
          title={`Error Remediation: HTTP ${activeModalError.code} (${activeModalError.description})`}
          icon={ShieldAlert}
          footer={
            <button
              type="button"
              className="btn-primary"
              onClick={() => setActiveModalError(null)}
            >
              Acknowledge & Close
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <StatusBadge type="statusCode" value={activeModalError.code} />
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{activeModalError.description}</span>
              <span className={`badge ${activeModalError.impact === 'Critical' ? 'badge-error' : 'badge-warning'}`}>
                {activeModalError.impact} Impact
              </span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Primary Affected Route</div>
              <code style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 600 }}>{activeModalError.primaryUrl}</code>
            </div>

            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success-green)' }} />
                Recommended Remediation Steps
              </h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                {activeModalError.recommendation}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ErrorAnalysis;
