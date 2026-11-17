// Dashboard Sample Data for Smart Web Server Log Management System

export const summaryStats = {
  totalRequests: {
    value: 25430,
    formatted: '25,430',
    change: '+12.5%',
    isPositive: true,
    label: 'vs yesterday (22,604)',
    period: 'Last 24 Hours'
  },
  successfulRequests: {
    value: 23984,
    formatted: '23,984',
    change: '+14.2%',
    isPositive: true,
    label: '94.31% success rate',
    period: '2xx / 3xx Responses'
  },
  errorRequests: {
    value: 1446,
    formatted: '1,446',
    change: '-3.1%',
    isPositive: false, // fewer errors is better, but visually shown with warning/error intent
    isImprovement: true,
    label: '5.69% of total traffic',
    period: '4xx & 5xx Responses'
  },
  errorRate: {
    value: 5.69,
    formatted: '5.69%',
    change: '-0.42%',
    isPositive: false,
    isImprovement: true,
    label: 'Industry threshold: < 5.0%',
    period: 'Weighted Average'
  }
};

// 24-Hour Trend Data
export const hourlyTrendData = [
  { time: '00:00', total: 620, success: 590, errors: 30, responseTime: 124 },
  { time: '02:00', total: 430, success: 415, errors: 15, responseTime: 110 },
  { time: '04:00', total: 310, success: 302, errors: 8, responseTime: 95 },
  { time: '06:00', total: 540, success: 518, errors: 22, responseTime: 118 },
  { time: '08:00', total: 1250, success: 1180, errors: 70, responseTime: 145 },
  { time: '10:00', total: 2180, success: 2040, errors: 140, responseTime: 182 },
  { time: '12:00', total: 2890, success: 2710, errors: 180, responseTime: 210 },
  { time: '14:00', total: 3120, success: 2920, errors: 200, responseTime: 225 },
  { time: '16:00', total: 3450, success: 3220, errors: 230, responseTime: 240 },
  { time: '18:00', total: 3210, success: 3040, errors: 170, responseTime: 195 },
  { time: '20:00', total: 2680, success: 2540, errors: 140, responseTime: 165 },
  { time: '22:00', total: 1750, success: 1649, errors: 101, responseTime: 135 }
];

// 7-Day Trend Data
export const weeklyTrendData = [
  { date: 'Nov 05', total: 22100, success: 20850, errors: 1250, responseTime: 160 },
  { date: 'Nov 06', total: 24300, success: 22910, errors: 1390, responseTime: 175 },
  { date: 'Nov 07', total: 26800, success: 25190, errors: 1610, responseTime: 192 },
  { date: 'Nov 08', total: 23400, success: 22090, errors: 1310, responseTime: 168 },
  { date: 'Nov 09', total: 19200, success: 18220, errors: 980, responseTime: 142 },
  { date: 'Nov 10', total: 21500, success: 20380, errors: 1120, responseTime: 155 },
  { date: 'Nov 11', total: 25430, success: 23984, errors: 1446, responseTime: 178 }
];

// 30-Day Trend Data
export const monthlyTrendData = [
  { date: 'Wk 1 (Oct 13-19)', total: 148200, success: 139800, errors: 8400, responseTime: 165 },
  { date: 'Wk 2 (Oct 20-26)', total: 162400, success: 153300, errors: 9100, responseTime: 172 },
  { date: 'Wk 3 (Oct 27-Nov 02)', total: 158900, success: 150150, errors: 8750, responseTime: 168 },
  { date: 'Wk 4 (Nov 03-Nov 09)', total: 165300, success: 156100, errors: 9200, responseTime: 180 },
  { date: 'Current (Nov 10-11)', total: 46930, success: 44364, errors: 2566, responseTime: 174 }
];

// HTTP Status Distribution (Donut Chart)
export const httpStatusDistribution = [
  { name: '2xx Success', count: 22840, percentage: 89.82, color: '#10b981' },
  { name: '3xx Redirection', count: 1144, percentage: 4.50, color: '#0ea5e9' },
  { name: '4xx Client Error', count: 986, percentage: 3.88, color: '#f59e0b' },
  { name: '5xx Server Error', count: 460, percentage: 1.80, color: '#ef4444' }
];

// Top Errors Table
export const topErrorsData = [
  {
    code: 404,
    count: 786,
    description: 'Resource Not Found',
    severity: 'WARN',
    percentage: 54.36,
    trend: '+4.2%',
    sampleUrl: '/api/v1/products/item-undefined'
  },
  {
    code: 500,
    count: 344,
    description: 'Internal Server Error',
    severity: 'ERROR',
    percentage: 23.79,
    trend: '-1.8%',
    sampleUrl: '/api/v1/checkout/process-payment'
  },
  {
    code: 403,
    count: 192,
    description: 'Forbidden Access',
    severity: 'WARN',
    percentage: 13.28,
    trend: '+12.4%',
    sampleUrl: '/admin/config/database.yml'
  },
  {
    code: 503,
    count: 126,
    description: 'Service Unavailable',
    severity: 'CRITICAL',
    percentage: 8.71,
    trend: '-8.5%',
    sampleUrl: '/api/v1/analytics/realtime-stream'
  },
  {
    code: 401,
    count: 88,
    description: 'Unauthorized Access',
    severity: 'WARN',
    percentage: 6.08,
    trend: '+2.1%',
    sampleUrl: '/api/v1/user/private-keys'
  }
];

// System Status Overview
export const systemStatusData = {
  serverStatus: 'Operational',
  serverHealth: 99.82,
  logProcessingStatus: 'Active (Real-time)',
  processingRate: '142 lines/sec',
  lastLogUpdate: 'Just now (12s ago)',
  uptime: '48 days, 14 hours, 22 mins',
  cpuUsage: 28.4,
  memoryUsage: 54.2,
  diskUsage: 68.7,
  activeConnections: 348,
  serverEnvironment: 'Production (Nginx 1.24 + Spring Boot Cluster)'
};
