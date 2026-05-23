// API Configuration
// Switch between development and production environments

const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : 'https://mediai-1hpm.onrender.com/api';

export const AUTH_ENDPOINTS = {
  signup: `${API_BASE_URL}/auth/signup`,
  login: `${API_BASE_URL}/auth/login`,
  verifyEmail: `${API_BASE_URL}/auth/verify-email`,
  forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
};

export const AI_ENDPOINTS = {
  symptoms: `${API_BASE_URL}/ai/symptoms`,
  mentalHealth: `${API_BASE_URL}/ai/mental-health`,
  medicine: `${API_BASE_URL}/ai/medicine`,
  medicalAnalysis: `${API_BASE_URL}/ai/medical-analysis`,
};

// Legacy endpoints (for backward compatibility during development)
export const LEGACY_ENDPOINTS = {
  symptomCheck: `${API_BASE_URL}/symptom/check`,
  medicalAnalyze: `${API_BASE_URL}/medical/analyze`,
};

console.log(`🔌 API Base URL: ${API_BASE_URL}`);
console.log(`🚀 Environment: ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}`);
