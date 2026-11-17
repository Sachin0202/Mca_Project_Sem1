import axios from 'axios';
import { summaryStats, hourlyTrendData, weeklyTrendData, monthlyTrendData, httpStatusDistribution, topErrorsData, systemStatusData } from '../data/dashboardData';
import { sampleLogs } from '../data/logsData';
import { initialAlerts } from '../data/alertsData';
import { initialUsers } from '../data/usersData';

// Configurable Axios instance for future Spring Boot / MySQL backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor for attaching auth tokens when Spring Boot security is enabled
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('logmonitor_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Flag to switch between mock dummy data and real backend API
// Set to false when Java Spring Boot backend server is running on http://localhost:8080/api
const USE_MOCK = true;

// Helper to simulate network latency for realistic feel
const simulateDelay = (data, ms = 250) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

// =========================================================================
// 1. DASHBOARD SERVICE
// =========================================================================
export const dashboardService = {
  getSummary: async () => {
    if (USE_MOCK) return simulateDelay({ ...summaryStats });
    try {
      const response = await apiClient.get('/dashboard/summary');
      return response.data;
    } catch {
      return summaryStats;
    }
  },

  getTrend: async (timeframe = '24h') => {
    if (USE_MOCK) {
      if (timeframe === '7d') return simulateDelay([...weeklyTrendData]);
      if (timeframe === '30d') return simulateDelay([...monthlyTrendData]);
      return simulateDelay([...hourlyTrendData]);
    }
    try {
      const response = await apiClient.get(`/dashboard/trends?timeframe=${timeframe}`);
      return response.data;
    } catch {
      return timeframe === '7d' ? weeklyTrendData : hourlyTrendData;
    }
  },

  getStatusDistribution: async () => {
    if (USE_MOCK) return simulateDelay([...httpStatusDistribution]);
    try {
      const response = await apiClient.get('/dashboard/status-distribution');
      return response.data;
    } catch {
      return httpStatusDistribution;
    }
  },

  getTopErrors: async () => {
    if (USE_MOCK) return simulateDelay([...topErrorsData]);
    try {
      const response = await apiClient.get('/dashboard/top-errors');
      return response.data;
    } catch {
      return topErrorsData;
    }
  },

  getSystemStatus: async () => {
    if (USE_MOCK) return simulateDelay({ ...systemStatusData });
    try {
      const response = await apiClient.get('/system/status');
      return response.data;
    } catch {
      return systemStatusData;
    }
  }
};

// =========================================================================
// 2. LOGS SERVICE
// =========================================================================
export const logsService = {
  getLogs: async (filters = {}) => {
    if (USE_MOCK) {
      let filtered = [...sampleLogs];

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          log =>
            log.ip.toLowerCase().includes(query) ||
            log.url.toLowerCase().includes(query) ||
            log.id.toLowerCase().includes(query) ||
            (log.details?.responseSummary && log.details.responseSummary.toLowerCase().includes(query))
        );
      }

      if (filters.method && filters.method !== 'ALL') {
        filtered = filtered.filter(log => log.method === filters.method);
      }

      if (filters.statusCode && filters.statusCode !== 'ALL') {
        if (filters.statusCode === '2xx') {
          filtered = filtered.filter(log => log.statusCode >= 200 && log.statusCode < 300);
        } else if (filters.statusCode === '3xx') {
          filtered = filtered.filter(log => log.statusCode >= 300 && log.statusCode < 400);
        } else if (filters.statusCode === '4xx') {
          filtered = filtered.filter(log => log.statusCode >= 400 && log.statusCode < 500);
        } else if (filters.statusCode === '5xx') {
          filtered = filtered.filter(log => log.statusCode >= 500 && log.statusCode < 600);
        } else {
          filtered = filtered.filter(log => log.statusCode === Number(filters.statusCode));
        }
      }

      if (filters.severity && filters.severity !== 'ALL') {
        filtered = filtered.filter(log => log.severity === filters.severity);
      }

      return simulateDelay({
        logs: filtered,
        total: filtered.length
      });
    }

    try {
      const response = await apiClient.get('/logs', { params: filters });
      return response.data;
    } catch {
      return { logs: sampleLogs, total: sampleLogs.length };
    }
  },

  getLogById: async (id) => {
    if (USE_MOCK) {
      const log = sampleLogs.find(l => l.id === id);
      return simulateDelay(log || null);
    }
    try {
      const response = await apiClient.get(`/logs/${id}`);
      return response.data;
    } catch {
      return sampleLogs.find(l => l.id === id);
    }
  }
};

// =========================================================================
// 3. ALERTS SERVICE
// =========================================================================
export const alertsService = {
  getAlerts: async () => {
    if (USE_MOCK) return simulateDelay([...initialAlerts]);
    try {
      const response = await apiClient.get('/alerts');
      return response.data;
    } catch {
      return initialAlerts;
    }
  },

  resolveAlert: async (id, note = '') => {
    if (USE_MOCK) {
      return simulateDelay({ success: true, id, resolvedAt: new Date().toISOString(), note });
    }
    const response = await apiClient.put(`/alerts/${id}/resolve`, { note });
    return response.data;
  },

  deleteAlert: async (id) => {
    if (USE_MOCK) {
      return simulateDelay({ success: true, id });
    }
    const response = await apiClient.delete(`/alerts/${id}`);
    return response.data;
  }
};

// =========================================================================
// 4. USERS SERVICE
// =========================================================================
export const usersService = {
  getUsers: async () => {
    if (USE_MOCK) return simulateDelay([...initialUsers]);
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch {
      return initialUsers;
    }
  },

  createUser: async (userData) => {
    if (USE_MOCK) {
      const newUser = {
        id: `USR-0${Math.floor(Math.random() * 90) + 10}`,
        ...userData,
        lastLogin: 'Never',
        avatarInitials: userData.name ? userData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US',
        avatarBg: '#2563eb'
      };
      return simulateDelay(newUser);
    }
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    if (USE_MOCK) {
      return simulateDelay({ id, ...userData });
    }
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    if (USE_MOCK) {
      return simulateDelay({ success: true, id });
    }
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  }
};

// =========================================================================
// 5. LOG UPLOAD SERVICE
// =========================================================================
export const uploadService = {
  uploadFile: async (file, onProgress) => {
    if (USE_MOCK) {
      // Simulate stepped progress
      return new Promise((resolve) => {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 20;
          if (onProgress) onProgress(percent);
          if (percent >= 100) {
            clearInterval(interval);
            resolve({
              success: true,
              fileName: file.name,
              fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              recordsCount: Math.floor(Math.random() * 15000) + 5000,
              errorsCount: Math.floor(Math.random() * 800) + 120,
              uploadDate: new Date().toISOString()
            });
          }
        }, 300);
      });
    }

    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/logs/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(percent);
        }
      }
    });
    return response.data;
  }
};
