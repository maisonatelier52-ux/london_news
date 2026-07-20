// // app/admin/page.jsx
// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
 
// export default function AdminIndex() {
//   const router = useRouter();
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (token) {
//       router.replace("/admin/dashboard");
//     } else {
//       router.replace("/admin/login");
//     }
//   }, []);
//   return null;
// }
 
// app/admin/page.jsx
//
// Route-contract requirement: "/admin must redirect unauthenticated users to
// /login" — a single hop, not /admin -> /admin/dashboard -> /login. So this
// page checks the session cookie itself (a presence check only — the full
// server-side verification against the backend still happens in
// app/admin/(protected)/layout.jsx once we land on /admin/dashboard, which
// will bounce back to /login on its own if the token turns out to be
// expired/invalid). Signed-in visitors go straight to the dashboard.
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    redirect("/login");
  }

  redirect("/admin/dashboard");
}