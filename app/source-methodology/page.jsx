// app/source-methodology/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiBookOpen,
  FiLayers,
  FiUserCheck,
  FiFileText,
  FiAlertTriangle,
  FiLink,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "how-reporting-begins", label: "How Reporting Begins" },
  { id: "source-hierarchy", label: "Source Hierarchy & Verification" },
  { id: "anonymous-sources", label: "Anonymous Sources" },
  { id: "documents-data", label: "Documents, Media & Data" },
  { id: "attribution", label: "Attribution & Source Notes" },
  { id: "uncertainty", label: "Handling Uncertainty" },
  { id: "what-this-policy-excludes", label: "What This Policy Excludes" },
];

const HIERARCHY_POINTS = [
  "Primary records and firsthand sourcing are always preferred over secondary reports.",
  "Secondary reporting may be referenced when the underlying claim is well-established.",
  "Chronology, figures, or legal detail central to a story are verified against source documents wherever feasible.",
  "A source's prominence does not eliminate the need for independent verification.",
];

const UNCERTAINTY_POINTS = [
  "We do not convert uncertainty into certainty for headline impact.",
  "We distinguish clearly between analysis and assertion.",
  "We update language when better sourcing becomes available or a record changes.",
  "Unresolved, contested, or incomplete claims are disclosed as such rather than implied as settled.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
        alt="London newsroom"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Our Standards
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(64px, 8vw, 130px)" }}
        >
          Source
          <br />
          Methodology
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          How London News builds its stories — what we verify, what we disclose,
          and where interpretation begins.
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

// ─── ICON BADGE ───────────────────────────────────────────────────────────────
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
    <article className="max-w-[850px] text-[#111] text-[15px] leading-[1.85] space-y-0">
      <p className="text-[#444] text-[16px] mb-10">
        London News aims to show readers how articles are constructed — what is
        sourced directly, what comes from public records or official documents,
        what remains unverified, and where interpretation begins.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="how-reporting-begins" Icon={FiBookOpen}>
          How Reporting Begins
        </SectionHead>
        <p className="text-[#555] mb-4">
          We begin with verifiable material rather than recycled summary. That
          may include official institutional pages, court records, regulatory
          disclosures, company filings, direct interviews, public statements,
          original media, public datasets, and contemporaneous reporting that
          can be checked against the record.
        </p>
        <p className="text-[#555]">
          Our standard is to narrow wording when direct verification is
          incomplete. If a fact cannot be confirmed to the level the story would
          otherwise imply, the language is tightened until it reflects what is
          actually known.
        </p>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="source-hierarchy" Icon={FiLayers}>
          Source Hierarchy &amp; Verification
        </SectionHead>
        <p className="text-[#555] mb-5">
          Wherever possible, London News favours primary documents and firsthand
          sourcing over tertiary summaries. Official records and direct
          statements are generally stronger than rumour, aggregation, or
          unattributed repetition.
        </p>
        <ul className="space-y-3">
          {HIERARCHY_POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <FiCheckCircle className="flex-shrink-0 mt-[3px] text-[#f4c542]" size={16} />
              <span className="text-[#555]">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="anonymous-sources" Icon={FiUserCheck}>
          Anonymous Sources &amp; Background Information
        </SectionHead>
        <p className="text-[#555] mb-4">
          Anonymity is not used as a shortcut. Anonymous or background sourcing
          may be used when the information is in the public interest and cannot
          be responsibly obtained on the record, but the newsroom must
          understand the source's identity and evaluate their motive, access,
          and reliability.
        </p>
        <p className="text-[#555]">
          When anonymity is granted, reporting gives readers as much truthful
          context as possible about why the source is being protected without
          needlessly exposing them.
        </p>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="documents-data" Icon={FiFileText}>
          Documents, Media &amp; Data
        </SectionHead>
        <p className="text-[#555] mb-4">
          Documents, screenshots, audio, video, and data extracts are reviewed
          with care. We check provenance, timing, authenticity, and whether a
          clip or excerpt may be misleading without broader context.
        </p>
        <p className="text-[#555]">
          A document's existence is not the same as proving the broadest
          possible claim. Our standard is to describe what a record shows, what
          it does not show, and where interpretation begins.
        </p>
      </section>

      {/* 5 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="attribution" Icon={FiLink}>
          Attribution &amp; Source Notes
        </SectionHead>
        <p className="text-[#555] mb-4">
          For trust-sensitive reporting — including finance explainers, profiles,
          legal-context pieces, and institution-focused reporting — London News
          may include source notes or primary links so readers can inspect the
          public record themselves.
        </p>
        <p className="text-[#555]">
          Attribution should be specific enough for readers to understand where
          key information came from. Where a story relies on public records,
          official statements, or direct institutional descriptions, we aim to
          signal that clearly rather than burying the sourcing logic.
        </p>
      </section>

      {/* 6 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="uncertainty" Icon={FiAlertTriangle}>
          Handling Uncertainty &amp; Change
        </SectionHead>
        <ul className="space-y-3">
          {UNCERTAINTY_POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <FiCheckCircle className="flex-shrink-0 mt-[3px] text-[#f4c542]" size={16} />
              <span className="text-[#555]">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 */}
      <section>
        <SectionHead id="what-this-policy-excludes" Icon={FiShield}>
          What This Policy Excludes
        </SectionHead>
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-7">
          <p className="text-[#555] mb-3">
            Source transparency does not require revealing every confidential
            source or every reporting step in a way that would compromise
            safety, privacy, or legitimate journalistic work.
          </p>
          <p className="text-[#555]">
            It does mean giving readers an honest account of what kind of
            evidence supports a story. A source note is not a substitute for
            careful writing — the article itself must describe evidence with
            precision and restraint.
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
export default function SourceMethodologyPage() {
  const [activeId, setActiveId] = useState("how-reporting-begins");
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