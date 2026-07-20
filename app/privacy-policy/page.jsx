// app/privacy-policy/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiDatabase,
  FiSettings,
  FiPieChart,
  FiUserCheck,
  FiLock,
  FiMail,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-used", label: "How Information Is Used" },
  { id: "cookies", label: "Cookies & Analytics" },
  { id: "your-rights", label: "Your Rights & Choices" },
  { id: "data-protection", label: "Data Protection" },
];

const HOW_USED_BULLETS = [
  "To keep the website operating smoothly and securely.",
  "To understand which stories resonate most with readers.",
  "To respond to messages, tips, or correction requests.",
  "To provide updates when readers request them.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
        alt="London privacy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Reader Trust
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(64px, 9vw, 130px)" }}
        >
          Privacy
          <br />
          Policy
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          London News values reader trust. We collect only the limited
          information necessary to operate our newsroom, communicate with
          readers, and improve our journalism.
        </p>
      </div>
    </section>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ activeId }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-32">
        <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#999] mb-5">
          On This Page
        </p>
        <nav className="space-y-1">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`block w-full text-left text-[14px] py-2 transition-all duration-150 ${
                activeId === id
                  ? "border-l-2 border-[#f4c542] pl-4 text-[#111] font-semibold"
                  : "pl-[18px] text-[#666] hover:text-[#111]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function IconBadge({ Icon }) {
  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fdf3cc] flex items-center justify-center">
      <Icon className="text-[#f4c542]" size={20} />
    </div>
  );
}

function SectionHead({ id, Icon, children }) {
  return (
    <div id={id} className="scroll-mt-28 flex items-center gap-4 mb-5 mt-14 first:mt-0">
      <IconBadge Icon={Icon} />
      <h2 className="text-[#111] text-[22px] font-bold">{children}</h2>
    </div>
  );
}

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
function MainContent() {
  return (
    <article className="max-w-[850px] text-[#111] text-[15px] leading-[1.85]">
      <p className="text-[#444] text-[16px] mb-10">
        This policy explains what we collect, why we collect it, and how we
        protect it. London News collects as little information as possible, uses
        it only to support journalism, and never sells personal data.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="information-we-collect" Icon={FiDatabase}>
          Information We Collect
        </SectionHead>
        <p className="text-[#555] mb-4">
          When you visit our website, basic technical data such as pages viewed,
          device type, and browser information may be collected automatically.
          This information helps us understand readership patterns and improve
          site performance.
        </p>
        <p className="text-[#555] mb-4">
          If you contact us directly — for tips, corrections, or inquiries — we
          collect only the information you choose to provide, such as your name
          and email address.
        </p>
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-5">
          <p className="text-[#555] font-medium">
            We do not collect unnecessary personal data, and we do not sell or
            trade user information.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="how-used" Icon={FiSettings}>
          How Information Is Used
        </SectionHead>
        <ul className="space-y-3 mb-5">
          {HOW_USED_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fdf3cc] flex items-center justify-center mt-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4c542] block" />
              </span>
              <span className="text-[#555]">{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-[#555]">
          We do not use personal data for advertising sales, profiling, or
          promotional targeting.
        </p>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="cookies" Icon={FiPieChart}>
          Cookies &amp; Analytics
        </SectionHead>
        <p className="text-[#555] mb-4">
          We use cookies and analytics tools to understand how readers interact
          with our content. You may disable cookies in your browser without
          affecting access to our reporting.
        </p>
        <p className="text-[#555]">
          Third-party analytics services may process anonymised data under their
          own privacy policies.
        </p>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="your-rights" Icon={FiUserCheck}>
          Your Rights &amp; Choices
        </SectionHead>
        <p className="text-[#555] mb-5">
          Depending on your jurisdiction, you may have rights to access,
          correct, or request deletion of personal data. Requests can be
          submitted using the contact below.
        </p>
        <a
          href="mailto:editorial@londonnews.co.uk"
          className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
        >
          <FiMail className="text-[#f4c542]" size={15} />
          editorial@londonnews.co.uk
        </a>
      </section>

      {/* 5 */}
      <section>
        <SectionHead id="data-protection" Icon={FiLock}>
          Data Protection
        </SectionHead>
        <p className="text-[#555] mb-4">
          We take reasonable technical and organisational measures to protect
          information from unauthorised access. Because we limit the data we
          collect, we also limit our exposure and risk.
        </p>
        <div className="bg-[#0a0a0a] rounded-xl p-7 text-center">
          <p className="text-white/80 text-[15px] leading-[1.8] max-w-[520px] mx-auto">
            London News collects as little information as possible, uses it only
            to support journalism, and never sells personal data.
          </p>
        </div>
        <p className="mt-10 text-center text-[13px] text-[#aaa]">
          Last Updated: June 2026
        </p>
      </section>
    </article>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState("information-we-collect");
  const observerRef = useRef(null);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    elements.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <div className="bg-white py-20">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[260px_1fr] gap-16">
          <Sidebar activeId={activeId} />
          <MainContent />
        </div>
      </div>
    </main>
  );
}