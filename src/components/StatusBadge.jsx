import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

export const StatusBadge = ({ type = 'severity', value }) => {
  if (!value) return null;

  // Severity Badges (INFO, WARN, ERROR, CRITICAL)
  if (type === 'severity') {
    const val = String(value).toUpperCase();
    if (val === 'CRITICAL') {
      return (
        <span className="badge badge-error">
          <ShieldAlert size={12} />
          Critical
        </span>
      );
    }
    if (val === 'ERROR') {
      return (
        <span className="badge badge-error">
          <AlertCircle size={12} />
          Error
        </span>
      );
    }
    if (val === 'WARN' || val === 'WARNING') {
      return (
        <span className="badge badge-warning">
          <AlertTriangle size={12} />
          Warning
        </span>
      );
    }
    return (
      <span className="badge badge-info">
        <Info size={12} />
        Info
      </span>
    );
  }

  // HTTP Method Badges (GET, POST, PUT, DELETE, PATCH)
  if (type === 'method') {
    const m = String(value).toUpperCase();
    const classNameMap = {
      GET: 'method-get',
      POST: 'method-post',
      PUT: 'method-put',
      DELETE: 'method-delete',
      PATCH: 'method-patch'
    };
    return (
      <span className={`method-badge ${classNameMap[m] || 'method-get'}`}>
        {m}
      </span>
    );
  }

  // HTTP Status Code Badges (200, 404, 500, etc.)
  if (type === 'statusCode') {
    const code = Number(value);
    let statusClass = 'status-2xx';
    if (code >= 500) statusClass = 'status-5xx';
    else if (code >= 400) statusClass = 'status-4xx';
    else if (code >= 300) statusClass = 'status-3xx';

    return (
      <span className={`status-code-badge ${statusClass}`}>
        {value}
      </span>
    );
  }

  // General Status (Active, Inactive, Resolved)
  if (type === 'status') {
    const s = String(value).toLowerCase();
    if (s === 'active' || s === 'success' || s === 'operational') {
      return (
        <span className="badge badge-success">
          <CheckCircle size={12} />
          {value}
        </span>
      );
    }
    if (s === 'resolved') {
      return (
        <span className="badge badge-info">
          <CheckCircle size={12} />
          Resolved
        </span>
      );
    }
    if (s === 'inactive' || s === 'failed' || s === 'disabled') {
      return (
        <span className="badge badge-neutral">
          {value}
        </span>
      );
    }
  }

  return <span className="badge badge-neutral">{value}</span>;
};

export default StatusBadge;
