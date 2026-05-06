import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

// Career APIs
export const careerAPI = {
  getAll: (params) => api.get('/careers', { params }),
  getById: (id) => api.get(`/careers/${id}`),
  match: (userSkills) => api.post('/careers/match', { userSkills }),
  search: (query) => api.get(`/careers?search=${query}`),
  filterBySkill: (skill) => api.get(`/careers?skill=${skill}`),
  filterByGrowth: (growth) => api.get(`/careers?growth=${growth}`)
};

// User APIs
export const userAPI = {
  saveCareer: (careerId) => api.post(`/users/save-career/${careerId}`),
  unsaveCareer: (careerId) => api.delete(`/users/save-career/${careerId}`),
  getSavedCareers: () => api.get('/users/saved-careers')
};

// Recommendation API
export const recommendAPI = {
  getRecommendations: (data) => api.post('/recommend', data)
};

export default api;
