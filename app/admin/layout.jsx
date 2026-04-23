
// // app/admin/layout.jsx
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   FiGrid,
//   FiFolder,
//   FiFileText,
//   FiUsers,
//   FiLogOut,
//   FiMenu,
//   FiX,
//   FiHome,
// } from "react-icons/fi";

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [adminName, setAdminName] = useState("");
//   const pathname = usePathname();
//   const router = useRouter();

//   const isLoginPage = pathname === "/admin/login" || pathname === "/admin";

//   useEffect(() => {
//     if (isLoginPage) return;
//     const token = localStorage.getItem("adminToken");
//     const admin = JSON.parse(localStorage.getItem("adminData") || "{}");
//     if (!token) {
//       router.push("/admin/login");
//     } else {
//       setAdminName(admin.name || "Admin");
//     }
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminData");
//     router.push("/admin/login");
//   };

//   const navItems = [
//     { href: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
//     { href: "/admin/categories", label: "Categories", icon: FiFolder },
//     { href: "/admin/articles", label: "Articles", icon: FiFileText },
//     { href: "/admin/authors", label: "Authors", icon: FiUsers },
//   ];

//   // Login page: render children only, no sidebar
//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Mobile toggle */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#F5C645] rounded-lg cursor-pointer"
//       >
//         {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-full w-64 bg-black border-r border-[#F5C645]/20 transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
//       >
//         <div className="p-6 border-b border-[#F5C645]/20">
//           <div className="flex items-center gap-3">
//             <FiHome className="text-[#F5C645]" size={32} />
//             <div>
//               <h1 className="text-white font-bold text-xl">News Portal</h1>
//               <p className="text-[#F5C645] text-xs">Admin Panel</p>
//             </div>
//           </div>
//         </div>

//         <nav className="p-4 space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
//                   ${isActive
//                     ? "bg-[#F5C645] text-black"
//                     : "text-gray-400 hover:bg-[#F5C645]/10 hover:text-[#F5C645]"
//                   }`}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <Icon size={20} />
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#F5C645]/20">
//           <div className="mb-3 px-4 py-2">
//             <p className="text-white text-sm font-medium">{adminName}</p>
//             <p className="text-gray-500 text-xs">Administrator</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-200 cursor-pointer"
//           >
//             <FiLogOut size={20} />
//             <span className="font-medium">Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <main className="lg:ml-64 min-h-screen bg-gradient-to-br from-gray-900 to-black">
//         <div className="p-6 lg:p-8">{children}</div>
//       </main>
//     </div>
//   );
// }

// app/admin/layout.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid, FiFolder, FiFileText, FiUsers,
  FiLogOut, FiMenu, FiX, FiHome,
} from "react-icons/fi";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName]     = useState("");
  const pathname = usePathname();
  const router   = useRouter();

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin";

  useEffect(() => {
    if (isLoginPage) return;
    const token = localStorage.getItem("adminToken");
    const admin = JSON.parse(localStorage.getItem("adminData") || "{}");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAdminName(admin.name || "Admin");
    }
  }, [pathname]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin/dashboard",  label: "Dashboard",  icon: FiGrid },
    { href: "/admin/categories", label: "Categories", icon: FiFolder },
    { href: "/admin/articles",   label: "Articles",   icon: FiFileText },
    { href: "/admin/authors",    label: "Authors",    icon: FiUsers },
  ];

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-black">
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
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-black border-r border-[#F5C645]/20 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-5 sm:p-6 border-b border-[#F5C645]/20">
          <div className="flex items-center gap-3">
            <FiHome className="text-[#F5C645]" size={28} />
            <div>
              <h1 className="text-white font-bold text-lg">News Portal</h1>
              <p className="text-[#F5C645] text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-3 sm:p-4 space-y-1">
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

        {/* Bottom user + logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-[#F5C645]/20">
          <div className="mb-2 px-3 py-2">
            <p className="text-white text-sm font-medium truncate">{adminName}</p>
            <p className="text-gray-500 text-xs">Administrator</p>
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

      {/* Overlay */}
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