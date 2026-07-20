

// // services/adminAPI.js 
// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const adminAxios = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// adminAxios.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('adminToken');
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// adminAxios.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401 && typeof window !== 'undefined') {
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminData');
//       window.location.href = '/admin/login';
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

//   // ── Password reset (add these three) ──
//   forgotPassword:    (data)  => adminAxios.post('/admin/forgot-password', data),
//   verifyResetToken:  (token) => adminAxios.get(`/admin/verify-reset-token/${token}`),
//   resetPassword:     (data)  => adminAxios.post('/admin/reset-password', data),
// };

// // ── Dashboard ─────────────────────────────────────────────────────────────────
// export const dashboardAdminAPI = {
//   getStats: () => adminAxios.get('/admin/stats'),
//   clearActivities: () => adminAxios.delete('/admin/activities'),
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
//   getAll: (categoryId = '') => adminAxios.get(categoryId ? `/articles?category=${categoryId}` : '/articles'),
//   getById: (id) => adminAxios.get(`/articles/${id}`),
//   create: (formData) => adminAxios.post('/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   update: (id, formData) => adminAxios.put(`/articles/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   delete: (id) => adminAxios.delete(`/articles/${id}`),
// };

// // ── Authors ───────────────────────────────────────────────────────────────────
// export const authorsAdminAPI = {
//   getAll: () => adminAxios.get('/authors'),
//   getById: (id) => adminAxios.get(`/authors/${id}`),
//   create: (formData) => adminAxios.post('/authors', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   update: (id, formData) => adminAxios.put(`/authors/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   delete: (id) => adminAxios.delete(`/authors/${id}`),
// };

// // ── Mood Survey ───────────────────────────────────────────────────────────────
// export const moodSurveyAdminAPI = {
//   getAll: () => adminAxios.get('/mood-surveys'),
//   getToday: () => adminAxios.get('/mood-surveys/today'),
//   create: (data) => adminAxios.post('/mood-surveys', data),
//   update: (id, data) => adminAxios.put(`/mood-surveys/${id}`, data),
//   delete: (id) => adminAxios.delete(`/mood-surveys/${id}`),
// };

// // ── Homepage ──────────────────────────────────────────────────────────────────
// export const homepageAdminAPI = {
//   getAll: () => adminAxios.get('/admin-homepage'),
//   getById: (id) => adminAxios.get(`/admin-homepage/${id}`),
//   create: (data) => adminAxios.post('/admin-homepage', data),
//   update: (id, data) => adminAxios.put(`/admin-homepage/${id}`, data),
//   activate: (id) => adminAxios.post(`/admin-homepage/${id}/activate`),
//   delete: (id) => adminAxios.delete(`/admin-homepage/${id}`),
//   // Article search for slot picker
//   searchArticles: (q) => adminAxios.get(`/articles?q=${encodeURIComponent(q)}`),
// };

// // ── Pages ───────────────────────────────────────────────────────────────────
// export const pagesAdminAPI = {
//   getAll: () => adminAxios.get('/pages'),
//   getById: (id) => adminAxios.get(`/pages/${id}`),
//   create: (formData) => adminAxios.post('/pages', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   update: (id, formData) => adminAxios.put(`/pages/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   delete: (id) => adminAxios.delete(`/pages/${id}`),
// };

// // ── Footer ───────────────────────────────────────────────────────────────────
// export const footerAdminAPI = {
//   get: () => adminAxios.get('/footer'),
//   update: (formData) => adminAxios.put('/footer', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
// };

// // ── Public Pages ────────────────────────────────────────────────────────────
// export const publicPagesAPI = {
//   // Get all published pages for dropdown
//   getAll: async () => {
//     try {
//       // Use admin endpoint instead of public to ensure we get all published pages
//       const response = await adminAxios.get('/pages?publishedOnly=true');
//       return response;
//     } catch (error) {
//       console.error('Error fetching pages:', error);
//       return { data: [] };
//     }
//   },
  
