// app/admin/(public)/layout.jsx
//
// Layout for the admin routes that must be reachable WITHOUT an admin
// session: /admin/login, /admin/forgot-password, /admin/reset-password.
//
// This route group sits next to the protected app/admin/(protected)/layout.jsx
// (which requires a valid session) so these pages are never wrapped by
// the auth check there — otherwise a logged-out admin could never reach
// the login page in the first place.
//
// `force-dynamic` here (a Server Component export) cascades down to every
// page inside this group, so /admin/login, /admin/forgot-password, and
// /admin/reset-password are never statically cached or served from ISR,
// same as the protected admin pages.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function AdminPublicLayout({ children }) {
  return children;
}