"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

// ── Mock article data ─────────────────────────────────────────────────────────
const ARTICLE = {
  id: 1,
  category: "Business",
  tag: "Economy",
  title: "Pound falls sharply against dollar after Bank confirms bond-buying end date",
  standfirst:
    "The Bank of England's governor has insisted the emergency intervention will end as planned — sending sterling into a tailspin and reigniting fears of a deeper financial crisis.",
  author: "Eleanor Whitmore",
  authorRole: "Economics Editor",
  date: "17 April 2026",
  readTime: "6 min read",
  heroImage: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
  heroCaption: "The Bank of England's Threadneedle Street headquarters. Photograph: Tolga Akmen/EPA",
  body: [
    {
      type: "paragraph",
      text: "The pound has fallen sharply against the dollar after Andrew Bailey warned the Bank of England would not extend its emergency intervention in financial markets beyond this week, after the turmoil sparked by the government's mini-budget.",
    },
    {
      type: "paragraph",
      text: "Sterling skidded by more than a cent against the dollar to below $1.10 after the Bank's governor insisted the £65bn scheme to purchase UK government bonds would not be continued beyond the deadline on Friday.",
    },
    {
      type: "pullquote",
      text: "The herd instinct is powerful. When the herd moves, it moves — and right now, it is moving away from sterling.",
      attribution: "Senior currency strategist, HSBC",
    },
    {
      type: "paragraph",
      text: "Pensions industry leaders and one of the Bank's former deputy governors had earlier called for an extension to mop up the ongoing bond market fallout triggered by Kwasi Kwarteng's ill-received mini-budget last month. The calls went unheeded.",
    },
    {
      type: "paragraph",
      text: "The central bank had started the day by saying it would revamp the scheme's bond-buying firepower — within the existing timeframe — for a second time in as many days, warning there were still 'material risks' in government debt markets affecting UK pension funds.",
    },
    {
      type: "subheading",
      text: "The pension fund pressure",
    },
    {
      type: "paragraph",
      text: "At the heart of the crisis is a little-understood investment strategy used by pension funds known as liability-driven investment (LDI). These strategies use derivatives to hedge against interest rate moves, but when gilt yields spiked dramatically, they were forced to sell assets at pace — creating a dangerous spiral.",
    },
    {
      type: "paragraph",
      text: "The Bank's intervention two weeks ago temporarily arrested that spiral. But as Friday's deadline approaches without an extension, traders and fund managers are once again growing nervous about what comes next.",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg",
      caption: "City traders monitor screens as sterling falls against major currencies. Photograph: Reuters",
    },
    {
      type: "subheading",
      text: "Markets react with alarm",
    },
    {
      type: "paragraph",
      text: "Analysts at Goldman Sachs warned that without further central bank support, the UK gilt market remains vulnerable to sharp moves. 'The fundamentals have not improved sufficiently,' said one senior strategist. 'The market is pricing in the possibility of a return to the volatility we saw in late September.'",
    },
    {
      type: "paragraph",
      text: "The FTSE 100 closed down 1.8% on the day, with financial stocks bearing the brunt of the selling. Housebuilders and consumer discretionary names also fell sharply, reflecting growing concern about the economic outlook for British households.",
    },
  ],
};

const RELATED = [
  {
    id: 2,
    category: "Economy",
    title: "What the gilt market crisis means for your mortgage",
    date: "16 April 2026",
    image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg",
  },
  {
    id: 3,
    category: "Politics",
    title: "Kwarteng faces parliamentary inquiry over mini-budget fallout",
    date: "15 April 2026",
    image: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
  },
  {
    id: 4,
    category: "Business",
    title: "London tech firms attract record foreign investment despite uncertainty",
    date: "14 April 2026",
    image: "https://images.pexels.com/photos/358570/pexels-photo-358570.jpeg",
  },
];

