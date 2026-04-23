// // services/api.js
// import axios from 'axios';

// // Use environment variable or fallback to localhost
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// // Create axios instance with timeout
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 seconds timeout
// });

// // Add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for better error handling
// api.interceptors.response.use(
//   (response) => {
//     console.log(`Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   (error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout - server might be slow or not responding');
//     } else if (error.message === 'Network Error') {
//       console.error('Network Error - Make sure backend server is running on http://localhost:5000');
//       console.error('Please run: cd server && npm run dev');
//     } else if (error.response) {
//       console.error(`API Error ${error.response.status}:`, error.response.data);
//     } else {
//       console.error('API Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (credentials) => api.post('/admin/login', credentials),
//   logout: () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminData');
//   },
//   isAuthenticated: () => {
//     return !!localStorage.getItem('adminToken');
//   },
// };

// // Dashboard API
// export const dashboardAPI = {
//   getStats: () => api.get('/admin/stats'),
// };

// // Categories API
// export const categoriesAPI = {
//   getAll: () => api.get('/categories'),
//   create: (data) => api.post('/categories', data),
//   update: (id, data) => api.put(`/categories/${id}`, data),
//   delete: (id) => api.delete(`/categories/${id}`),
// };

// // Articles API
// export const articlesAPI = {
//   getAll: (categoryId = '') => {
//     const url = categoryId ? `/articles?category=${categoryId}` : '/articles';
//     return api.get(url);
//   },
//   getById: (id) => api.get(`/articles/${id}`),
//   create: (formData) => api.post('/articles', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   update: (id, formData) => api.put(`/articles/${id}`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   delete: (id) => api.delete(`/articles/${id}`),
// };

// // Authors API
// export const authorsAPI = {
//   getAll: () => api.get('/authors'),
//   getById: (id) => api.get(`/authors/${id}`),
//   create: (formData) => api.post('/authors', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   update: (id, formData) => api.put(`/authors/${id}`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   delete: (id) => api.delete(`/authors/${id}`),
// };

// export default api;

// services/api.js  — user frontend (no auth token needed)
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    } else if (error.message === 'Network Error') {
      console.error('Network Error — backend may be offline');
    }
    return Promise.reject(error);
  }
);

// Public article endpoints (add public routes to backend if needed)
export const publicArticlesAPI = {
  getByCategory: (category) => api.get(`/public/articles/${category}`),
  getBySlug: (slug) => api.get(`/public/articles/slug/${slug}`),
};

export default api;