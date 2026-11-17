import React from 'react';

export const ChartCard = ({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
  className = '',
  footer
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="card-header">
          <div>
            <div className="card-title">
              {Icon && <Icon size={18} className="text-secondary" />}
              {title}
            </div>
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {action && <div className="card-actions">{action}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div style={{ padding: '0.85rem 1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
