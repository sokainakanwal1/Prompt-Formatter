import axios from 'axios';
import type { FormatPromptRequest, FormatPromptResponse } from '@/types/api';

// Base URL for API requests
const API_BASE_URL = "https://prompt-formatter-backend.vercel.app";

//   : "https://prompt-formatter-backend.vercel.app";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('�� Making API request:', config.method?.toUpperCase(), config.url);
    console.log('📤 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Test endpoints
  async testConnection() {
    const response = await api.get('/');
    return response.data;
  },

  async healthCheck() {
    const response = await api.get('/api/health');
    return response.data;
  },

  async testEndpoint() {
    const response = await api.get('/api/test');
    return response.data;
  },

  // Main formatting endpoint
  async formatPrompt(payload: FormatPromptRequest): Promise<FormatPromptResponse> {
    const response = await api.post<FormatPromptResponse>('/api/format', payload);
    return response.data;
  },
};

export default api;
