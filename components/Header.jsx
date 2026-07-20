
// // components/Header.jsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export default function Header({ siteName = "London News" }) {
//   const router = useRouter();

//   // ── desktop nav / mobile drawer state (existing behaviour, unchanged) ───
//   const [navItems, setNavItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   // ── mobile search state (new) ────────────────────────────────────────────
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedTerm, setDebouncedTerm] = useState("");
//   const [searchPool, setSearchPool] = useState(null); // lazily-loaded article list
//   const [poolLoading, setPoolLoading] = useState(false);
//   const mobileHeaderRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const debounceRef = useRef(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${API_BASE}/public/categories`);
//         if (!response.ok) throw new Error("Failed to fetch categories");
//         const categories = await response.json();
//         setNavItems(categories);
//       } catch (err) {
//         console.error("Error fetching navigation items:", err);
//         setNavItems([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsMoreDropdownOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setIsMobileMenuOpen(false);
//       }
//       if (mobileHeaderRef.current && !mobileHeaderRef.current.contains(e.target)) {
//         closeSearch();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Lock body scroll when the mobile drawer is open
//   useEffect(() => {
//     document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isMobileMenuOpen]);

//   // Lazily fetch a pool of recent articles the first time search is opened.
//   // NOTE: this searches your most recent articles (limit=50) using the same
//   // `/public/latest` endpoint the homepage already uses — no backend change
//   // needed. If you have (or build) a dedicated `/public/search?q=` endpoint
//   // for full-archive search, swap the fetch below to call that instead.
//   useEffect(() => {
//     if (!isSearchOpen || searchPool !== null) return;
//     setPoolLoading(true);
//     fetch(`${API_BASE}/public/latest?limit=50`)
//       .then((r) => (r.ok ? r.json() : []))
//       .then((data) => setSearchPool(Array.isArray(data) ? data : []))
//       .catch(() => setSearchPool([]))
//       .finally(() => setPoolLoading(false));
//   }, [isSearchOpen, searchPool]);

//   // Debounce what's typed before filtering, so we're not re-filtering on
//   // every keystroke
//   useEffect(() => {
//     clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 250);
//     return () => clearTimeout(debounceRef.current);
//   }, [searchTerm]);

//   // Autofocus the input as soon as search opens
//   useEffect(() => {
//     if (isSearchOpen) searchInputRef.current?.focus();
//   }, [isSearchOpen]);

//   // Escape closes whichever overlay is open
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key !== "Escape") return;
//       closeSearch();
//       setIsMobileMenuOpen(false);
//     };
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   function openSearch() {
//     setIsMobileMenuOpen(false);
//     setIsSearchOpen(true);
//   }

//   function closeSearch() {
//     setIsSearchOpen(false);
//     setSearchTerm("");
//     setDebouncedTerm("");
//   }

//   function toggleDrawer() {
//     closeSearch();
//     setIsMobileMenuOpen((v) => !v);
//   }

//   function handleSearchKeyDown(e) {
//     if (e.key === "Enter" && searchTerm.trim()) {
//       // Sends the visitor to a full results page, matching the
//       // SearchAction already declared in the homepage's WebSite schema.
//       // Remove this if you don't have a /search route yet.
//       router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//       closeSearch();
//     }
//   }

//   const results =
//     debouncedTerm.length > 0 && searchPool
//       ? searchPool
//           .filter((a) => (a.title || "").toLowerCase().includes(debouncedTerm.toLowerCase()))
//           .slice(0, 8)
//       : [];

//   const MAX_VISIBLE = 6;
//   const visibleCategories = navItems.slice(0, MAX_VISIBLE);
//   const hiddenCategories = navItems.slice(MAX_VISIBLE);
//   const hasMore = hiddenCategories.length > 0;

//   return (
//     <>
//       {/* Inter, loaded for the mobile header */}
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;800&display=swap');`}</style>

//       {/* ════════════════════ DESKTOP HEADER — unchanged ════════════════════ */}
//       <header
//         className="hidden lg:flex relative z-30 items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
//         style={{
//           backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-0" />

//         <nav
//           className="flex items-center gap-8 flex-1 justify-center relative z-10"
//           aria-label="Main navigation"
//         >
//           {isLoading ? (
//             [...Array(7)].map((_, i) => (
//               <div key={i} className="h-3 w-16 bg-black/20 rounded animate-pulse" />
//             ))
//           ) : (
//             <>
//               <Link
//                 href="/"
//                 className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
//               >
//                 Home
//               </Link>

//               {visibleCategories.map((cat) => (
//                 <Link
//                   key={cat.slug}
//                   href={`/${cat.slug}`}
//                   className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55 whitespace-nowrap"
//                 >
//                   {cat.name}
//                 </Link>
//               ))}

//               {hasMore && (
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setIsMoreDropdownOpen((v) => !v)}
//                     onMouseEnter={() => setIsMoreDropdownOpen(true)}
//                     aria-expanded={isMoreDropdownOpen}
//                     aria-haspopup="true"
//                     className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] transition-opacity hover:opacity-55 flex items-center gap-1 cursor-pointer"
//                   >
//                     More
//                     <svg
//                       className={`w-3 h-3 transition-transform duration-200 ${isMoreDropdownOpen ? "rotate-180" : ""}`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {isMoreDropdownOpen && (
//                     <div
//                       onMouseLeave={() => setIsMoreDropdownOpen(false)}
//                       className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-2 z-20 border border-black/10"
//                     >
//                       {hiddenCategories.map((cat) => (
//                         <Link
//                           key={cat.slug}
//                           href={`/${cat.slug}`}
//                           onClick={() => setIsMoreDropdownOpen(false)}
//                           className="block px-4 py-2 text-[12px] text-[#4a5a6a] hover:bg-black/5 hover:text-black transition-colors no-underline"
//                         >
//                           {cat.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </nav>

