// app/admin/page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
 
export default function AdminIndex() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, []);
  return null;
}
 