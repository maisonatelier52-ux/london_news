// app/ownership-and-funding/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiBriefcase,
  FiDollarSign,
  FiAlertCircle,
  FiBarChart2,
  FiFlag,
  FiRefreshCcw,
  FiCheckCircle,
  FiMail,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "what-this-covers", label: "What This Page Covers" },
  { id: "editorial-control", label: "Editorial Control" },
  { id: "how-funded", label: "How London News is Funded" },
  { id: "conflicts", label: "Conflicts of Interest" },
  { id: "commercial-separation", label: "Commercial Separation" },
  { id: "political-influence", label: "Political & Advocacy Influence" },
  { id: "ownership-changes", label: "Ownership Changes" },
];

const CONFLICT_BULLETS = [
  "Relevant personal or financial ties are disclosed internally before publication.",
  "Gifts, favours, or access that could compromise independence are not accepted.",
  "Outside work, advocacy, or consulting that conflicts with newsroom independence is disclosed and may require reassignment.",
  "When necessary, an assignment may be moved, edited with explicit disclosure, or declined.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1444653389962-8149286c578a?w=1920&q=80"
        alt="London financial district"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Transparency
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(64px, 8vw, 130px)" }}
        >
          Ownership
          <br />
          &amp; Funding
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          Who controls editorial decisions at London News, how we are supported,
          and how we handle conflicts, funding, and material relationships.
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
        This page explains who controls editorial decisions at London News, how
        commercial support is separated from reporting, and how the newsroom
        handles conflicts, material relationships, and ownership disclosures.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="what-this-covers" Icon={FiBriefcase}>
          What This Page Covers
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News publishes as an independent digital newsroom operated by
          an editorial team based in London. This page is intended to help
          readers understand how editorial control, commercial support, and
          conflict disclosures are handled publicly.
        </p>
        <p className="text-[#555]">
          This page is not a substitute for a corporate registry filing or a
          legal disclosure. It is a reader-facing explanation of how
          independence is protected and what kinds of material relationships
          London News expects to disclose.
        </p>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="editorial-control" Icon={FiFlag}>
          Editorial Control &amp; Decision-Making
        </SectionHead>
        <p className="text-[#555] mb-4">
          Editorial judgements at London News are made by journalists and
          editors. Coverage decisions, headlines, source selection, framing, and
          publication timing are not sold to advertisers, sponsors, political
          actors, governments, or commercial partners.
        </p>
        <p className="text-[#555]">
          A commercial relationship does not create a right to favourable
          coverage, prior review of a reported article, or suppression of
          accurate reporting. Where a proposed arrangement would blur those
          lines, the newsroom's standard is to reject the arrangement or remove
          the affected journalist from the assignment.
        </p>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="how-funded" Icon={FiDollarSign}>
          How London News Is Funded
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News may generate revenue through advertising, sponsorships,
          platform distribution, licensing, partnerships, and other ordinary
          publishing-related commercial arrangements. Any such revenue stream is
          expected to remain structurally separate from editorial decision-making.
        </p>
        <p className="text-[#555]">
          Where London News enters into a material funding relationship,
          ownership change, or strategic arrangement that a reasonable reader
          would consider relevant to editorial independence, the newsroom's
          expectation is that the relationship is disclosed on this page, in
          affected coverage, or both.
        </p>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="conflicts" Icon={FiAlertCircle}>
          Conflicts of Interest &amp; Recusals
        </SectionHead>
        <p className="text-[#555] mb-5">
          Journalists and editors are expected to disclose personal, financial,
          political, or family relationships that could reasonably affect their
          impartiality in a relevant assignment. London News does not treat
          conflicts as a private housekeeping issue when reader trust is
          materially affected.
        </p>
        <ul className="space-y-3">
          {CONFLICT_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <FiCheckCircle className="flex-shrink-0 mt-[3px] text-[#f4c542]" size={16} />
              <span className="text-[#555]">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="commercial-separation" Icon={FiBarChart2}>
          Commercial Support Does Not Buy Coverage
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News maintains a clear boundary between revenue activity and
          journalism. Advertising or sponsorship does not guarantee coverage,
          shape a reporter's conclusions, or entitle a commercial party to veto
          criticism.
        </p>
        <p className="text-[#555]">
          Paid content, sponsored features, affiliate relationships, and other
          commercial material are labelled clearly enough that a reader does not
          have to guess whether they are reading journalism or advertising.
        </p>
      </section>

      {/* 6 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="political-influence" Icon={FiFlag}>
          Political, Governmental &amp; Advocacy Influence
        </SectionHead>
        <p className="text-[#555] mb-4">
          London News does not present political, governmental, or advocacy
          messaging as independent reporting. If an external actor seeks to
          influence coverage through money, access, or pressure, the newsroom's
          standard is to preserve editorial control rather than trade
          independence for convenience.
        </p>
        <p className="text-[#555]">
          Where a story concerns a subject with which London News has a material
          relationship, the relationship is disclosed in language a reader can
          understand.
        </p>
      </section>

      {/* 7 */}
      <section>
        <SectionHead id="ownership-changes" Icon={FiRefreshCcw}>
          Changes to Ownership or Material Support
        </SectionHead>
        <div className="bg-[#faf7ef] border-l-4 border-[#f4c542] rounded-xl p-7 mb-6">
          <p className="text-[#555] mb-3">
            Ownership, control, and funding arrangements can change over time.
            If London News undergoes a material ownership change, takes on a
            funding relationship that bears directly on editorial independence,
            or launches a funding structure that a reasonable reader should know
            about, this page will be updated.
          </p>
          <p className="text-[#555]">
            Readers who believe a relevant ownership or funding relationship has
            not been disclosed may contact the newsroom and request review of
            the omission.
          </p>
        </div>
        <a
          href="mailto:editorial@londonnews.co.uk"
          className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
        >
          <FiMail className="text-[#f4c542]" size={15} />
          editorial@londonnews.co.uk
        </a>
        <p className="mt-10 text-center text-[13px] text-[#aaa]">
          Last Updated: June 2026
        </p>
      </section>
    </article>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function OwnershipFundingPage() {
  const [activeId, setActiveId] = useState("what-this-covers");
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