//         <a
//           href="#"
//           className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10"
//         >
//           Customise / Subscribe
//         </a>
//       </header>

//       {/* ═══════════ MOBILE / TABLET HEADER — new premium design ═══════════ */}
//       <header
//         ref={mobileHeaderRef}
//         className="lg:hidden sticky top-0 z-30 w-full bg-white border-b border-black/[0.06]"
//       >
//         <div
//           className="flex items-center justify-between h-[76px] px-6"
//           style={{ fontFamily: "'Inter', sans-serif" }}
//         >
//           {!isSearchOpen ? (
//             <>
//               {/* Logo */}
//               <Link href="/" className="no-underline shrink-0" aria-label={siteName}>
//                 <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.8px", lineHeight: 1, color: "#1B2435" }}>
//                   London
//                 </span>
//                 <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.8px", lineHeight: 1, color: "#F2B51D" }}>
//                   {" "}News
//                 </span>
//               </Link>

//               {/* Icons */}
//               <div className="flex items-center gap-6 shrink-0">
//                 <button
//                   onClick={openSearch}
//                   aria-label="Search"
//                   className="flex items-center justify-center cursor-pointer"
//                 >
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B2435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <circle cx="11" cy="11" r="8" />
//                     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//                   </svg>
//                 </button>

//                 <button
//                   onClick={toggleDrawer}
//                   aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//                   aria-expanded={isMobileMenuOpen}
//                   className="w-[22px] h-[22px] flex flex-col items-center justify-center gap-[5px] shrink-0 cursor-pointer"
//                 >
//                   <span
//                     className={`block h-[2px] bg-[#1B2435] transition-all duration-300 origin-center ${
//                       isMobileMenuOpen ? "w-[22px] rotate-45 translate-y-[7px]" : "w-[22px]"
//                     }`}
//                   />
//                   <span
//                     className={`block h-[2px] bg-[#1B2435] transition-all duration-300 ${
//                       isMobileMenuOpen ? "w-0 opacity-0" : "w-[18px] opacity-100"
//                     }`}
//                   />
//                   <span
//                     className={`block h-[2px] bg-[#1B2435] transition-all duration-300 origin-center ${
//                       isMobileMenuOpen ? "w-[22px] -rotate-45 -translate-y-[7px]" : "w-[22px]"
//                     }`}
//                   />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Search-active row */}
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B2435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={handleSearchKeyDown}
//                 placeholder="Search London News"
//                 aria-label="Search news"
//                 className="flex-1 ml-3 text-[15px] text-[#1B2435] placeholder:text-black/35 outline-none bg-transparent"
//               />
//               <button
//                 onClick={closeSearch}
//                 className="ml-3 text-[13px] font-semibold text-[#1B2435]/70 hover:text-[#1B2435] transition-colors shrink-0 cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </>
//           )}
//         </div>

