import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Eye,
  Plus,
  RefreshCw,
  Search,
  RotateCcw
} from 'lucide-react';

import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { alertsService } from '../services/api';

export const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  // Modal states
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);
  const [newRule, setNewRule] = useState({
    title: '',
    severity: 'WARNING',
    endpoint: '',
    threshold: ''
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const data = await alertsService.getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching alerts', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  // Compute Statistics
  const stats = useMemo(() => {
    const total = alerts.length;
    const critical = alerts.filter(a => a.severity === 'CRITICAL' && a.status === 'ACTIVE').length;
    const warning = alerts.filter(a => a.severity === 'WARNING' && a.status === 'ACTIVE').length;
    const resolved = alerts.filter(a => a.status === 'RESOLVED').length;
    return { total, critical, warning, resolved };
  }, [alerts]);

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch =
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
      const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [alerts, searchQuery, filterStatus, filterSeverity]);

  // Toggle Resolve / Active
  const handleToggleResolve = async (alertId) => {
    const target = alerts.find(a => a.id === alertId);
    if (!target) return;

    const newStatus = target.status === 'ACTIVE' ? 'RESOLVED' : 'ACTIVE';
    const updated = alerts.map(a =>
      a.id === alertId
        ? {
            ...a,
            status: newStatus,
            resolvedAt: newStatus === 'RESOLVED' ? new Date().toISOString().replace('T', ' ').slice(0, 19) : null
          }
        : a
    );
    setAlerts(updated);
    showToast(`Alert ${alertId} marked as ${newStatus}`);
  };

  // Delete Alert
  const handleDeleteAlert = (alertId) => {
    if (window.confirm(`Are you sure you want to dismiss alert ${alertId}?`)) {
      setAlerts(alerts.filter(a => a.id !== alertId));
      showToast(`Alert ${alertId} deleted.`);
    }
  };

  // Create Custom Rule / Test Alert
  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRule.title) return;

    const newAlertObj = {
      id: `ALT-${Math.floor(Math.random() * 900) + 600}`,
      title: newRule.title,
      description: `Threshold exceeded: ${newRule.threshold || 'Condition triggered'} on ${newRule.endpoint || 'General Traffic'}`,
      severity: newRule.severity,
      status: 'ACTIVE',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      resolvedAt: null,
      source: 'Custom Alert Rule',
      affectedEndpoint: newRule.endpoint || '/api/*',
      affectedIp: 'Multiple IPs',
      metricThreshold: newRule.threshold || '> 5% threshold',
      observedValue: 'Condition triggered',
      recommendation: 'Check logs and verify system threshold integrity.'
    };

    setAlerts([newAlertObj, ...alerts]);
    setShowNewRuleModal(false);
    setNewRule({ title: '', severity: 'WARNING', endpoint: '', threshold: '' });
    showToast(`New alert rule created & activated!`);
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
            <Bell size={28} style={{ color: 'var(--primary-blue)' }} />
            System Alerts & Anomaly Monitor
          </h1>
          <p className="page-header-subtitle">
            Configure threshold rules, track anomalous log spikes and orchestrate incident mitigation
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={loadAlerts}
          >
            <RefreshCw size={15} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowNewRuleModal(true)}
          >
            <Plus size={16} />
            <span>Create Alert Rule</span>
          </button>
        </div>
      </div>

      {/* Alerts Stats Overview */}
      <section className="alerts-overview-grid">
        <StatCard
          title="Total Registered Alerts"
          value={stats.total}
          label="Cumulative alerts in buffer"
          icon={Bell}
          color="blue"
        />

        <StatCard
          title="Critical Active Alerts"
          value={stats.critical}
          label="Requires immediate attention"
          icon={AlertOctagon}
          color="red"
          isPositive={false}
          isImprovement={stats.critical === 0}
        />

        <StatCard
          title="Warning Alerts"
          value={stats.warning}
          label="Degraded performance alerts"
          icon={AlertTriangle}
          color="orange"
          isPositive={false}
        />

        <StatCard
          title="Resolved Alerts"
          value={stats.resolved}
          label="Successfully mitigated incidents"
          icon={CheckCircle}
          color="green"
        />
      </section>

      {/* Filters & Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 280px' }}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search alerts by title, description or ID..."
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ minWidth: '120px' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active Alerts</option>
                  <option value="RESOLVED">Resolved Alerts</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Severity:</span>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  style={{ minWidth: '120px' }}
                >
                  <option value="ALL">All Severities</option>
                  <option value="CRITICAL">Critical Only</option>
                  <option value="WARNING">Warning Only</option>
                  <option value="INFO">Info Only</option>
                </select>
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('ALL');
                  setFilterSeverity('ALL');
                }}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <ShieldCheck size={18} style={{ color: 'var(--primary-blue)' }} />
              Live Incident & Alert History
            </div>
            <div className="card-subtitle">Real-time alerts triggered by threshold violations</div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing {filteredAlerts.length} alerts
          </span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Severity</th>
                <th>Alert Title & Description</th>
                <th>Detection Rule / Source</th>
                <th>Affected Target</th>
                <th>Detected At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No alerts match your current filter criteria.</div>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td>
                      <span className="mono-font" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
                        {alert.id}
                      </span>
                    </td>
                    <td>
                      <StatusBadge type="severity" value={alert.severity} />
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{alert.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {alert.description}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{alert.source}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.75rem' }}>{alert.affectedEndpoint}</code>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{alert.timestamp}</span>
                    </td>
                    <td>
                      <StatusBadge type="status" value={alert.status} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          onClick={() => setSelectedAlert(alert)}
                          title="View Details"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          type="button"
                          className={alert.status === 'ACTIVE' ? 'btn-success' : 'btn-secondary'}
                          style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          onClick={() => handleToggleResolve(alert.id)}
                          title={alert.status === 'ACTIVE' ? 'Mark Resolved' : 'Reopen Alert'}
                        >
                          <CheckCircle2 size={13} />
                          <span>{alert.status === 'ACTIVE' ? 'Resolve' : 'Reopen'}</span>
                        </button>

                        <button
                          type="button"
                          className="btn-danger"
                          style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          onClick={() => handleDeleteAlert(alert.id)}
                          title="Delete Alert"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <Modal
          isOpen={!!selectedAlert}
          onClose={() => setSelectedAlert(null)}
          title={`Alert Details: ${selectedAlert.id}`}
          icon={Bell}
          size="lg"
          footer={
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedAlert(null)}
              >
                Close
              </button>
              <button
                type="button"
                className={selectedAlert.status === 'ACTIVE' ? 'btn-success' : 'btn-secondary'}
                onClick={() => {
                  handleToggleResolve(selectedAlert.id);
                  setSelectedAlert(null);
                }}
              >
                {selectedAlert.status === 'ACTIVE' ? 'Mark as Resolved' : 'Reopen Incident'}
              </button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <StatusBadge type="severity" value={selectedAlert.severity} />
                <StatusBadge type="status" value={selectedAlert.status} />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedAlert.timestamp}</span>
            </div>

            <div>
              <h3 style={{ marginBottom: '0.3rem' }}>{selectedAlert.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{selectedAlert.description}</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Threshold Rule</span>
                <div style={{ fontWeight: 600 }}>{selectedAlert.metricThreshold}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Observed Value</span>
                <div style={{ fontWeight: 600, color: 'var(--error-red)' }}>{selectedAlert.observedValue}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Affected Endpoint</span>
                <code style={{ fontSize: '0.8rem' }}>{selectedAlert.affectedEndpoint}</code>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Originating IP</span>
                <code style={{ fontSize: '0.8rem' }}>{selectedAlert.affectedIp}</code>
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Recommended Mitigation</span>
              <div style={{
                marginTop: '0.25rem',
                padding: '0.85rem',
                backgroundColor: '#eff6ff',
                borderRadius: 'var(--radius-md)',
                color: '#1e40af',
                fontSize: '0.85rem',
                border: '1px solid #bfdbfe'
              }}>
                {selectedAlert.recommendation}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create New Alert Rule Modal */}
      {showNewRuleModal && (
        <Modal
          isOpen={showNewRuleModal}
          onClose={() => setShowNewRuleModal(false)}
          title="Create System Anomaly Threshold Rule"
          icon={Plus}
          footer={
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowNewRuleModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleCreateRule}
              >
                Save & Activate Rule
              </button>
            </>
          }
        >
          <form onSubmit={handleCreateRule} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Rule / Incident Title *</label>
              <input
                type="text"
                placeholder="e.g., High 500 Error Surge on Checkout"
                value={newRule.title}
                onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Severity Level</label>
                <select
                  value={newRule.severity}
                  onChange={(e) => setNewRule({ ...newRule, severity: e.target.value })}
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="WARNING">WARNING</option>
                  <option value="INFO">INFO</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Threshold Metric Condition</label>
                <input
                  type="text"
                  placeholder="e.g. Error rate > 8% in 3m"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({ ...newRule, threshold: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Target URL / Route Pattern</label>
              <input
                type="text"
                placeholder="e.g. /api/v1/orders/*"
                value={newRule.endpoint}
                onChange={(e) => setNewRule({ ...newRule, endpoint: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Alerts;
