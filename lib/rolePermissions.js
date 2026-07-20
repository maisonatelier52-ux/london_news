// lib/rolePermissions.js
//
// Mirrors backend/utils/rolePermissions.js. Kept in sync manually since the
// frontend and backend are separate deployments/repos. Used to decide which
// sidebar links to show for the logged-in admin's role.

export const ROLES = ['Super Admin', 'JMHV', 'Editor', 'Journalist', 'Guest Writer'];

export const SECTIONS = {
  DASHBOARD: 'dashboard',
  ARTICLES: 'articles',
  HOMEPAGE: 'homepage',
  CATEGORIES: 'categories',
  CLASSIFIEDS: 'classifieds',
  AUDIENCE: 'audience',
  USERS: 'users',
  AUTHORS: 'authors',
  PAGES: 'pages',
  FOOTER: 'footer',
  MOOD_SURVEY: 'mood-survey',
};

const ALL_SECTIONS = Object.values(SECTIONS);

export const ROLE_ACCESS = {
  'Super Admin': ALL_SECTIONS,
  JMHV: ALL_SECTIONS.filter((s) => s !== SECTIONS.USERS),
  Editor: [
    SECTIONS.DASHBOARD,
    SECTIONS.ARTICLES,
    SECTIONS.HOMEPAGE,
    SECTIONS.CATEGORIES,
    SECTIONS.CLASSIFIEDS,
    SECTIONS.AUDIENCE,
    SECTIONS.AUTHORS,
    SECTIONS.PAGES,
    SECTIONS.FOOTER,
    SECTIONS.MOOD_SURVEY,
  ],
  Journalist: [SECTIONS.DASHBOARD, SECTIONS.ARTICLES],
  'Guest Writer': [SECTIONS.DASHBOARD, SECTIONS.ARTICLES],
};

export function canAccessSection(role, section) {
  const allowed = ROLE_ACCESS[role];
  return Array.isArray(allowed) && allowed.includes(section);
}