//         {/* Live results — filters as you type, click a headline to open it */}
//         {isSearchOpen && (
//           <div className="absolute left-0 right-0 top-full bg-white border-b border-black/[0.06] shadow-[0_12px_24px_rgba(0,0,0,0.08)] max-h-[70vh] overflow-y-auto">
//             {debouncedTerm.length === 0 ? (
//               <p className="px-6 py-5 text-[13px] text-black/40">Start typing to search recent stories.</p>
//             ) : poolLoading ? (
//               <p className="px-6 py-5 text-[13px] text-black/40">Searching&hellip;</p>
//             ) : results.length === 0 ? (
//               <p className="px-6 py-5 text-[13px] text-black/40">No results for &ldquo;{debouncedTerm}&rdquo;</p>
//             ) : (
//               results.map((article) => (
//                 <Link
//                   key={article.id || article.slug}
//                   href={`/${article.category}/${article.slug}`}
//                   onClick={closeSearch}
//                   className="flex flex-col px-6 py-3.5 border-b border-black/[0.05] no-underline hover:bg-black/[0.02] transition-colors"
//                 >
//                   <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#F2B51D] mb-1">
//                     {article.categoryName || article.category}
//                   </span>
//                   <span className="text-[14px] font-semibold text-[#1B2435] leading-snug">
//                     {article.title}
//                   </span>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}
//       </header>

//       {/* ── MOBILE DRAWER (unchanged) ── */}
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
//           isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setIsMobileMenuOpen(false)}
//         aria-hidden="true"
//       />

//       {/* Drawer panel */}
//       <div
//         ref={mobileMenuRef}
//         className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 lg:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Drawer header */}
//         <div className="flex items-center justify-between px-5 py-5 border-b border-black/10">
//           <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#2a3a4a]">
//             Browse
//           </span>
//           <button
//             onClick={() => setIsMobileMenuOpen(false)}
//             aria-label="Close menu"
//             className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </button>
//         </div>

//         {/* Nav links */}
//         <nav className="flex-1 overflow-y-auto py-3" aria-label="Mobile navigation">
//           <Link
//             href="/"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="flex items-center justify-between px-5 py-3.5 text-[12px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] hover:bg-black/4 transition-colors no-underline border-b border-black/5"
//           >
//             Home
//           </Link>

//           {isLoading ? (
//             <div className="px-5 py-6 flex flex-col gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="h-3 bg-black/10 rounded animate-pulse" style={{ width: `${60 + i * 5}%` }} />
//               ))}
//             </div>
//           ) : navItems.length === 0 ? (
//             <p className="px-5 py-6 text-[12px] text-black/35">No categories found.</p>
//           ) : (
//             navItems.map((cat, i) => (
//               <Link
//                 key={cat.slug}
//                 href={`/${cat.slug}`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium tracking-[0.12em] uppercase text-[#4a5a6a] hover:bg-black/4 hover:text-black transition-colors no-underline border-b border-black/5"
//               >
//                 {cat.name}
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/20">
//                   <polyline points="9 18 15 12 9 6" />
//                 </svg>
//               </Link>
//             ))
//           )}
//         </nav>

//         {/* Drawer footer */}
//         <div className="px-5 py-5 border-t border-black/10">
//           <a
//             href="#"
//             className="block w-full text-center bg-[#F5C645] text-black text-[11px] font-bold tracking-[0.16em] uppercase py-3 no-underline hover:bg-[#e8b800] transition-colors"
//           >
//             Subscribe
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }


