// app/corrections-policy/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiAlertCircle,
  FiSearch,
  FiRefreshCcw,
  FiMapPin,
  FiFileText,
  FiMail,
  FiShield,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "how-we-handle", label: "How We Handle Mistakes" },
  { id: "where-corrections", label: "Where Corrections Appear" },
  { id: "what-correction-includes", label: "What A Correction Includes" },
  { id: "reader-submissions", label: "Reader Submissions" },
  { id: "commitment-transparency", label: "Our Commitment To Transparency" },
  { id: "why-this-matters", label: "Why This Matters" },
];

const MISTAKES_STEPS = [
  {
    Icon: FiAlertCircle,
    title: "We monitor our reporting continuously.",
    desc: "Every published piece is reviewed for accuracy based on new information.",
  },
  {
    Icon: FiSearch,
    title: "We investigate the issue.",
    desc: "If an error is identified, our editors confirm the facts as quickly as possible.",
  },
  {
    Icon: FiRefreshCcw,
    title: "We correct the record.",
    desc: "We update the article and add a correction note with a clear explanation.",
  },
  {
    Icon: FiRefreshCcw,
    title: "We learn and improve.",
    desc: "We review the error to understand what happened and strengthen our processes.",
  },
];

const TRANSPARENCY_POINTS = [
  "We do not remove errors without a clear explanation.",
  "Significant changes are disclosed clearly to readers.",
  "All corrections are reviewed responsibly and carefully.",
  "We do not quietly alter the substance of a published article without a correction note or update when warranted.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[550px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80"
        alt="Westminster Bridge at night"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Our Standards
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(64px, 8vw, 130px)" }}
        >
          Corrections
          <br />
          Policy
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[400px]">
          Accuracy is central to London News. When we get it wrong, we correct
          it.
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

// ─── SECTION ICON BADGE ───────────────────────────────────────────────────────
function IconBadge({ Icon }) {
  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fdf3cc] flex items-center justify-center">
      <Icon className="text-[#f4c542]" size={20} />
    </div>
  );
}

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
function MainContent() {
  return (
    <article className="max-w-[850px] text-[#111] text-[15px] leading-[1.85] space-y-14">
      {/* Intro */}
      <p className="text-[#444] text-[16px]">
        At London News, accuracy is central to our journalism. We&apos;re
        committed to publishing the truth and correcting the record when we get
        it wrong.
      </p>

      {/* 1. How We Handle Mistakes */}
      <section id="how-we-handle" className="scroll-mt-28 border-b border-[#e5e5e5] pb-10">
        <div className="flex items-center gap-4 mb-6">
          <IconBadge Icon={FiAlertCircle} />
          <h2 className="text-[#111] text-[22px] font-bold">
            How We Handle Mistakes
          </h2>
        </div>
        <div className="space-y-5">
          {MISTAKES_STEPS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <FiCheckCircle
                className="flex-shrink-0 mt-[3px] text-[#f4c542]"
                size={16}
              />
              <p className="text-[#555]">
                <span className="font-semibold text-[#111]">{title}</span>{" "}
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Where Corrections Appear */}
      <section id="where-corrections" className="scroll-mt-28 border-b border-[#e5e5e5] pb-10">
        <div className="flex items-center gap-4 mb-5">
          <IconBadge Icon={FiMapPin} />
          <h2 className="text-[#111] text-[22px] font-bold">
            Where Corrections Appear
          </h2>
        </div>
        <p className="text-[#555]">
          Corrections are made at the top or in a visible box near the top of
          the article. Social media posts linking to the article may also be
          updated. Significant corrections may be noted in our{" "}
          <a
            href="/corrections-updates"
            className="text-[#f4c542] underline underline-offset-2 hover:text-[#d9ab24]"
          >
            Corrections &amp; Updates
          </a>{" "}
          section.
        </p>
      </section>

      {/* 3. What A Correction Includes */}
      <section id="what-correction-includes" className="scroll-mt-28 border-b border-[#e5e5e5] pb-10">
        <div className="flex items-center gap-4 mb-5">
          <IconBadge Icon={FiFileText} />
          <h2 className="text-[#111] text-[22px] font-bold">
            What A Correction Includes
          </h2>
        </div>
        <p className="text-[#555] mb-4">
          To help us review a correction quickly, it includes the article URL,
          the headline, the specific line or claim in the article, the date of
          the correction, and a clear explanation of what was wrong and what we
          have changed.
        </p>
      </section>

      {/* 4. Reader Submissions */}
      <section id="reader-submissions" className="scroll-mt-28 border-b border-[#e5e5e5] pb-10">
        <div className="flex items-center gap-4 mb-5">
          <IconBadge Icon={FiMail} />
          <h2 className="text-[#111] text-[22px] font-bold">
            Reader Submissions
          </h2>
        </div>
        <p className="text-[#555] mb-5">
          Readers play an important role in maintaining accuracy. If you notice
          an error, please contact us with the article link, the issue, and any
          supporting documentation.
        </p>
        <a
          href="mailto:corrections@londonnews.co.uk"
          className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
        >
          <FiMail className="text-[#f4c542]" size={15} />
          corrections@londonnews.co.uk
        </a>
      </section>

      {/* 5. Our Commitment To Transparency */}
      <section id="commitment-transparency" className="scroll-mt-28 border-b border-[#e5e5e5] pb-10">
        <div className="flex items-center gap-4 mb-6">
          <IconBadge Icon={FiShield} />
          <h2 className="text-[#111] text-[22px] font-bold">
            Our Commitment To Transparency
          </h2>
        </div>
        <div className="space-y-3">
          {TRANSPARENCY_POINTS.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <FiCheckCircle
                className="flex-shrink-0 mt-[3px] text-[#f4c542]"
                size={16}
              />
              <p className="text-[#555]">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why This Matters */}
      <section id="why-this-matters" className="scroll-mt-28">
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiUsers className="text-[#f4c542]" size={28} />
          </div>
          <h2 className="text-[#111] text-[20px] font-bold mb-3">
            Why This Matters
          </h2>
          <p className="text-[#555] text-[15px] leading-[1.8] max-w-[560px] mx-auto">
            Trust is built through accountability. By acknowledging mistakes
            openly and correcting them quickly, we aim to serve our readers and
            the communities across London with integrity.
          </p>
        </div>
      </section>

      {/* Last Updated */}
      <p className="text-center text-[13px] text-[#aaa]">
        Last Updated: June 2026
      </p>
    </article>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function CorrectionsPolicy() {
  const [activeId, setActiveId] = useState("how-we-handle");
  const observerRef = useRef(null);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

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