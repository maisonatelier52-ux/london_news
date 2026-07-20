// app/editorial-policy/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiCheckCircle,
  FiMail,
  FiAward,
  FiShield,
  FiLock,
  FiUser,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "editorial-independence", label: "Editorial Independence" },
  { id: "accuracy-verification", label: "Accuracy & Verification" },
  { id: "fairness-balance", label: "Fairness & Balance" },
  { id: "transparency", label: "Transparency" },
  { id: "disclosure-labeling", label: "Disclosure & Labeling" },
  { id: "ethical-standards", label: "Ethical Standards" },
  { id: "reader-feedback", label: "Reader Feedback" },
  { id: "our-commitment", label: "Our Commitment" },
];

const ETHICS_CARDS = [
  {
    Icon: FiUser,
    title: "No Undisclosed Conflicts of Interest",
    text: "Journalists disclose relevant personal or financial relationships when applicable.",
  },
  {
    Icon: FiLock,
    title: "No Hidden Sponsored Content",
    text: "Paid or sponsored material is clearly labeled and separated from news coverage.",
  },
  {
    Icon: FiShield,
    title: "Respect for Privacy",
    text: "We balance the public's right to know with individual rights and personal dignity.",
  },
];

const TRANSPARENCY_BULLETS = [
  "Clearly distinguish between news reporting, opinion, and analysis.",
  "Publish articles under individual journalist bylines whenever possible.",
  'Use a "London News Staff" byline for collaborative reporting.',
  "Label sponsored, affiliate, or partner-funded content clearly enough that readers do not mistake it for independent reporting.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[550px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80"
        alt="London Parliament at night"
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
          Editorial
          <br />
          Policy
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[380px]">
          Our commitment to independent, fact-based journalism.
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

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <>
      <h2 className="text-[#111] text-[22px] font-bold mt-12 mb-3">
        {children}
      </h2>
      <hr className="border-[#e5e5e5] mb-4" />
    </>
  );
}

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
function MainContent() {
  return (
    <article className="max-w-[850px] text-[#111] text-[15px] leading-[1.85]">
      {/* Intro */}
      <p className="text-[#444] mb-10">
        London News is an independent digital newsroom committed to factual,
        transparent, and accountable journalism. Our editorial standards exist
        to ensure that readers can trust our reporting and understand how our
        stories are produced.
      </p>

      {/* 1. Editorial Independence */}
      <section id="editorial-independence" className="scroll-mt-28">
        <SectionHeading>Editorial Independence</SectionHeading>
        <p className="text-[#555] mb-3">
          We do not accept payment, favors, or influence in exchange for
          coverage. Editorial decisions are made solely by journalists and
          editors, free from political, corporate, or government interference.
        </p>
        <p className="text-[#555]">
          Commercial support, advertising, sponsorship, and distribution
          relationships do not grant editorial control over reported articles.
        </p>
      </section>

      {/* 2. Accuracy & Verification */}
      <section id="accuracy-verification" className="scroll-mt-28">
        <SectionHeading>Accuracy & Verification</SectionHeading>
        <p className="text-[#555] mb-3">
          Accuracy is more important than speed. Our journalists verify
          information using reliable sources, document-based reporting, direct
          attribution, and independent confirmation whenever possible. When
          uncertainty exists, it is clearly stated.
        </p>
        <p className="text-[#555]">
          Errors are corrected transparently in accordance with our{" "}
          <a
            href="/corrections-policy"
            className="text-[#f4c542] underline underline-offset-2 hover:text-[#d9ab24]"
          >
            Corrections Policy
          </a>
          . Stories involving criticism, allegations, finance, legal context, or
          reputationally sensitive facts are expected to use careful wording and,
          where appropriate, source notes and pre-publication outreach.
        </p>
      </section>

      {/* 3. Fairness & Balance */}
      <section id="fairness-balance" className="scroll-mt-28">
        <SectionHeading>Fairness & Balance</SectionHeading>
        <p className="text-[#555]">
          We seek diverse perspectives on important issues while avoiding false
          balance. Claims are evaluated on evidence, credibility, and relevance
          rather than ideology.
        </p>
      </section>

      {/* 4. Transparency */}
      <section id="transparency" className="scroll-mt-28">
        <SectionHeading>Transparency</SectionHeading>
        <p className="text-[#555] mb-5">
          Readers deserve to know how reporting decisions are made. We commit to
          the following practices:
        </p>
        <ul className="space-y-3">
          {TRANSPARENCY_BULLETS.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <FiCheckCircle
                className="flex-shrink-0 mt-[3px] text-[#f4c542]"
                size={16}
              />
              <span className="text-[#555]">{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Disclosure & Labeling */}
      <section id="disclosure-labeling" className="scroll-mt-28">
        <SectionHeading>Disclosure & Labeling</SectionHeading>
        <p className="text-[#555]">
          London News aims to disclose material relationships that a reasonable
          reader would consider relevant to understanding a piece of coverage.
          Paid content, sponsored placements, affiliate links, or partner-funded
          material should be labeled clearly and kept distinct from independent
          reporting.
        </p>
      </section>

      {/* 6. Ethical Standards */}
      <section id="ethical-standards" className="scroll-mt-28">
        <SectionHeading>Ethical Standards</SectionHeading>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {ETHICS_CARDS.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="bg-[#faf7ef] rounded-xl p-6 border border-[#ede9d8]"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center mb-4">
                <Icon className="text-[#f4c542]" size={18} />
              </div>
              <p className="text-[#111] font-semibold text-[14px] leading-snug mb-2">
                {title}
              </p>
              <p className="text-[#666] text-[13px] leading-[1.7]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Reader Feedback */}
      <section id="reader-feedback" className="scroll-mt-28">
        <SectionHeading>Reader Feedback & Accountability</SectionHeading>
        <p className="text-[#555] mb-5">
          Journalism improves through dialogue. Readers are encouraged to
          contact our editorial team with feedback, corrections, or concerns.
        </p>
        <a
          href="mailto:editorial@londonnews.co.uk"
          className="inline-flex items-center gap-2 text-[#f4c542] font-semibold text-[14px] hover:text-[#d9ab24] transition-colors"
        >
          <FiMail size={16} />
          editorial@londonnews.co.uk
          <span className="text-[12px]">→</span>
        </a>
      </section>

      {/* 8. Our Commitment */}
      <section id="our-commitment" className="scroll-mt-28 mt-12">
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-6 flex gap-4 items-start">
          <FiAward className="flex-shrink-0 text-[#f4c542] mt-1" size={22} />
          <div>
            <p className="text-[#111] font-bold text-[15px] mb-1">
              Our Commitment
            </p>
            <p className="text-[#555] text-[14px] leading-[1.75]">
              Our commitment is to independent, fact-based journalism —
              accountable to readers and guided by evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <p className="mt-10 text-center text-[13px] text-[#aaa]">
        Last Updated: June 2026
      </p>
    </article>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function EditorialPolicyPage() {
  const [activeId, setActiveId] = useState("editorial-independence");
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