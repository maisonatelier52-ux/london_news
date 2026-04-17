"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

// ── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Politics", "Business", "Culture", "Science", "Environment", "Art", "Life"];

const FEATURED = {
  id: 1,
  category: "Politics",
  title: "Prime Minister faces fresh rebellion as cabinet splits over economic recovery plan",
  excerpt:
    "Senior ministers are privately voicing concerns about the government's approach to inflation, with at least three cabinet members said to be pushing for an emergency Budget before the summer recess.",
  author: "Eleanor Whitmore",
  date: "17 April 2026",
  readTime: "6 min read",
  image: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
};

const ARTICLES = [
  {
    id: 2,
    category: "Business",
    title: "London tech firms attract record foreign investment despite global uncertainty",
    excerpt:
      "Venture capital flows into the capital's technology sector hit an all-time high in Q1, bucking the global trend of tightening investment conditions.",
    author: "James Calloway",
    date: "16 April 2026",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg",
  },
  {
    id: 3,
    category: "Culture",
    title: "The Barbican's bold new season redefines contemporary theatre",
    excerpt:
      "A radical reimagining of the classic stage format is drawing crowds from across Europe to EC2.",
    author: "Priya Nair",
    date: "15 April 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
  },
  {
    id: 4,
    category: "Environment",
    title: "Thames rewilding project sees first otters return in four decades",
    excerpt:
      "Conservation groups celebrate a landmark moment as the riverside ecosystem shows signs of deep recovery.",
    author: "Tom Harding",
    date: "14 April 2026",
    readTime: "3 min read",
    image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg",
  },
  {
    id: 5,
    category: "Science",
    title: "Imperial College breakthrough could halve antibiotic resistance timelines",
    excerpt:
      "Researchers have identified a molecular pathway that renders superbugs vulnerable to existing treatments — a finding described as 'generational'.",
    author: "Dr. Fatima Al-Rashid",
    date: "13 April 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
  },
  {
    id: 6,
    category: "Art",
    title: "Tate Modern unveils its most ambitious commission in a decade",
    excerpt:
      "The turbine hall installation by Berlin-based artist collective defies easy categorisation — and that's entirely the point.",
    author: "Sophie Crane",
    date: "12 April 2026",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg",
  },
  {
    id: 7,
    category: "Life",
    title: "Why Londoners are quietly abandoning the five-day office week for good",
    excerpt:
      "New data from TfL and workplace surveys reveal a permanent shift in how the city moves — and what it means for neighbourhood economies.",
    author: "Marcus Bell",
    date: "11 April 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/358570/pexels-photo-358570.jpeg",
  },
  {
    id: 8,
    category: "Politics",
    title: "Council elections map: how London voted ward by ward",
    excerpt:
      "An interactive breakdown of Thursday's local elections reveals the shifting political geography of a city in flux.",
    author: "Data Desk",
    date: "10 April 2026",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
  },
];

// ── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article }) {
  return (
    <Link href={`/news/${article.id}`} className="group flex flex-col gap-0 no-underline">
      {/* Image */}
      <div className="overflow-hidden h-[200px] sm:h-[230px]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {/* Tag */}
      <div className="mt-4">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
          {article.category}
        </span>
      </div>
      {/* Title */}
      <h3 className="mt-2 text-[20px] sm:text-[22px] font-semibold leading-[1.15] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors">
        {article.title}
      </h3>
      {/* Excerpt */}
      <p className="mt-2 text-[13px] text-black/60 leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>
      {/* Meta */}
      <div className="mt-3 flex items-center gap-3 text-[11px] text-black/40 uppercase tracking-wide">
        <span>{article.author}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CategoryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

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

      {/* ── HERO BANNER ── */}
      <section
        className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex flex-col justify-end overflow-hidden"
        style={{
          backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-[1]" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 pb-10 lg:pb-14">
          <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-white/70 mb-2">
            Browsing Category
          </p>
          <h1
            className="font-['Poppins',sans-serif] font-semibold text-[clamp(52px,9vw,120px)] leading-[0.85] tracking-[-0.08em] text-[#F5C645]"
            style={{
              textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)",
            }}
          >
            Latest<br />Stories
          </h1>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <div className="w-full bg-white border-b border-black/10 sticky top-0 z-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-4 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-medium border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-[#4a5a6a] border-[#4a5a6a]/30 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED STORY ── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16 w-full">
        <Link href={`/news/${FEATURED.id}`} className="group flex flex-col lg:flex-row gap-8 lg:gap-14 no-underline">
          {/* Image */}
          <div className="w-full lg:w-[55%] h-[280px] sm:h-[380px] lg:h-[460px] overflow-hidden">
            <img
              src={FEATURED.image}
              alt={FEATURED.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Text */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[40px] h-[3px] bg-[#F5C645]" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
                Featured · {FEATURED.category}
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold leading-[1.05] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors">
              {FEATURED.title}
            </h2>
            <p className="mt-5 text-[14px] text-black/60 leading-relaxed">
              {FEATURED.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-[11px] text-black/40 uppercase tracking-wide">
              <span>{FEATURED.author}</span>
              <span>·</span>
              <span>{FEATURED.date}</span>
              <span>·</span>
              <span>{FEATURED.readTime}</span>
            </div>
            <div className="mt-8">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-black border-b-2 border-[#F5C645] pb-1 group-hover:border-black transition-colors">
                Read Story →
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[3px] bg-[#F5C645]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
            {activeCategory === "All" ? "All Stories" : activeCategory}
          </span>
          <div className="flex-1 h-px bg-black/10" />
        </div>
      </div>

      {/* ── ARTICLE GRID ── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14 w-full">
        {filtered.length === 0 ? (
          <p className="text-[14px] text-black/40 tracking-wide uppercase">No stories in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* ── LOAD MORE ── */}
      <div className="flex justify-center pb-16">
        <button className="px-10 py-3 border border-black text-[11px] font-bold uppercase tracking-[0.16em] text-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
          Load More Stories
        </button>
      </div>

      {/* ── MOOD STRIP ── */}
      <section className="w-full bg-black py-8 px-4 sm:px-8 lg:px-12">
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