//   // Get single page by slug
//   getBySlug: (slug) => adminAxios.get(`/pages/public/${slug}`),
// };

// // ── Public Footer ───────────────────────────────────────────────────────────
// export const publicFooterAPI = {
//   get: () => adminAxios.get('/public/footer'),
// };

// export default adminAxios;

// services/adminAPI.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const adminAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

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

adminAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      fetch('/api/admin/session', { method: 'DELETE', credentials: 'include' }).catch(() => {});
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Session cookie ───────────────────────────────────────────────────────────
// The `adminToken` cookie that app/admin/(protected)/layout.jsx reads
// server-side (via next/headers cookies()) to gate every /admin/* page is
// now set by app/api/admin/session/route.js as HttpOnly + Secure, not by
// client JS — page JS can no longer read or forge it. authAdminAPI.login/
// logout below just call that route; there's no more document.cookie here.

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAdminAPI = {
  login: async (credentials) => {
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.message || 'Login failed.');
      err.response = { data, status: res.status };
      throw err;
    }
    // Shaped like an axios response ({ data }) so existing call sites
    // (response.data.token / response.data.admin) don't need to change.
    return { data };
  },
  me: () => adminAxios.get('/admin/me'),
  logout: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    }
    try {
      await fetch('/api/admin/session', { method: 'DELETE', credentials: 'include' });
    } catch {
      // best-effort — localStorage is already cleared above, and the
      // HttpOnly cookie will simply expire on its own 24h max-age if this
      // call fails for some reason.
    }
  },
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('adminToken');
  },

  // ── Password reset (add these three) ──
  forgotPassword:    (data)  => adminAxios.post('/admin/forgot-password', data),
  verifyResetToken:  (token) => adminAxios.get(`/admin/verify-reset-token/${token}`),
  resetPassword:     (data)  => adminAxios.post('/admin/reset-password', data),
};

// ── Users (Super Admin only — account + role management) ───────────────────
export const usersAdminAPI = {
  getAll: () => adminAxios.get('/admin/users'),
  getRoles: () => adminAxios.get('/admin/users/roles'),
  create: (data) => adminAxios.post('/admin/users', data),
  update: (id, data) => adminAxios.patch(`/admin/users/${id}`, data),
  delete: (id) => adminAxios.delete(`/admin/users/${id}`),
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
  // Topics belonging to a given parent desk — used by the article editor's
  // optional Topic dropdown (a desk's articles can optionally be tagged with
  // one of its child topics for /topics/[slug]).
  getTopics: (parentId) => adminAxios.get('/categories/topics', { params: parentId ? { parent: parentId } : {} }),
};

