// app/login/page.jsx
//
// The protected admin layout (app/admin/layout.jsx) redirects unauthenticated
// or invalid-session requests to `/login`, per the security requirement that
// this NOT be `/admin/login` directly. This route exists so that redirect
// target actually resolves, and simply forwards on to the real login form at
// /admin/login (single source of truth for the login UI, no duplicated code).
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LoginRedirect() {
  redirect("/admin/login");
}