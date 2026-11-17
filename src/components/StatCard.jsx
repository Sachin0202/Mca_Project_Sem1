import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  isImprovement,
  label,
  period,
  icon: Icon,
  color = 'blue' // blue, green, red, orange, purple
}) => {
  const colorMap = {
    blue: {
      bg: '#eff6ff',
      text: '#2563eb',
      border: 'rgba(37, 99, 235, 0.2)'
    },
    green: {
      bg: '#ecfdf5',
      text: '#10b981',
      border: 'rgba(16, 185, 129, 0.2)'
    },
    red: {
      bg: '#fef2f2',
      text: '#ef4444',
      border: 'rgba(239, 68, 68, 0.2)'
    },
    orange: {
      bg: '#fffbeb',
      text: '#f59e0b',
      border: 'rgba(245, 158, 11, 0.2)'
    },
    purple: {
      bg: '#f5f3ff',
      text: '#8b5cf6',
      border: 'rgba(139, 92, 246, 0.2)'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;
  const isPositiveBadge = isImprovement !== undefined ? isImprovement : isPositive;

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <span className="stat-card-label">{title}</span>
          <div className="stat-card-value">{value}</div>
        </div>
        {Icon && (
          <div
            className="stat-card-icon-wrap"
            style={{ backgroundColor: scheme.bg, color: scheme.text, border: `1px solid ${scheme.border}` }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      <div className="stat-card-footer">
        {change && (
          <span className={`stat-card-change ${isPositiveBadge ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </span>
        )}
        <span className="stat-card-period">{label || period}</span>
      </div>
    </div>
  );
};

export default StatCard;
