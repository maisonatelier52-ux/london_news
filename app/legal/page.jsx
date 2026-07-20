// app/legal/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiInfo,
  FiCopy,
  FiAlertCircle,
  FiList,
  FiMinusCircle,
  FiExternalLink,
  FiBell,
  FiMail,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "informational-use", label: "Informational Use of Content" },
  { id: "copyright-reuse", label: "Copyright, Quotation & Reuse" },
  { id: "complaints-accuracy", label: "Complaints About Accuracy" },
  { id: "formal-request", label: "What to Include in a Formal Request" },
  { id: "removal-requests", label: "Removal & Update Requests" },
  { id: "third-party-links", label: "Links to Third-Party Material" },
  { id: "formal-notices", label: "Formal Notices & Requests" },
];

const FORMAL_REQUEST_BULLETS = [
  "The URL or headline of the content at issue.",
  "A clear description of the statement, image, video, or other material you are challenging.",
  "The legal or factual basis for the request, including supporting documents where relevant.",
  "Your name, organisation if applicable, and a reliable contact method for follow-up.",
  "If you are acting on behalf of someone else, a brief statement of your authority to do so.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1920&q=80"
        alt="London legal"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Compliance &amp; Rights
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(64px, 9vw, 130px)" }}
        >
          Legal
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          A plain-language overview of legal and compliance topics relevant to
          London News — publishing, reader use of site content, complaints,
          permissions, and formal requests.
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
        This page provides a plain-language overview of legal and compliance
        topics relevant to London News's publishing, reader use of site content,
        complaints, permissions, and formal requests.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="informational-use" Icon={FiInfo}>
          Informational Use of London News Content
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News publishes journalism, analysis, and explanatory material
          for informational purposes. Articles are edited to newsroom standards,
          but they should not be treated as legal, financial, tax, medical, or
          other professional advice tailored to an individual reader's situation.
        </p>
        <p className="text-[#555]">
          Where a story touches legal, regulatory, or financial matters, London
          News aims to use precise sourcing and bounded language rather than
          sweeping implication. Readers remain responsible for seeking
          professional advice when they need it.
        </p>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="copyright-reuse" Icon={FiCopy}>
          Copyright, Quotation &amp; Reuse
        </SectionHead>
        <p className="text-[#555] mb-4">
          Readers may link to London News reporting and may quote brief excerpts
          with clear attribution where applicable law permits. Republishing full
          articles, bulk reproduction, commercial reuse, scraping for
          republication, or systematic copying requires permission unless a
          separate licence or legal exception applies.
        </p>
        <p className="text-[#555]">
          If you wish to syndicate, reproduce, translate, archive commercially,
          or otherwise reuse substantial London News content, please contact the
          newsroom before doing so.
        </p>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="complaints-accuracy" Icon={FiAlertCircle}>
          Complaints About Accuracy, Rights, or Fairness
        </SectionHead>
        <p className="text-[#555] mb-4">
          If you believe a London News article contains a material factual
          error, omits critical context, infringes rights, or raises a serious
          legal concern, contact the newsroom promptly with the specific URL,
          the exact material at issue, the basis for your concern, and
          supporting documentation where available.
        </p>
        <p className="text-[#555]">
          Different complaints may be handled under different newsroom
          processes. A factual dispute may be reviewed under the corrections or
          right-of-reply process, while a copyright, privacy, or other rights
          complaint may require separate review.
        </p>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="formal-request" Icon={FiList}>
          What to Include in a Formal Request
        </SectionHead>
        <p className="text-[#555] mb-5">
          To help us review a formal request quickly, please include:
        </p>
        <ul className="space-y-3">
          {FORMAL_REQUEST_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fdf3cc] flex items-center justify-center mt-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4c542] block" />
              </span>
              <span className="text-[#555]">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="removal-requests" Icon={FiMinusCircle}>
          Removal, Restriction &amp; Update Requests
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News reviews serious requests for correction, clarification,
          update, removal, or restricted display. Submission of a request does
          not by itself guarantee removal of accurate reporting or immediate
          depublication.
        </p>
        <p className="text-[#555]">
          The newsroom evaluates the request against the public record,
          editorial standards, applicable law, and the public interest. In some
          cases the appropriate response may be a correction, clarification,
          update note, or follow-up article rather than removal.
        </p>
      </section>

      {/* 6 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="third-party-links" Icon={FiExternalLink}>
          Links to Third-Party Material
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News may link to third-party sites, official records, social
          platforms, public databases, and outside documents for sourcing and
          reader context. Those third-party properties are governed by their own
          terms, policies, and accuracy practices.
        </p>
        <p className="text-[#555]">
          A link to a third-party source does not necessarily mean London News
          endorses every statement or policy on that external site.
        </p>
      </section>

      {/* 7 */}
      <section>
        <SectionHead id="formal-notices" Icon={FiBell}>
          Formal Notices &amp; Requests
        </SectionHead>
        <p className="text-[#555] mb-5">
          For legal notices, permissions questions, rights complaints, or formal
          requests related to published content, contact the newsroom directly
          so the request can be routed to the appropriate reviewer. London News
          handles public-facing legal and policy correspondence through the
          published newsroom email addresses on this site.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:editorial@londonnews.co.uk"
            className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
          >
            <FiMail className="text-[#f4c542]" size={15} />
            General Legal — editorial@londonnews.co.uk
          </a>
          <a
            href="mailto:corrections@londonnews.co.uk"
            className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
          >
            <FiMail className="text-[#f4c542]" size={15} />
            Corrections — corrections@londonnews.co.uk
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
export default function LegalPage() {
  const [activeId, setActiveId] = useState("informational-use");
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