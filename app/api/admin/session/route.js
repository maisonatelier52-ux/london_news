// app/api/admin/session/route.js
//
// Thin backend-for-frontend proxy for the admin login/logout flow.
//
// Why this exists: the backend API lives on a different origin
// (NEXT_PUBLIC_API_URL), so it cannot itself set a cookie that this Next.js
// app's own server components can read via next/headers `cookies()` —
// browsers scope cookies to the domain that set them, and cross-origin
// Set-Cookie from the API would only ever be attached to requests back to
// the API, never to requests for this frontend's own pages.
//
// The fix: this route handler runs on the frontend's own server, calls the
// backend on the admin's behalf, and then sets the `adminToken` cookie
// itself — as HttpOnly + Secure (in production) + SameSite=Lax. That cookie
// is what app/admin/(protected)/layout.jsx reads to gate every /admin/*
// page. Because it's HttpOnly, page-injected JS can no longer read, copy, or
// forge it — closing the XSS exposure the previous `document.cookie =`
// approach had.
//
// Note: the JSON body below still includes the raw token, because the
// existing admin CRUD calls (categories/articles/homepage/etc., see
// services/adminAPI.js) talk directly to the cross-origin backend with an
// `Authorization: Bearer <token>` header sourced from localStorage — that's
// a separate, pre-existing pattern this change doesn't attempt to replace
// (doing so would mean proxying every admin API call through this app).
// What this route fixes specifically is the credential used to gate
// server-rendered /admin/* pages.

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 24h, matches the JWT's expiresIn

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body || {};
  if (!email || !password) {
    return Response.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  let backendRes;
  try {
    backendRes = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch (err) {
    return Response.json(
      { message: "Unable to reach the login service." },
      { status: 502 }
    );
  }

  const data = await backendRes.json().catch(() => null);

  if (!backendRes.ok || !data?.token) {
    return Response.json(
      { message: data?.message || "Login failed." },
      { status: backendRes.status || 401 }
    );
  }

  const res = Response.json({ admin: data.admin, token: data.token });

  res.headers.append(
    "Set-Cookie",
    [
      `adminToken=${data.token}`,
      "Path=/",
      `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
      "HttpOnly",
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ")
  );

  return res;
}

export async function DELETE() {
  const res = Response.json({ message: "Logged out." });

  res.headers.append(
    "Set-Cookie",
    [
      "adminToken=",
      "Path=/",
      "Max-Age=0",
      "HttpOnly",
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ")
  );

  return res;
}
