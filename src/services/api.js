import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getCurrentUser: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/profile', data),
};

// Courses API
export const coursesAPI = {
  getAllCourses: (params) => api.get('/api/courses', { params }),
  getRecommendedCourses: () => api.get('/api/courses/recommended'),
  getCourse: (id) => api.get(`/api/courses/${id}`),
  enrollInCourse: (id) => api.post(`/api/courses/${id}/enroll`),
  getMyCourses: () => api.get('/api/courses/progress/my-courses'),
  completeModule: (moduleId) => api.post(`/api/courses/modules/${moduleId}/complete`),
  submitQuiz: (moduleId, answers) => api.post(`/api/courses/modules/${moduleId}/quiz`, { module_id: moduleId, answers }),
};

// AI Mentor API
export const aiMentorAPI = {
  chat: (message, context) => api.post('/api/ai-mentor/chat', { message, context }),
  getChatHistory: () => api.get('/api/ai-mentor/chat/history'),
  getInvestorScore: () => api.get('/api/ai-mentor/investor-score'),
  recalculateScore: () => api.post('/api/ai-mentor/investor-score/recalculate'),
};

export default api;