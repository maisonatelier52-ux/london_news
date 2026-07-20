// app/admin/AdminShell.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid, FiFolder, FiFileText, FiUsers, FiLogOut,
  FiMenu, FiX, FiHome, FiSmile, FiLayout, FiShield,
  FiTag, FiMail
} from "react-icons/fi";
import { authAdminAPI } from "@/services/adminAPI";
import { canAccessSection, SECTIONS } from "@/lib/rolePermissions";

export default function AdminShell({ children, adminName = "Admin", adminRole }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authAdminAPI.logout();
    router.push("/login");
  };

  const allNavItems = [
    { href: "/admin/dashboard",  label: "Dashboard",  icon: FiGrid,     section: SECTIONS.DASHBOARD },
    { href: "/admin/categories", label: "Categories", icon: FiFolder,   section: SECTIONS.CATEGORIES },
    { href: "/admin/articles",   label: "Articles",   icon: FiFileText, section: SECTIONS.ARTICLES },
    { href: "/admin/authors",    label: "Authors",    icon: FiUsers,    section: SECTIONS.AUTHORS },
    { href: "/admin/homepage",   label: "Homepage",   icon: FiHome,     section: SECTIONS.HOMEPAGE },
    { href: "/admin/classifieds",label: "Classifieds",icon: FiTag,      section: SECTIONS.CLASSIFIEDS },
    { href: "/admin/audience",   label: "Audience",   icon: FiMail,     section: SECTIONS.AUDIENCE },
    { href: "/admin/pages",      label: "Pages",      icon: FiFileText, section: SECTIONS.PAGES },
    { href: "/admin/footer",     label: "Footer",     icon: FiLayout,   section: SECTIONS.FOOTER },
    { href: "/admin/mood-survey",label: "Mood Survey", icon: FiSmile,   section: SECTIONS.MOOD_SURVEY },
    { href: "/admin/users",      label: "Users",       icon: FiShield,  section: SECTIONS.USERS },
  ];

  // Only show links this role actually has access to. If we somehow don't
  // know the role yet, fail safe and show nothing extra beyond dashboard.
  const navItems = allNavItems.filter((item) =>
    adminRole ? canAccessSection(adminRole, item.section) : item.section === SECTIONS.DASHBOARD
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Global styles to hide scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* ── Mobile header bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black border-b border-[#F5C645]/20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-[#F5C645] rounded-lg cursor-pointer"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <FiHome className="text-[#F5C645]" size={18} />
          <span className="text-white font-bold text-sm">News Portal</span>
        </div>
        <div className="w-9" /> {/* spacer */}
      </div>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-black border-r border-[#F5C645]/20 transform transition-transform duration-300 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo - Fixed at top */}
        <div className="p-5 sm:p-6 border-b border-[#F5C645]/20 shrink-0">
          <div className="flex items-center gap-3">
            <FiHome className="text-[#F5C645]" size={28} />
            <div>
              <h1 className="text-white font-bold text-lg">News Portal</h1>
              <p className="text-[#F5C645] text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Area - with hidden scrollbar */}
        <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 min-h-0 hide-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer text-sm
                  ${isActive
                    ? "bg-[#F5C645] text-black font-semibold"
                    : "text-gray-400 hover:bg-[#F5C645]/10 hover:text-[#F5C645]"
                  }`}
              >
                <Icon size={19} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom user + logout - Fixed at bottom */}
        <div className="shrink-0 p-3 sm:p-4 border-t border-[#F5C645]/20 bg-black">
          <div className="mb-2 px-3 py-2">
            <p className="text-white text-sm font-medium truncate">{adminName}</p>
            <p className="text-gray-500 text-xs">{adminRole || "Administrator"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-200 cursor-pointer text-sm"
          >
            <FiLogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <main className="lg:ml-64 min-h-screen bg-gradient-to-br from-gray-900 to-black">
        {/* top padding on mobile to account for fixed header bar */}
        <div className="pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}