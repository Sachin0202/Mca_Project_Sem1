import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Filter,
  Eye,
  Download,
  RotateCcw,
  Copy,
  Check,
  Globe,
  Clock,
  Terminal,
  Server
} from 'lucide-react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { logsService } from '../services/api';

export const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedDateRange, setSelectedDateRange] = useState('today');

  // Modal State for Log Details
  const [activeLog, setActiveLog] = useState(null);
  const [copied, setCopied] = useState(false);

  // Fetch logs
  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await logsService.getLogs({
        search: searchQuery,
        method: selectedMethod,
        statusCode: selectedStatus,
        severity: selectedSeverity
      });
      setLogs(res.logs || []);
    } catch (err) {
      console.error('Failed to fetch server logs', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [searchQuery, selectedMethod, selectedStatus, selectedSeverity]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedMethod('ALL');
    setSelectedStatus('ALL');
    setSelectedSeverity('ALL');
    setSelectedDateRange('today');
  };

  // Copy raw JSON to clipboard
  const handleCopyRaw = () => {
    if (!activeLog) return;
    navigator.clipboard.writeText(JSON.stringify(activeLog, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export filtered logs as CSV
  const handleExportCSV = () => {
    if (!logs.length) return;
    const headers = ['ID', 'Timestamp', 'IP', 'Method', 'URL', 'Status', 'ResponseTime_ms', 'Severity', 'Country'];
    const rows = logs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      l.ip,
      l.method,
      `"${l.url}"`,
      l.statusCode,
      l.responseTime,
      l.severity,
      `"${l.country || 'N/A'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `server_logs_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Table Columns Definition
  const columns = [
    {
      key: 'id',
      title: 'Log ID',
      sortable: true,
      render: (val) => <span className="mono-font" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{val}</span>
    },
    {
      key: 'timestamp',
      title: 'Timestamp',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {val}
        </span>
      )
    },
    {
      key: 'ip',
      title: 'Client IP',
      sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="mono-font" style={{ fontWeight: 600 }}>{val}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{row.country || 'Unknown'}</span>
        </div>
      )
    },
    {
      key: 'method',
      title: 'Method',
      sortable: true,
      render: (val) => <StatusBadge type="method" value={val} />
    },
    {
      key: 'url',
      title: 'Requested URI',
      sortable: true,
      render: (val) => (
        <span
          className="mono-font"
          style={{
            fontSize: '0.8rem',
            maxWidth: '300px',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title={val}
        >
          {val}
        </span>
      )
    },
    {
      key: 'statusCode',
      title: 'Status',
      sortable: true,
      render: (val) => <StatusBadge type="statusCode" value={val} />
    },
    {
      key: 'responseTime',
      title: 'Latency',
      sortable: true,
      render: (val) => (
        <span
          style={{
            fontWeight: 600,
            fontSize: '0.85rem',
            color: val > 1000 ? 'var(--error-red)' : val > 300 ? 'var(--warning-orange)' : 'var(--text-secondary)'
          }}
        >
          {val} ms
        </span>
      )
    },
    {
      key: 'severity',
      title: 'Severity',
      sortable: true,
      render: (val) => <StatusBadge type="severity" value={val} />
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, row) => (
        <button
          type="button"
          className="btn-secondary"
          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
          onClick={() => setActiveLog(row)}
          title="Inspect Complete Log Event"
        >
          <Eye size={13} />
          <span>Details</span>
        </button>
      )
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h1>
            <FileText size={28} style={{ color: 'var(--primary-blue)' }} />
            Web Server Logs Management
          </h1>
          <p className="page-header-subtitle">
            Query, filter, inspect and debug Apache, Nginx and Spring Boot web server access records
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleExportCSV}
            title="Download CSV"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input */}
            <div style={{ flex: '1 1 280px' }}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by IP, URL, or error trace..."
              />
            </div>

            {/* Filter Dropdowns */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              {/* Method Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Method:</span>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  style={{ minWidth: '100px' }}
                >
                  <option value="ALL">All Methods</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              {/* Status Code Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ minWidth: '110px' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="2xx">2xx Success</option>
                  <option value="3xx">3xx Redirect</option>
                  <option value="4xx">4xx Client Error</option>
                  <option value="5xx">5xx Server Error</option>
                  <option value="200">200 OK</option>
                  <option value="401">401 Unauthorized</option>
                  <option value="403">403 Forbidden</option>
                  <option value="404">404 Not Found</option>
                  <option value="500">500 Server Error</option>
                  <option value="503">503 Unavailable</option>
                </select>
              </div>

              {/* Severity Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Severity:</span>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  style={{ minWidth: '110px' }}
                >
                  <option value="ALL">All Severities</option>
                  <option value="INFO">INFO</option>
                  <option value="WARN">WARN</option>
                  <option value="ERROR">ERROR</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                type="button"
                className="btn-secondary"
                onClick={handleResetFilters}
                title="Reset all search filters"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Logs Table */}
      <DataTable
        columns={columns}
        data={logs}
        keyField="id"
        pageSize={10}
        isLoading={isLoading}
        emptyMessage="No server log entries matched your criteria."
      />

      {/* Detailed Log Modal */}
      {activeLog && (
        <Modal
          isOpen={!!activeLog}
          onClose={() => setActiveLog(null)}
          title={`Log Details - ${activeLog.id}`}
          icon={FileText}
          size="lg"
          footer={
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCopyRaw}
              >
                {copied ? <Check size={14} style={{ color: 'var(--success-green)' }} /> : <Copy size={14} />}
                <span>{copied ? 'Copied Raw JSON' : 'Copy JSON'}</span>
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setActiveLog(null)}
              >
                Close
              </button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Top metadata badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StatusBadge type="method" value={activeLog.method} />
                <StatusBadge type="statusCode" value={activeLog.statusCode} />
                <StatusBadge type="severity" value={activeLog.severity} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} />
                {activeLog.timestamp}
              </div>
            </div>

            {/* Quick Grid Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              fontSize: '0.85rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Requested URL</span>
                <div className="mono-font" style={{ fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                  {activeLog.url}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Client IP & Location</span>
                <div className="mono-font" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {activeLog.ip} ({activeLog.country || 'N/A'})
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Response Latency</span>
                <div style={{ fontWeight: 600 }}>
                  {activeLog.responseTime} ms
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Bytes Transferred</span>
                <div style={{ fontWeight: 600 }}>
                  {activeLog.bytesSent ? `${activeLog.bytesSent} bytes` : '0 bytes (Cached/No content)'}
                </div>
              </div>
            </div>

            {/* User Agent */}
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>User Agent</span>
              <div style={{
                padding: '0.65rem 0.85rem',
                backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
                wordBreak: 'break-all'
              }}>
                {activeLog.userAgent || 'Not supplied'}
              </div>
            </div>

            {/* Response Summary */}
            {activeLog.details?.responseSummary && (
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Server Ingestion Diagnostic</span>
                <div style={{
                  padding: '0.75rem 0.85rem',
                  backgroundColor: '#f1f5f9',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  marginTop: '0.25rem',
                  lineHeight: '1.4'
                }}>
                  {activeLog.details.responseSummary}
                </div>
              </div>
            )}

            {/* Error Stack Trace if Present */}
            {activeLog.details?.stackTrace && (
              <div>
                <span style={{ color: 'var(--error-red)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Terminal size={14} /> Server Exception Traceback
                </span>
                <pre style={{
                  backgroundColor: '#0f172a',
                  color: '#f87171',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.75rem',
                  overflowX: 'auto',
                  marginTop: '0.35rem',
                  lineHeight: '1.5'
                }}>
                  {activeLog.details.stackTrace}
                </pre>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Logs;
