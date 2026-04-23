// // services/adminAPI.js
// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const adminAxios = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// // Attach token to every admin request
// adminAxios.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('adminToken');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// adminAxios.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('adminData');
//         window.location.href = '/admin/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // ── Auth ──────────────────────────────────────────────────────────────────────
// export const authAdminAPI = {
//   login: (credentials) => adminAxios.post('/admin/login', credentials),
//   me: () => adminAxios.get('/admin/me'),
//   logout: () => {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminData');
//     }
//   },
//   isAuthenticated: () => {
//     if (typeof window === 'undefined') return false;
//     return !!localStorage.getItem('adminToken');
//   },
// };

// // ── Dashboard ─────────────────────────────────────────────────────────────────
// export const dashboardAdminAPI = {
//   getStats: () => adminAxios.get('/admin/stats'),
// };

// // ── Categories ────────────────────────────────────────────────────────────────
// export const categoriesAdminAPI = {
//   getAll: () => adminAxios.get('/categories'),
//   create: (data) => adminAxios.post('/categories', data),
//   update: (id, data) => adminAxios.put(`/categories/${id}`, data),
//   delete: (id) => adminAxios.delete(`/categories/${id}`),
// };

// // ── Articles ──────────────────────────────────────────────────────────────────
// export const articlesAdminAPI = {
//   getAll: (categoryId = '') => {
//     const url = categoryId ? `/articles?category=${categoryId}` : '/articles';
//     return adminAxios.get(url);
//   },
//   getById: (id) => adminAxios.get(`/articles/${id}`),
//   create: (formData) =>
//     adminAxios.post('/articles', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   update: (id, formData) =>
//     adminAxios.put(`/articles/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   delete: (id) => adminAxios.delete(`/articles/${id}`),
// };

// // ── Authors ───────────────────────────────────────────────────────────────────
// export const authorsAdminAPI = {
//   getAll: () => adminAxios.get('/authors'),
//   getById: (id) => adminAxios.get(`/authors/${id}`),
//   create: (formData) =>
//     adminAxios.post('/authors', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   update: (id, formData) =>
//     adminAxios.put(`/authors/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   delete: (id) => adminAxios.delete(`/authors/${id}`),
// };

// export default adminAxios;


// services/adminAPI.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const adminAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach token to every admin request
adminAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-redirect to login on 401
adminAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAdminAPI = {
  login: (credentials) => adminAxios.post('/admin/login', credentials),
  me: () => adminAxios.get('/admin/me'),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    }
  },
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('adminToken');
  },
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const dashboardAdminAPI = {
  getStats: () => adminAxios.get('/admin/stats'),
  clearActivities: () => adminAxios.delete('/admin/activities'),
};

// ── Categories ────────────────────────────────────────────────────────────────
export const categoriesAdminAPI = {
  getAll: () => adminAxios.get('/categories'),
  create: (data) => adminAxios.post('/categories', data),
  update: (id, data) => adminAxios.put(`/categories/${id}`, data),
  delete: (id) => adminAxios.delete(`/categories/${id}`),
};

// ── Articles ──────────────────────────────────────────────────────────────────
export const articlesAdminAPI = {
  getAll: (categoryId = '') => adminAxios.get(categoryId ? `/articles?category=${categoryId}` : '/articles'),
  getById: (id) => adminAxios.get(`/articles/${id}`),
  create: (formData) => adminAxios.post('/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => adminAxios.put(`/articles/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => adminAxios.delete(`/articles/${id}`),
};

// ── Authors ───────────────────────────────────────────────────────────────────
export const authorsAdminAPI = {
  getAll: () => adminAxios.get('/authors'),
  getById: (id) => adminAxios.get(`/authors/${id}`),
  create: (formData) => adminAxios.post('/authors', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => adminAxios.put(`/authors/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => adminAxios.delete(`/authors/${id}`),
};

export default adminAxios;