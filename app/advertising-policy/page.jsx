// app/advertising-policy/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiSliders,
  FiTag,
  FiPackage,
  FiLink,
  FiRadio,
  FiFlag,
  FiXCircle,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "editorial-separation", label: "Editorial Separation" },
  { id: "how-labeled", label: "How Paid Material is Labeled" },
  { id: "native-content", label: "Native & Partner Content" },
  { id: "affiliate-links", label: "Affiliate Links & Commerce" },
  { id: "newsletters-social", label: "Newsletters & Social" },
  { id: "political-ads", label: "Political Advertising" },
  { id: "practices-avoided", label: "Practices We Avoid" },
  { id: "complaints", label: "Questions & Complaints" },
];

const LABEL_BULLETS = [
  'Clear labels may include: Advertisement, Ad, Sponsored, Paid Content, or Sponsored Advertising Content.',
  "The disclosure appears close enough to the content that a reader sees it before or as they engage with the material — not only after scrolling deep into the page.",
  "Visual design, bylines, and page layout are not used to make paid material look indistinguishable from independently reported journalism.",
  "Vague labels that could confuse readers should be avoided if they do not make the commercial nature obvious.",
];

const AFFILIATE_BULLETS = [
  "Affiliate or referral disclosures are clear and conspicuous.",
  "A material connection should not be hidden only in a general policy page or terms page if it affects a specific piece of content.",
  "Editorial recommendations are not conditioned on compensation alone.",
];

const AVOID_BULLETS = [
  "Selling editorial conclusions or offering favourable coverage in exchange for payment or access.",
  "Using a newsroom byline, headline style, or article layout to disguise paid material where the commercial nature is not obvious.",
  "Allowing an advertiser, sponsor, or affiliate partner to control unrelated reporting.",
  "Hiding a material connection in a place an ordinary reader would not reasonably notice.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80"
        alt="London advertising"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          Commercial Standards
        </p>
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          Advertising
          <br />
          Policy
        </h1>
        <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">
          How London News separates commercial material from editorial
          reporting, and how we label paid content clearly for readers.
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
        London News separates commercial material from editorial reporting and
        aims to label advertising, sponsorships, affiliate links, and other paid
        relationships clearly and conspicuously for readers.
      </p>

      {/* 1 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="editorial-separation" Icon={FiSliders}>
          Editorial Separation
        </SectionHead>
        <p className="text-[#555] mb-4">
          Commercial relationships do not grant editorial control. Reporting
          decisions, headlines, editorial framing, source selection, and
          publication timing are not sold as part of an advertising, affiliate,
          sponsorship, or partnership arrangement.
        </p>
        <p className="text-[#555]">
          Our standard is that journalism and advertising remain distinguishable
          without guesswork. A reader should not have to infer whether content
          is paid for, promotional, or independently reported.
        </p>
      </section>

      {/* 2 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="how-labeled" Icon={FiTag}>
          How Paid Material Is Labeled
        </SectionHead>
        <p className="text-[#555] mb-5">
          When content is paid for, sponsored, or published because of a
          commercial arrangement, the disclosure appears in a clear location and
          uses language ordinary readers can understand before they engage with
          the material.
        </p>
        <ul className="space-y-3">
          {LABEL_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <FiCheckCircle className="flex-shrink-0 mt-[3px] text-[#f4c542]" size={16} />
              <span className="text-[#555]">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="native-content" Icon={FiPackage}>
          Native, Branded &amp; Partner Content
        </SectionHead>
        <p className="text-[#555] mb-4">
          If London News publishes sponsored features, branded content, or
          partner-funded explainer material, those pages carry a disclosure that
          is prominent, plain-language, and durable across desktop and mobile
          views.
        </p>
        <p className="text-[#555]">
          A sponsor may buy a package or a clearly labelled promotional
          placement, but a sponsor does not buy the right to masquerade as the
          newsroom, receive a deceptive byline, or alter unrelated reporting.
        </p>
      </section>

      {/* 4 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="affiliate-links" Icon={FiLink}>
          Affiliate Links, Commerce &amp; Material Connections
        </SectionHead>
        <p className="text-[#555] mb-5">
          If London News uses affiliate links, referral arrangements, or any
          other material connection that could result in compensation when a
          reader clicks or makes a purchase, that relationship is disclosed
          clearly in or near the affected content. Disclosures are written for
          readers, not buried in legal shorthand.
        </p>
        <ul className="space-y-3">
          {AFFILIATE_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <FiCheckCircle className="flex-shrink-0 mt-[3px] text-[#f4c542]" size={16} />
              <span className="text-[#555]">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="newsletters-social" Icon={FiRadio}>
          Newsletters, Video, Audio &amp; Social Distribution
        </SectionHead>
        <p className="text-[#555] mb-4">
          Disclosure standards apply across formats, not only article pages.
          Sponsored newsletter placements, paid podcast segments, video
          sponsorships, and social media promotions are also labelled in a way
          that travels with the content or appears clearly at the point of
          exposure.
        </p>
        <p className="text-[#555]">
          The format may change, but the reader-facing principle does not: paid
          communication should look paid, not editorially disguised.
        </p>
      </section>

      {/* 6 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="political-ads" Icon={FiFlag}>
          Political &amp; Issue Advertising
        </SectionHead>
        <p className="text-[#555] mb-4">
          If London News accepts political, advocacy, or issue-based
          advertising, the material is clearly identified as advertising and is
          not presented as reported journalism or independent analysis.
        </p>
        <p className="text-[#555]">
          Acceptance of an advertisement does not imply endorsement of a
          campaign, candidate, issue position, organisation, or claim contained
          in the advertisement.
        </p>
      </section>

      {/* 7 */}
      <section className="border-b border-[#e5e5e5] pb-10">
        <SectionHead id="practices-avoided" Icon={FiXCircle}>
          Practices London News Does Not Use
        </SectionHead>
        <ul className="space-y-3">
          {AVOID_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <FiXCircle className="flex-shrink-0 mt-[3px] text-red-400" size={16} />
              <span className="text-[#555]">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8 */}
      <section>
        <SectionHead id="complaints" Icon={FiMessageSquare}>
          Questions, Complaints &amp; Review Requests
        </SectionHead>
        <p className="text-[#555] mb-5">
          Readers, advertisers, partners, and subjects may contact London News
          if they believe commercial material was mislabelled or the boundary
          between advertising and editorial work was not clear enough. Where a
          disclosure problem is substantiated, the label, placement, or page
          treatment is corrected promptly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:advertising@londonnews.co.uk"
            className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
          >
            <FiMessageSquare className="text-[#f4c542]" size={15} />
            advertising@londonnews.co.uk
          </a>
          <a
            href="mailto:corrections@londonnews.co.uk"
            className="inline-flex items-center gap-2 bg-[#f7f7f7] border border-[#e5e5e5] rounded-lg px-4 py-3 text-[14px] font-medium text-[#111] hover:border-[#f4c542] transition-colors duration-200"
          >
            <FiMessageSquare className="text-[#f4c542]" size={15} />
            corrections@londonnews.co.uk
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
export default function AdvertisingPolicyPage() {
  const [activeId, setActiveId] = useState("editorial-separation");
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