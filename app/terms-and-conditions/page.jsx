// app/terms-and-conditions/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiFileText,
  FiRefreshCcw,
  FiEdit,
  FiExternalLink,
  FiAlertTriangle,
  FiUsers,
  FiClock,
  FiMail,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "using-our-content", label: "Using Our Content" },
  { id: "accuracy-updates", label: "Accuracy & Updates" },
  { id: "opinion-analysis", label: "Opinion & Analysis" },
  { id: "external-links", label: "External Links" },
  { id: "limitation", label: "Limitation of Responsibility" },
  { id: "reader-contributions", label: "Reader Contributions" },
  { id: "updates-to-terms", label: "Updates to These Terms" },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80"
        alt="London terms"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Site Policies
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          Terms &amp;
          <br />
          Conditions
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          By accessing London News, you agree to the following terms. We aim to
          keep these straightforward and transparent so readers understand how
          our journalism may be used.
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
        London News encourages responsible sharing, proper attribution, and
        informed readership. These Terms explain your rights and responsibilities
        when using our site and content.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="using-our-content" Icon={FiFileText}>
          Using Our Content
        </SectionHead>
        <p className="text-[#555] mb-4">
          All original content published by London News is protected by
          copyright. Readers may share links and quote brief excerpts with
          proper attribution. Republishing full articles without permission is
          not permitted.
        </p>
        <p className="text-[#555] mb-5">
          For permissions or republication enquiries, contact:
        </p>
        <a
          href="mailto:editorial@londonnews.co.uk"
          className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
        >
          <FiMail className="text-[#f4c542]" size={15} />
          editorial@londonnews.co.uk
        </a>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="accuracy-updates" Icon={FiRefreshCcw}>
          Accuracy &amp; Updates
        </SectionHead>
        <p className="text-[#555] mb-4">
          We strive for accuracy and timely updates, but news evolves.
          Information may change after publication. Errors are corrected
          transparently in accordance with our{" "}
          <a
            href="/corrections-policy"
            className="text-[#f4c542] underline underline-offset-2 hover:text-[#d9ab24]"
          >
            Corrections Policy
          </a>
          .
        </p>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="opinion-analysis" Icon={FiEdit}>
          Opinion &amp; Analysis
        </SectionHead>
        <p className="text-[#555]">
          Opinion and analysis articles are clearly labelled and reflect the
          views of the author, not necessarily those of London News as a whole.
          Readers are encouraged to engage critically with all content.
        </p>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="external-links" Icon={FiExternalLink}>
          External Links
        </SectionHead>
        <p className="text-[#555]">
          Our reporting may include links to external websites for reference and
          context. We are not responsible for the content or privacy practices
          of third-party sites. A link does not constitute an endorsement of any
          external site's views or policies.
        </p>
      </section>

      {/* 5 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="limitation" Icon={FiAlertTriangle}>
          Limitation of Responsibility
        </SectionHead>
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-6">
          <p className="text-[#555]">
            London News provides journalism for general informational purposes.
            Content should not be treated as legal, medical, financial, or other
            professional advice tailored to your individual circumstances.
            Always consult a qualified professional for matters specific to your
            situation.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="reader-contributions" Icon={FiUsers}>
          Reader Contributions
        </SectionHead>
        <p className="text-[#555]">
          If reader comments or submissions are enabled, participants are
          expected to engage respectfully and constructively. Content that
          violates laws, threatens individuals, or contravenes community
          standards may be removed. London News reserves the right to moderate
          reader-submitted material.
        </p>
      </section>

      {/* 7 */}
      <section>
        <SectionHead id="updates-to-terms" Icon={FiClock}>
          Updates to These Terms
        </SectionHead>
        <p className="text-[#555] mb-6">
          These Terms may be updated periodically. Changes will be posted on
          this page with a revised effective date. Continued use of London News
          following any update constitutes acceptance of the revised Terms.
        </p>
        <div className="bg-[#0a0a0a] rounded-xl p-7 text-center">
          <p className="text-white/70 text-[14px] mb-4">
            Questions about these Terms?
          </p>
          <a
            href="mailto:editorial@londonnews.co.uk"
            className="inline-flex items-center gap-2 text-[#f4c542] font-semibold text-[14px] hover:text-[#d9ab24] transition-colors"
          >
            <FiMail size={16} />
            editorial@londonnews.co.uk
          </a>
        </div>
        <p className="mt-10 text-center text-[13px] text-[#aaa]">
          Last Updated: June 2026
        </p>
      </section>
    </article>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function TermsAndConditionsPage() {
  const [activeId, setActiveId] = useState("using-our-content");
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