// ── Social share icons (inline SVG) ──────────────────────────────────────────
function ShareBar({ vertical = false }) {
  const base = "flex items-center justify-center w-8 h-8 border border-black/20 hover:border-black transition-colors cursor-pointer";
  const wrap = vertical
    ? "flex flex-col gap-3"
    : "flex flex-row gap-3";
  return (
    <div className={wrap}>
      {/* X / Twitter */}
      <button className={base} title="Share on X">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      </button>
      {/* Facebook */}
      <button className={base} title="Share on Facebook">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </button>
      {/* Link */}
      <button className={base} title="Copy link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}

// ── Body renderer ─────────────────────────────────────────────────────────────
function BodyBlock({ block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[15px] sm:text-[16px] text-black/80 leading-[1.75] mb-6">
          {block.text}
        </p>
      );
    case "subheading":
      return (
        <h3 className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4">
          {block.text}
        </h3>
      );
    case "pullquote":
      return (
        <div className="my-10 pl-6 border-l-4 border-[#F5C645]">
          <p className="text-[20px] sm:text-[24px] font-semibold text-black leading-[1.3] tracking-[-0.01em] italic">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-black/40">
              — {block.attribution}
            </p>
          )}
        </div>
      );
    case "image":
      return (
        <figure className="my-10 -mx-4 sm:-mx-0">
          <img
            src={block.src}
            alt={block.caption}
            className="w-full object-cover max-h-[420px]"
          />
          {block.caption && (
            <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function NewsDetailPage() {
  return (
    <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">

      {/* ── HEADER ── */}
      <header
        className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
        style={{
          backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-[0]" />

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between w-full relative z-10">
          <Link href="/" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">
            London News
          </Link>
          <a href="#" className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline">
            Subscribe
          </a>
        </div>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center relative z-10">
          {["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business", "More"].map((n) => (
            <a
              key={n}
              href={`${n.toLowerCase()}`}
              className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
            >
              {n}
            </a>
          ))}
        </nav>
        <a
          href="#"
          className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10"
        >
          Customise / Subscribe
        </a>
      </header>

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-black/10">
        <div className="max-w-[780px] mx-auto px-4 sm:px-8 py-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40">
          <Link href="/" className="hover:text-black transition-colors no-underline text-black/40">Home</Link>
          <span>/</span>
          <Link href="/category" className="hover:text-black transition-colors no-underline text-black/40">Business</Link>
          <span>/</span>
          <span className="text-black/60">Economy</span>
        </div>
      </div>

      {/* ── ARTICLE HEADER ── */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 pt-10 lg:pt-14 w-full">
        {/* Category tag */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[32px] h-[3px] bg-[#F5C645]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
            {ARTICLE.category} · {ARTICLE.tag}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-['Poppins',sans-serif] font-semibold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.05] tracking-[-0.03em] text-black">
          {ARTICLE.title}
        </h1>

        {/* Standfirst */}
        <p className="mt-5 text-[16px] sm:text-[18px] text-black/60 leading-[1.6] font-light">
          {ARTICLE.standfirst}
        </p>

        {/* Meta row */}
        <div className="mt-6 pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
              {ARTICLE.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-black">{ARTICLE.author}</p>
              <p className="text-[11px] text-black/40 uppercase tracking-wide">{ARTICLE.authorRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-black/40 uppercase tracking-wide">
            <span>{ARTICLE.date}</span>
            <span>·</span>
            <span>{ARTICLE.readTime}</span>
          </div>
        </div>

        {/* Share bar mobile */}
        <div className="mt-5 sm:hidden">
          <ShareBar />
        </div>
      </div>

      {/* ── HERO IMAGE ── */}
      <div className="max-w-[1100px] mx-auto px-0 sm:px-8 mt-8 w-full">
        <figure className="w-full">
          <div className="w-full h-[260px] sm:h-[400px] lg:h-[560px] overflow-hidden">
            <img
              src={ARTICLE.heroImage}
              alt={ARTICLE.title}
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
            {ARTICLE.heroCaption}
          </figcaption>
        </figure>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 mt-10 lg:mt-14 w-full relative">

        {/* Sticky share bar desktop */}
        <div className="hidden lg:block absolute -left-16 top-0">
          <div className="sticky top-24">
            <ShareBar vertical />
          </div>
        </div>

        {/* Body content */}
        <div className="article-body">
          {ARTICLE.body.map((block, i) => (
            <BodyBlock key={i} block={block} />
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap gap-2">
          {["Bank of England", "Sterling", "Economy", "Mini-Budget", "Andrew Bailey"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] uppercase tracking-[0.12em] border border-black/20 text-black/50 hover:border-black hover:text-black transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author bio */}
        <div className="mt-10 p-6 bg-[#f7f6f2] flex gap-5 items-start">
          <div className="w-12 h-12 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[15px] font-semibold shrink-0">
            EW
          </div>
          <div>
            <p className="text-[13px] font-bold text-black">{ARTICLE.author}</p>
            <p className="text-[11px] uppercase tracking-wide text-black/40 mb-2">{ARTICLE.authorRole}</p>
            <p className="text-[13px] text-black/60 leading-relaxed">
              Eleanor Whitmore has covered the Bank of England and UK macroeconomic policy for London News since 2019. She previously reported from the Treasury and the IMF in Washington.
            </p>
          </div>
        </div>
      </div>

      {/* ── RELATED STORIES ── */}
      <section className="w-full bg-black mt-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-[40px] h-[3px] bg-[#F5C645]" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">
              Related Stories
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {RELATED.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="group no-underline flex flex-col gap-0">
                <div className="overflow-hidden h-[180px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#F5C645]">
                  {item.category}
                </span>
                <h4 className="mt-2 text-[16px] sm:text-[18px] font-semibold leading-[1.2] text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-[11px] text-white/30 uppercase tracking-wide">{item.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOOD STRIP ── */}
      <section className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] sm:text-[15px] font-bold uppercase text-[#F5C645] tracking-wide">
              London's Mood Right Now
            </p>
            <p className="text-[11px] font-normal uppercase text-white/40 mt-1">
              Updated 32 minutes ago
            </p>
          </div>
          <div className="flex gap-8 text-white/70 text-[12px] uppercase tracking-wide">
            <p><span className="text-[18px] text-white font-light">82% </span>Happy</p>
            <p><span className="text-[18px] text-white font-light">6% </span>Sad</p>
            <p><span className="text-[18px] text-white font-light">12% </span>Can't complain</p>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5C645] border border-[#F5C645]/40 px-5 py-2 hover:border-[#F5C645] transition-all cursor-pointer">
            Take Daily Survey
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}