// ── Articles ──────────────────────────────────────────────────────────────────
export const articlesAdminAPI = {
  getAll: (categoryId = '') => adminAxios.get(categoryId ? `/articles?category=${categoryId}` : '/articles'),
  getById: (id) => adminAxios.get(`/articles/${id}`),
  create: (formData) => adminAxios.post('/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => adminAxios.put(`/articles/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => adminAxios.delete(`/articles/${id}`),
  // Scheduling + correction notes — these were missing, which is why
  // scheduledPublishAt/scheduledUnpublishAt never left `null`: there was no
  // client call wired up to actually hit PATCH /articles/:id/schedule.
  schedule: (id, data) => adminAxios.patch(`/articles/${id}/schedule`, data),
  addCorrection: (id, text) => adminAxios.post(`/articles/${id}/correction`, { text }),
  // Revision history — snapshot taken automatically on every save (see
  // routes/articles.js PUT /:id); this just lists/restores them.
  getRevisions: (id) => adminAxios.get(`/articles/${id}/revisions`),
  restoreRevision: (id, revisionId) => adminAxios.post(`/articles/${id}/revisions/${revisionId}/restore`),
};

// ── Authors ───────────────────────────────────────────────────────────────────
export const authorsAdminAPI = {
  getAll: () => adminAxios.get('/authors'),
  getById: (id) => adminAxios.get(`/authors/${id}`),
  create: (formData) => adminAxios.post('/authors', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => adminAxios.put(`/authors/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => adminAxios.delete(`/authors/${id}`),
};

// ── Audience desk (newsletter signups, contact form, classifieds enquiries) ──
export const audienceAdminAPI = {
  getNewsletter: (params) => adminAxios.get('/audience/newsletter', { params }),
  getContact: (params) => adminAxios.get('/audience/contact', { params }),
  updateContactStatus: (id, status) => adminAxios.patch(`/audience/contact/${id}`, { status }),
  getClassifiedsEnquiries: (params) => adminAxios.get('/audience/classifieds-enquiries', { params }),
};

// ── Classifieds desk (moderation) ───────────────────────────────────────────
export const classifiedsAdminAPI = {
  getAll: (status = '') => adminAxios.get(status ? `/classifieds/admin?status=${status}` : '/classifieds/admin'),
  moderate: (id, data) => adminAxios.patch(`/classifieds/${id}/moderate`, data),
};

// ── Mood Survey ───────────────────────────────────────────────────────────────
export const moodSurveyAdminAPI = {
  getAll: () => adminAxios.get('/mood-surveys'),
  getToday: () => adminAxios.get('/mood-surveys/today'),
  create: (data) => adminAxios.post('/mood-surveys', data),
  update: (id, data) => adminAxios.put(`/mood-surveys/${id}`, data),
  delete: (id) => adminAxios.delete(`/mood-surveys/${id}`),
};

// ── Homepage ──────────────────────────────────────────────────────────────────
export const homepageAdminAPI = {
  getAll: () => adminAxios.get('/admin-homepage'),
  getById: (id) => adminAxios.get(`/admin-homepage/${id}`),
  create: (data) => adminAxios.post('/admin-homepage', data),
  update: (id, data) => adminAxios.put(`/admin-homepage/${id}`, data),
  activate: (id) => adminAxios.post(`/admin-homepage/${id}/activate`),
  delete: (id) => adminAxios.delete(`/admin-homepage/${id}`),
  // Article search for slot picker
  searchArticles: (q) => adminAxios.get(`/articles?q=${encodeURIComponent(q)}`),
  // Version history + scheduled publishing — these were missing, which is
  // why the homepage desk had no version list or working schedule control.
  getVersions: (slug) => adminAxios.get('/admin-homepage/versions', { params: slug ? { slug } : {} }),
  schedule: (id, scheduledPublishAt) => adminAxios.patch(`/admin-homepage/${id}/schedule`, { scheduledPublishAt }),
  restore: (id) => adminAxios.post(`/admin-homepage/${id}/restore`),
};

// ── Pages ───────────────────────────────────────────────────────────────────
export const pagesAdminAPI = {
  getAll: () => adminAxios.get('/pages'),
  getById: (id) => adminAxios.get(`/pages/${id}`),
  create: (formData) => adminAxios.post('/pages', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => adminAxios.put(`/pages/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => adminAxios.delete(`/pages/${id}`),
};

// ── Footer ───────────────────────────────────────────────────────────────────
export const footerAdminAPI = {
  get: () => adminAxios.get('/footer'),
  update: (formData) => adminAxios.put('/footer', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// ── Public Pages ────────────────────────────────────────────────────────────
export const publicPagesAPI = {
  // Get all published pages for dropdown
  getAll: async () => {
    try {
      // Use admin endpoint instead of public to ensure we get all published pages
      const response = await adminAxios.get('/pages?publishedOnly=true');
      return response;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return { data: [] };
    }
  },

  // Get single page by slug
  getBySlug: (slug) => adminAxios.get(`/pages/public/${slug}`),
};

// ── Public Footer ───────────────────────────────────────────────────────────
export const publicFooterAPI = {
  get: () => adminAxios.get('/public/footer'),
};

export default adminAxios;