// components/Header.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { audienceAPI } from "@/services/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Header({ siteName = "London News" }) {
  const router = useRouter();

  // ── desktop nav / mobile drawer state (existing behaviour, unchanged) ───
  const [navItems, setNavItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ── mobile search state (existing) ───────────────────────────────────────
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchPool, setSearchPool] = useState(null); // lazily-loaded article list
  const [poolLoading, setPoolLoading] = useState(false);
  const mobileHeaderRef = useRef(null);
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);

  // ── subscribe modal state (new) ──────────────────────────────────────────
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeError, setSubscribeError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/public/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const categories = await response.json();
        setNavItems(categories);
      } catch (err) {
        console.error("Error fetching navigation items:", err);
        setNavItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMoreDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
      if (mobileHeaderRef.current && !mobileHeaderRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll when the mobile drawer or subscribe modal is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || isSubscribeModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen, isSubscribeModalOpen]);

  // Lazily fetch a pool of recent articles the first time search is opened.
  // NOTE: this searches your most recent articles (limit=50) using the same
  // `/public/latest` endpoint the homepage already uses — no backend change
  // needed. If you have (or build) a dedicated `/public/search?q=` endpoint
  // for full-archive search, swap the fetch below to call that instead.
  useEffect(() => {
    if (!isSearchOpen || searchPool !== null) return;
    setPoolLoading(true);
    fetch(`${API_BASE}/public/latest?limit=50`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setSearchPool(Array.isArray(data) ? data : []))
      .catch(() => setSearchPool([]))
      .finally(() => setPoolLoading(false));
  }, [isSearchOpen, searchPool]);

  // Debounce what's typed before filtering, so we're not re-filtering on
  // every keystroke
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 250);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);

  // Autofocus the input as soon as search opens
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // Autofocus the input as soon as the subscribe modal opens
  useEffect(() => {
    if (isSubscribeModalOpen) subscribeInputRef.current?.focus();
  }, [isSubscribeModalOpen]);

  // Escape closes whichever overlay is open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      closeSearch();
      setIsMobileMenuOpen(false);
      closeSubscribeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openSearch() {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchTerm("");
    setDebouncedTerm("");
  }

  function toggleDrawer() {
    closeSearch();
    setIsMobileMenuOpen((v) => !v);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter" && searchTerm.trim()) {
      // Sends the visitor to a full results page, matching the
      // SearchAction already declared in the homepage's WebSite schema.
      // Remove this if you don't have a /search route yet.
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      closeSearch();
    }
  }

  // ── subscribe modal handlers (new) ───────────────────────────────────────
  function openSubscribeModal() {
    setIsMobileMenuOpen(false);
    closeSearch();
    setIsSubscribeModalOpen(true);
  }

  function closeSubscribeModal() {
    setIsSubscribeModalOpen(false);
    setSubscribeEmail("");
    setSubscribeError("");
    setIsSubscribed(false);
  }

  function handleSubscribeSubmit(e) {
    e.preventDefault();
    const trimmed = subscribeEmail.trim();

    if (!trimmed) {
      setSubscribeError("Please enter your email address.");
      return;
    }

    // Must be a valid, Gmail-only address (e.g. yourname@gmail.com)
    const isGmail = /^[^\s@]+@gmail\.com$/i.test(trimmed);
    if (!isGmail) {
      setSubscribeError("Please enter a valid Gmail address (e.g. yourname@gmail.com).");
      return;
    }

    setSubscribeError("");
    setIsSubscribed(true);

    // Fire-and-forget: the UI already shows success optimistically above,
    // matching the existing pattern in this handler. If it fails, the user
    // can always subscribe again from /subscribe.
    audienceAPI.subscribe(trimmed, "header_popup").catch(() => {});
  }

  const results =
    debouncedTerm.length > 0 && searchPool
      ? searchPool
          .filter((a) => (a.title || "").toLowerCase().includes(debouncedTerm.toLowerCase()))
          .slice(0, 8)
      : [];

  const MAX_VISIBLE = 6;
  const visibleCategories = navItems.slice(0, MAX_VISIBLE);
  const hiddenCategories = navItems.slice(MAX_VISIBLE);
  const hasMore = hiddenCategories.length > 0;

  return (
    <>
      {/* Inter, loaded for the mobile header */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;800&display=swap');`}</style>

      {/* ════════════════════ DESKTOP HEADER — unchanged ════════════════════ */}
      <header
        className="hidden lg:flex relative z-30 items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
        style={{
          backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-0" />

        <nav
          className="flex items-center gap-8 flex-1 justify-center relative z-10"
          aria-label="Main navigation"
        >
          {isLoading ? (
            [...Array(7)].map((_, i) => (
              <div key={i} className="h-3 w-16 bg-black/20 rounded animate-pulse" />
            ))
          ) : (
            <>
              <Link
                href="/"
                className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
              >
                Home
              </Link>

              {visibleCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55 whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}

              {hasMore && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsMoreDropdownOpen((v) => !v)}
                    onMouseEnter={() => setIsMoreDropdownOpen(true)}
                    aria-expanded={isMoreDropdownOpen}
                    aria-haspopup="true"
                    className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] transition-opacity hover:opacity-55 flex items-center gap-1 cursor-pointer"
                  >
                    More
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${isMoreDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isMoreDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsMoreDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-2 z-20 border border-black/10"
                    >
                      {hiddenCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/${cat.slug}`}
                          onClick={() => setIsMoreDropdownOpen(false)}
                          className="block px-4 py-2 text-[12px] text-[#4a5a6a] hover:bg-black/5 hover:text-black transition-colors no-underline"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-5 shrink-0 relative z-10">
          <Link
            href="/classifieds"
            className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] whitespace-nowrap hover:opacity-70 transition-opacity no-underline"
          >
            Classifieds
          </Link>
          <button
            type="button"
            onClick={openSubscribeModal}
            aria-haspopup="dialog"
            aria-expanded={isSubscribeModalOpen}
            className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] whitespace-nowrap bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
          >
            Customise / Subscribe
          </button>
        </div>
      </header>

      {/* ═══════════ MOBILE / TABLET HEADER — unchanged ═══════════ */}
      <header
        ref={mobileHeaderRef}
        className="lg:hidden sticky top-0 z-30 w-full bg-white border-b border-black/[0.06]"
      >
        <div
          className="flex items-center justify-between h-[76px] px-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {!isSearchOpen ? (
            <>
              {/* Logo */}
              <Link href="/" className="no-underline shrink-0" aria-label={siteName}>
                <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.8px", lineHeight: 1, color: "#1B2435" }}>
                  London
                </span>
                <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.8px", lineHeight: 1, color: "#F2B51D" }}>
                  {" "}News
                </span>
              </Link>

              {/* Icons */}
              <div className="flex items-center gap-6 shrink-0">
                <button
                  onClick={openSearch}
                  aria-label="Search"
                  className="flex items-center justify-center cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B2435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>

                <button
                  onClick={toggleDrawer}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                  className="w-[22px] h-[22px] flex flex-col items-center justify-center gap-[5px] shrink-0 cursor-pointer"
                >
                  <span
                    className={`block h-[2px] bg-[#1B2435] transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? "w-[22px] rotate-45 translate-y-[7px]" : "w-[22px]"
                    }`}
                  />
                  <span
                    className={`block h-[2px] bg-[#1B2435] transition-all duration-300 ${
                      isMobileMenuOpen ? "w-0 opacity-0" : "w-[18px] opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-[2px] bg-[#1B2435] transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? "w-[22px] -rotate-45 -translate-y-[7px]" : "w-[22px]"
                    }`}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Search-active row */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B2435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search London News"
                aria-label="Search news"
                className="flex-1 ml-3 text-[15px] text-[#1B2435] placeholder:text-black/35 outline-none bg-transparent"
              />
              <button
                onClick={closeSearch}
                className="ml-3 text-[13px] font-semibold text-[#1B2435]/70 hover:text-[#1B2435] transition-colors shrink-0 cursor-pointer"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Live results — filters as you type, click a headline to open it */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-black/[0.06] shadow-[0_12px_24px_rgba(0,0,0,0.08)] max-h-[70vh] overflow-y-auto">
            {debouncedTerm.length === 0 ? (
              <p className="px-6 py-5 text-[13px] text-black/40">Start typing to search recent stories.</p>
            ) : poolLoading ? (
              <p className="px-6 py-5 text-[13px] text-black/40">Searching&hellip;</p>
            ) : results.length === 0 ? (
              <p className="px-6 py-5 text-[13px] text-black/40">No results for &ldquo;{debouncedTerm}&rdquo;</p>
            ) : (
              results.map((article) => (
                <Link
                  key={article.id || article.slug}
                  href={`/${article.category}/${article.slug}`}
                  onClick={closeSearch}
                  className="flex flex-col px-6 py-3.5 border-b border-black/[0.05] no-underline hover:bg-black/[0.02] transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#F2B51D] mb-1">
                    {article.categoryName || article.category}
                  </span>
                  <span className="text-[14px] font-semibold text-[#1B2435] leading-snug">
                    {article.title}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}
      </header>

      {/* ── MOBILE DRAWER (unchanged, except Subscribe button now opens the modal) ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 lg:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-black/10">
          <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#2a3a4a]">
            Browse
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3" aria-label="Mobile navigation">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-5 py-3.5 text-[12px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] hover:bg-black/4 transition-colors no-underline border-b border-black/5"
          >
            Home
          </Link>

          {isLoading ? (
            <div className="px-5 py-6 flex flex-col gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 bg-black/10 rounded animate-pulse" style={{ width: `${60 + i * 5}%` }} />
              ))}
            </div>
          ) : navItems.length === 0 ? (
            <p className="px-5 py-6 text-[12px] text-black/35">No categories found.</p>
          ) : (
            navItems.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium tracking-[0.12em] uppercase text-[#4a5a6a] hover:bg-black/4 hover:text-black transition-colors no-underline border-b border-black/5"
              >
                {cat.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/20">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))
          )}
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-5 border-t border-black/10">
          <button
            type="button"
            onClick={openSubscribeModal}
            className="block w-full text-center bg-[#F5C645] text-black text-[11px] font-bold tracking-[0.16em] uppercase py-3 border-none cursor-pointer hover:bg-[#e8b800] transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* ═══════════ SUBSCRIBE MODAL (new) ═══════════ */}
      {isSubscribeModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/50"
          onClick={closeSubscribeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] bg-white p-8 sm:p-10 shadow-2xl"
          >
            <button
              onClick={closeSubscribeModal}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!isSubscribed ? (
              <>
                <div className="w-10 h-[3px] bg-[#F5C645] mb-5" />
                <h2 id="subscribe-modal-title" className="text-[22px] font-bold text-[#1B2435] tracking-[-0.01em] mb-2">
                  Customise &amp; Subscribe
                </h2>
                <p className="text-[13px] text-black/55 leading-relaxed mb-6">
                  Enter your Gmail address to personalise your feed and get the stories that matter to you.
                </p>

                <form onSubmit={handleSubscribeSubmit} className="flex flex-col gap-3">
                  <input
                    ref={subscribeInputRef}
                    type="email"
                    value={subscribeEmail}
                    onChange={(e) => {
                      setSubscribeEmail(e.target.value);
                      if (subscribeError) setSubscribeError("");
                    }}
                    placeholder="yourname@gmail.com"
                    aria-label="Gmail address"
                    aria-invalid={!!subscribeError}
                    className={`w-full px-4 py-3 text-[14px] text-[#1B2435] border outline-none transition-colors ${
                      subscribeError ? "border-red-400 focus:border-red-500" : "border-black/15 focus:border-[#F5C645]"
                    }`}
                  />

                  {subscribeError && (
                    <p className="text-[12px] text-red-500">{subscribeError}</p>
                  )}

                  <button
                    type="submit"
                    className="mt-2 w-full bg-[#F5C645] text-black text-[12px] font-bold tracking-[0.14em] uppercase py-3 border-none cursor-pointer hover:bg-[#e8b800] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#F5C645]/20 flex items-center justify-center mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2435" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 id="subscribe-modal-title" className="text-[18px] font-bold text-[#1B2435] mb-2">
                  You&rsquo;re subscribed!
                </h2>
                <p className="text-[13px] text-black/55 leading-relaxed">
                  We&rsquo;ve sent a confirmation to{" "}
                  <strong className="text-[#1B2435]">{subscribeEmail.trim()}</strong>. Thanks for joining London News.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}