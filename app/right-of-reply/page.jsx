// app/right-of-reply/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiMessageCircle,
  FiPhoneCall,
  FiSend,
  FiRefreshCcw,
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiMail,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "when-we-seek", label: "When We Seek a Response" },
  { id: "how-outreach", label: "How Outreach Is Handled" },
  { id: "what-to-send", label: "What to Send Us" },
  { id: "post-publication", label: "Post-Publication Responses" },
  { id: "what-not-guaranteed", label: "What This Policy Does Not Guarantee" },
  { id: "urgent-matters", label: "Urgent & Legal Matters" },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1920&q=80"
        alt="London press"
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
          Right of
          <br />
          Reply
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          London News aims to give relevant people and institutions a fair
          opportunity to respond when criticism or disputed context is central
          to a story.
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
        London News is committed to fair reporting. Where a story involves
        criticism, allegations, or materially disputed factual context, we
        aim to give the relevant person or institution an opportunity to respond
        before publication where feasible.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="when-we-seek" Icon={FiMessageCircle}>
          When We Seek a Response
        </SectionHead>
        <p className="text-[#555] mb-4">
          If a story includes criticism, allegations, serious factual dispute,
          or materially adverse claims about a person or institution, London
          News seeks a response before publication when feasible and when doing
          so does not compromise necessary reporting, safety, or legitimate
          public-interest work.
        </p>
        <p className="text-[#555]">
          The goal is not to offer editorial control to the subject of
          reporting. The goal is to test the story against relevant rebuttal,
          correction, or context before publication where the circumstances
          warrant it.
        </p>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="how-outreach" Icon={FiPhoneCall}>
          How Outreach Is Usually Handled
        </SectionHead>
        <p className="text-[#555] mb-4">
          The method and timing of outreach may vary with the story. London News
          may contact a subject or representative by email, phone, public
          contact channel, counsel, or other reasonable means depending on the
          nature of the allegation and the urgency of publication.
        </p>
        <p className="text-[#555]">
          A reasonable opportunity to respond does not always mean an unlimited
          one. Fast-moving stories, breaking developments, public-safety issues,
          and time-sensitive reporting may require shorter response windows than
          feature or investigative work.
        </p>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="what-to-send" Icon={FiSend}>
          What to Send If You Are Seeking a Reply or Correction
        </SectionHead>
        <p className="text-[#555] mb-4">
          If you are contacting London News in response to published or pending
          coverage, include the article URL or headline, the specific claim you
          dispute, the factual basis for your objection, any supporting
          documents you want reviewed, and the best contact information for
          follow-up.
        </p>
        <p className="text-[#555] mb-5">
          General denials without specifics are less useful than direct
          identification of what is said to be wrong, incomplete, misleading, or
          out of date.
        </p>
        <a
          href="mailto:editorial@londonnews.co.uk"
          className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
        >
          <FiMail className="text-[#f4c542]" size={15} />
          editorial@londonnews.co.uk
        </a>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="post-publication" Icon={FiRefreshCcw}>
          Post-Publication Responses
        </SectionHead>
        <p className="text-[#555] mb-4">
          After publication, a person or institution that believes context is
          missing or materially wrong may contact the newsroom. Relevant
          responses may lead to a clarification, correction, update note,
          follow-up coverage, or no change if the reporting remains supported.
        </p>
        <p className="text-[#555]">
          London News may publish or summarise a substantive response when it
          materially helps readers understand the dispute or the evidentiary
          record.
        </p>
      </section>

      {/* 5 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="what-not-guaranteed" Icon={FiXCircle}>
          What This Policy Does Not Guarantee
        </SectionHead>
        <p className="text-[#555] mb-4">
          A right-of-reply request does not guarantee publication of a full
          statement, removal of accurate reporting, or advance approval of an
          article by the subject of that article.
        </p>
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-6">
          <p className="text-[#555]">
            It does mean the newsroom should review the request seriously,
            compare it against the evidence, and respond according to its
            editorial standards and corrections process.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section>
        <SectionHead id="urgent-matters" Icon={FiAlertTriangle}>
          Urgent Matters &amp; Legal Sensitivity
        </SectionHead>
        <p className="text-[#555] mb-4">
          Where a story concerns active legal proceedings, regulatory matters,
          allegations of misconduct, or reputationally sensitive claims, London
          News's standard is to handle outreach carefully and document the
          response process in the newsroom's working record.
        </p>
        <p className="text-[#555]">
          A reply request should improve factual accuracy, not become a
          mechanism to pressure the newsroom into weakening well-supported
          reporting.
        </p>
        <p className="mt-10 text-center text-[13px] text-[#aaa]">
          Last Updated: June 2026
        </p>
      </section>
    </article>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function RightOfReplyPage() {
  const [activeId, setActiveId] = useState("when-we-seek");
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