// app/admin/(protected)/layout.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "../AdminShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function verifyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    redirect("/login");
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch (err) {
    redirect("/login");
  }

  if (!response.ok) {
    redirect("/login");
  }

  const data = await response.json().catch(() => null);
  return data?.admin || null;
}

export default async function ProtectedAdminLayout({ children }) {
  const admin = await verifyAdminSession();
  return (
    <AdminShell adminName={admin?.name || "Admin"} adminRole={admin?.role}>
      {children}
    </AdminShell>
  );
}