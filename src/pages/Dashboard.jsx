import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  CheckCircle,
  AlertOctagon,
  Percent,
  TrendingUp,
  PieChart as PieIcon,
  Server,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  HardDrive,
  Clock,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import { dashboardService, logsService } from '../services/api';

// Custom Tooltip for Recharts
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip">
        <div className="custom-chart-tooltip-title">{label}</div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="custom-chart-tooltip-item">
            <span style={{ color: entry.color, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span style={{ fontWeight: 700 }}>{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('24h');
  const [summary, setSummary] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [statusDist, setStatusDist] = useState([]);
  const [topErrors, setTopErrors] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      const [sum, trends, dist, errors, logsRes, sys] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getTrend(timeframe),
        dashboardService.getStatusDistribution(),
        dashboardService.getTopErrors(),
        logsService.getLogs({}),
        dashboardService.getSystemStatus()
      ]);

      setSummary(sum);
      setTrendData(trends);
      setStatusDist(dist);
      setTopErrors(errors);
      setRecentLogs(logsRes.logs.slice(0, 6));
      setSystemStatus(sys);
    } catch (err) {
      console.error('Failed to load dashboard metrics', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [timeframe]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    loadDashboardData();
  };

  if (isLoading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="system-status-dot" style={{ margin: '0 auto 1rem', width: '14px', height: '14px' }} />
        <h3>Loading telemetry and log intelligence...</h3>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h1>
            <Server size={28} style={{ color: 'var(--primary-blue)' }} />
            Server Operations Overview
          </h1>
          <p className="page-header-subtitle">
            Monitored Cluster: <strong>{systemStatus?.serverEnvironment || 'Production Nginx + Spring Boot'}</strong> &bull; Latency: <strong>42ms</strong>
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            title="Refresh Metrics"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Telemetry'}</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/logs')}
          >
            <span>Live Log Stream</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* A. Statistics Cards */}
      <section className="stats-grid">
        <StatCard
          title="Total Requests"
          value={summary?.totalRequests?.formatted || '25,430'}
          change={summary?.totalRequests?.change || '+12.5%'}
          isPositive={true}
          label={summary?.totalRequests?.label || 'vs yesterday'}
          icon={Activity}
          color="blue"
        />

        <StatCard
          title="Successful Requests"
          value={summary?.successfulRequests?.formatted || '23,984'}
          change={summary?.successfulRequests?.change || '+14.2%'}
          isPositive={true}
          label={summary?.successfulRequests?.label || '94.31% success rate'}
          icon={CheckCircle}
          color="green"
        />

        <StatCard
          title="Error Requests"
          value={summary?.errorRequests?.formatted || '1,446'}
          change={summary?.errorRequests?.change || '-3.1%'}
          isPositive={false}
          isImprovement={true}
          label={summary?.errorRequests?.label || '5.69% of total traffic'}
          icon={AlertOctagon}
          color="red"
        />

        <StatCard
          title="Error Rate"
          value={summary?.errorRate?.formatted || '5.69%'}
          change={summary?.errorRate?.change || '-0.42%'}
          isPositive={false}
          isImprovement={true}
          label={summary?.errorRate?.label || 'Threshold: < 5.0%'}
          icon={Percent}
          color="orange"
        />
      </section>

      {/* B. Request Trend Chart & C. HTTP Response Status Distribution */}
      <section className="charts-grid">
        {/* Request Trend Chart */}
        <ChartCard
          title="Request Volume & Error Trends"
          subtitle="Real-time traffic throughput and HTTP failure correlation"
          icon={TrendingUp}
          action={
            <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#f1f5f9', padding: '0.2rem', borderRadius: '8px' }}>
              <button
                type="button"
                className={`btn-secondary ${timeframe === '24h' ? 'active' : ''}`}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  border: 'none',
                  backgroundColor: timeframe === '24h' ? '#ffffff' : 'transparent',
                  fontWeight: timeframe === '24h' ? '600' : '400',
                  boxShadow: timeframe === '24h' ? 'var(--shadow-sm)' : 'none'
                }}
                onClick={() => setTimeframe('24h')}
              >
                24 Hours
              </button>
              <button
                type="button"
                className={`btn-secondary ${timeframe === '7d' ? 'active' : ''}`}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  border: 'none',
                  backgroundColor: timeframe === '7d' ? '#ffffff' : 'transparent',
                  fontWeight: timeframe === '7d' ? '600' : '400',
                  boxShadow: timeframe === '7d' ? 'var(--shadow-sm)' : 'none'
                }}
                onClick={() => setTimeframe('7d')}
              >
                7 Days
              </button>
              <button
                type="button"
                className={`btn-secondary ${timeframe === '30d' ? 'active' : ''}`}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  border: 'none',
                  backgroundColor: timeframe === '30d' ? '#ffffff' : 'transparent',
                  fontWeight: timeframe === '30d' ? '600' : '400',
                  boxShadow: timeframe === '30d' ? 'var(--shadow-sm)' : 'none'
                }}
                onClick={() => setTimeframe('30d')}
              >
                30 Days
              </button>
            </div>
          }
        >
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey={timeframe === '24h' ? 'time' : 'date'}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Requests"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="success"
                  name="Successful"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSuccess)"
                />
                <Area
                  type="monotone"
                  dataKey="errors"
                  name="Errors"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorErrors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* HTTP Response Status Distribution */}
        <ChartCard
          title="HTTP Status Breakdown"
          subtitle="Proportional distribution of response classes"
          icon={PieIcon}
        >
          <div style={{ width: '100%', height: 230, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {statusDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name, item) => [
                    `${val.toLocaleString()} reqs (${item.payload.percentage}%)`,
                    item.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center Metric */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {summary?.successfulRequests?.formatted || '23.9k'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Healthy
              </div>
            </div>
          </div>

          {/* Custom Legend with Counts & Percentages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
            {statusDist.map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.count.toLocaleString()} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>

      {/* D. Top Errors & F. System Status */}
      <section className="dashboard-bottom-grid">
        {/* Top Errors Table */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <AlertTriangle size={18} style={{ color: 'var(--warning-orange)' }} />
                Most Frequent HTTP Errors
              </div>
              <div className="card-subtitle">Highest frequency error responses in the last 24 hours</div>
            </div>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={() => navigate('/errors')}
            >
              Full Analysis &rarr;
            </button>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Status Code</th>
                  <th>Occurrences</th>
                  <th>Description</th>
                  <th>Sample Endpoint</th>
                </tr>
              </thead>
              <tbody>
                {topErrors.map((err) => (
                  <tr key={err.code}>
                    <td>
                      <StatusBadge type="statusCode" value={err.code} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700 }}>{err.count.toLocaleString()}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          ({err.percentage}%)
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{err.description}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {err.sampleUrl}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* F. System Status & Health */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <ShieldCheck size={18} style={{ color: 'var(--success-green)' }} />
                Server Health & Infrastructure
              </div>
              <div className="card-subtitle">Telemetry pipeline and system resource utilization</div>
            </div>
            <span className="health-score-badge">
              <span className="system-status-dot" />
              {systemStatus?.serverHealth}% Healthy
            </span>
          </div>

          <div className="card-body">
            <div className="system-metrics-list">
              {/* CPU Usage */}
              <div className="system-metric-row">
                <div className="system-metric-label-val">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Cpu size={14} /> CPU Utilization
                  </span>
                  <span>{systemStatus?.cpuUsage}% / 100%</span>
                </div>
                <div className="system-progress-bar-bg">
                  <div
                    className="system-progress-bar-fill"
                    style={{
                      width: `${systemStatus?.cpuUsage}%`,
                      backgroundColor: 'var(--primary-blue)'
                    }}
                  />
                </div>
              </div>

              {/* Memory Usage */}
              <div className="system-metric-row">
                <div className="system-metric-label-val">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Activity size={14} /> Memory (RAM) Ingestion
                  </span>
                  <span>{systemStatus?.memoryUsage}% (8.6 GB / 16 GB)</span>
                </div>
                <div className="system-progress-bar-bg">
                  <div
                    className="system-progress-bar-fill"
                    style={{
                      width: `${systemStatus?.memoryUsage}%`,
                      backgroundColor: 'var(--warning-orange)'
                    }}
                  />
                </div>
              </div>

              {/* Storage / Disk */}
              <div className="system-metric-row">
                <div className="system-metric-label-val">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <HardDrive size={14} /> Log Archive Disk Storage
                  </span>
                  <span>{systemStatus?.diskUsage}% (340 GB / 500 GB)</span>
                </div>
                <div className="system-progress-bar-bg">
                  <div
                    className="system-progress-bar-fill"
                    style={{
                      width: `${systemStatus?.diskUsage}%`,
                      backgroundColor: '#6366f1'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="system-meta-grid">
              <div className="system-meta-item">
                <span className="system-meta-title">Log Processing Engine</span>
                <span className="system-meta-val">{systemStatus?.logProcessingStatus}</span>
              </div>
              <div className="system-meta-item">
                <span className="system-meta-title">Ingestion Throughput</span>
                <span className="system-meta-val">{systemStatus?.processingRate}</span>
              </div>
              <div className="system-meta-item">
                <span className="system-meta-title">Last Buffer Sync</span>
                <span className="system-meta-val">{systemStatus?.lastLogUpdate}</span>
              </div>
              <div className="system-meta-item">
                <span className="system-meta-title">Cluster System Uptime</span>
                <span className="system-meta-val">{systemStatus?.uptime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. Recent Logs Feed */}
      <section className="dashboard-full-width">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Activity size={18} style={{ color: 'var(--primary-blue)' }} />
                Real-Time Recent Server Logs
              </div>
              <div className="card-subtitle">Live stream of latest incoming server HTTP requests</div>
            </div>

            <button
              type="button"
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.95rem' }}
              onClick={() => navigate('/logs')}
            >
              <span>View All Logs</span>
              <ExternalLink size={14} />
            </button>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Client IP</th>
                  <th>Method</th>
                  <th>Requested URI</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}>
                        <Clock size={13} style={{ color: 'var(--text-muted)' }} />
                        {log.timestamp}
                      </div>
                    </td>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {log.ip}
                      </span>
                    </td>
                    <td>
                      <StatusBadge type="method" value={log.method} />
                    </td>
                    <td>
                      <span className="mono-font" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {log.url}
                      </span>
                    </td>
                    <td>
                      <StatusBadge type="statusCode" value={log.statusCode} />
                    </td>
                    <td>
                      <span style={{
                        fontWeight: 600,
                        color: log.responseTime > 1000 ? 'var(--error-red)' : log.responseTime > 200 ? 'var(--warning-orange)' : 'var(--text-secondary)'
                      }}>
                        {log.responseTime}ms
                      </span>
                    </td>
                    <td>
                      <StatusBadge type="severity" value={log.severity} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
