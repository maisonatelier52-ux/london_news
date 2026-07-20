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
  search: (q) => api.get(`/public/search`, { params: { q } }),
};

// Desk + topic taxonomy (Phase 2/4 backport)
export const taxonomyAPI = {
  getTree: () => api.get('/categories/tree'),
  getDesk: (slug) => api.get(`/public/desk/${slug}`),
  getTopic: (slug) => api.get(`/public/topic/${slug}`),
};

// Classifieds (Phase 2.4 / 4.3 backport)
export const classifiedsAPI = {
  getAll: (params) => api.get('/classifieds', { params }),
  getBySlug: (slug) => api.get(`/classifieds/${slug}`),
  submit: (formData) =>
    api.post('/classifieds/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  enquire: (id, data) => api.post(`/classifieds/${id}/enquire`, data),
};

// Audience: newsletter + contact (Phase 2.5 / 4.5 backport)
export const audienceAPI = {
  subscribe: (email, source) => api.post('/audience/newsletter', { email, source }),
  contact: (data) => api.post('/audience/contact', data),
};

// Preview (Phase 2.2/2.3 / 4.7 backport)
export const previewAPI = {
  getArticle: (token) => api.get(`/articles/preview/${token}`),
  getHomepage: (token) => api.get(`/admin-homepage/preview/${token}`),
};

export default api;



