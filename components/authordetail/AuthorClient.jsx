// components/authordetail/AuthorClient.jsx  — CLIENT COMPONENT
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import {
  FaXTwitter, FaMedium, FaQuora, FaRedditAlien, FaGlobe, FaEnvelope,
} from "react-icons/fa6";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const SITE_URL  = "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE  = process.env.NEXT_PUBLIC_API_URL   || "http://localhost:5000/api";

const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE.replace("/api", "")}${src}`;
};

const toIso = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).toISOString();
  }
  return new Date(dateStr).toISOString();
};

const formatDisplay = (dateStr) =>
  new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

const formatJoinDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    month: "long", year: "numeric",
  });
};

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
function AuthorJsonLd({ author }) {
  const canonicalUrl = `${SITE_URL}/authors/${author.slug}`;
  const image = resolveImg(author.profileImage) || `${SITE_URL}/og-default.jpg`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: canonicalUrl,
    image,
    description: author.bio?.slice(0, 160) || `Journalist at ${SITE_NAME}`,
    jobTitle: author.category?.name || "Journalist",
    worksFor: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL },
    sameAs: [
      author.social?.twitter,
      author.social?.medium,
      author.social?.quora,
      author.social?.reddit,
      author.websiteLink,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);
  return { ref, controls };
}

// ─── Featured Articles Block ──────────────────────────────────────────────────
function FeaturedArticlesBlock({ articles }) {
  if (!articles || articles.length === 0) return null;

  const [featured, ...rest] = articles;
  const topRight = rest.slice(0, 2);
  const featuredImg = resolveImg(featured.image);
  const featuredCategory = capitalize((featured.categoryName || featured.category || "").replace(/-/g, " "));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px] mb-[3px] sm:h-[500px]">
      {/* Big left card */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -3 }}
        className="h-[420px] sm:h-full"
      >
        <Link
          href={`/${featured.category}/${featured.slug}`}
          title={featured.title}
          className="group relative overflow-hidden h-full no-underline block"
        >
          <div className="absolute inset-0 bg-black/30 z-[1] group-hover:bg-black/40 transition-all duration-500" />
          {featuredImg ? (
            <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} className="absolute inset-0">
              <Image src={featuredImg} alt={featured.imageAlt || featured.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" priority />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-zinc-800" />
          )}
          <motion.span
            className="absolute top-3 left-3 z-10 bg-[#F5C645] text-black text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {featuredCategory}
          </motion.span>
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h3 className="font-['Poppins',sans-serif] font-semibold text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em]">
              {featured.title}
            </h3>
            <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-wide text-white/55">
              <time dateTime={toIso(featured.date)}>{formatDisplay(featured.date)}</time>
              {featured.readTime && <><span>·</span><span>{featured.readTime}</span></>}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Right stacked cards */}
      <div className="flex flex-col gap-[3px] h-[420px] sm:h-full">
        {topRight.map((article, idx) => {
          const img = resolveImg(article.image);
          const articleCategory = capitalize((article.categoryName || article.category || "").replace(/-/g, " "));
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="flex-1 min-h-0"
            >
              <Link
                href={`/${article.category}/${article.slug}`}
                title={article.title}
                className="group relative overflow-hidden no-underline block h-full"
              >
                <div className="absolute inset-0 bg-black/25 z-[1] group-hover:bg-black/35 transition-all duration-500" />
                {img ? (
                  <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                    <Image src={img} alt={article.imageAlt || article.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" loading="lazy" />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 bg-zinc-700" />
                )}
                <span className="absolute top-3 left-3 z-10 bg-[#F5C645] text-black text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-1">
                  {articleCategory}
                </span>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <h3 className="font-['Poppins',sans-serif] font-semibold text-white text-[15px] sm:text-[17px] leading-[1.15] tracking-[-0.01em]">
                    {article.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] uppercase tracking-wide text-white/50">
                    <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
                    {article.readTime && <><span>·</span><span>{article.readTime}</span></>}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Small Article Card ───────────────────────────────────────────────────────
function SmallArticleCard({ article, index }) {
  const { ref, controls } = useScrollReveal();
  const img = resolveImg(article.image);

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.08 } } }}
      initial="hidden"
      animate={controls}
    >
      <Link
        href={`/${article.category}/${article.slug}`}
        title={article.title}
        className="group flex flex-col no-underline"
      >
        <div className="relative overflow-hidden h-[150px] sm:h-[170px] bg-zinc-200">
          {img ? (
            <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} className="absolute inset-0">
              <Image src={img} alt={article.imageAlt || article.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" loading="lazy" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-zinc-300" />
          )}
          <span className="absolute top-2 left-2 z-10 bg-[#F5C645] text-black text-[8px] font-bold tracking-[0.16em] uppercase px-1.5 py-0.5">
            {capitalize((article.categoryName || article.category || "").replace(/-/g, " "))}
          </span>
        </div>
        <div className="mt-3">
          <h3 className="font-['Poppins',sans-serif] font-semibold text-black text-[14px] sm:text-[15px] leading-[1.2] tracking-[-0.01em] group-hover:text-[#4a5a6a] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-wide text-black/35">
            <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
            {article.readTime && <><span>·</span><span>{article.readTime}</span></>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Parallax Hero ────────────────────────────────────────────────────────────
function ParallaxHero({ children, categoryBanner }) {
  const [offsetY, setOffsetY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) setOffsetY(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden" style={{ minHeight: "280px" }}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: categoryBanner ? `url('${categoryBanner}')` : "url('/images/homepageimages/sky_bg_image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          transform: `translateY(${offsetY}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black/65 z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-[1]" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-10 lg:pt-14 lg:pb-14">
        {children}
      </div>
    </section>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function AuthorClient({ author, articles, slug }) {
  const [categoryBanner, setCategoryBanner] = useState("");
  const [visibleCount, setVisibleCount]     = useState(11);
  const [email, setEmail]                   = useState("");

  useEffect(() => {
    if (author?.category?.slug) {
      fetch(`${API_BASE}/public/category/${author.category.slug}`)
        .then((r) => r.ok ? r.json() : null)
        .then((catData) => {
          if (catData?.bannerImage) setCategoryBanner(resolveImg(catData.bannerImage));
        })
        .catch(() => {});
    }
  }, [author]);

  const authorInitials = author.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const authorImg      = resolveImg(author.profileImage);
  const joinedDate     = author.createdAt ? `Joined ${formatJoinDate(author.createdAt)}` : "";

  const socialLinks = [
    author.social?.twitter && { href: author.social.twitter, icon: <FaXTwitter size={15} />, label: "X / Twitter" },
    author.social?.medium  && { href: author.social.medium,  icon: <FaMedium size={15} />,   label: "Medium" },
    author.social?.quora   && { href: author.social.quora,   icon: <FaQuora size={15} />,    label: "Quora" },
    author.social?.reddit  && { href: author.social.reddit,  icon: <FaRedditAlien size={15} />, label: "Reddit" },
    author.websiteLink     && { href: author.websiteLink,    icon: <FaEnvelope size={15} />, label: "Email" },
  ].filter(Boolean);

  const featuredArticles = articles.slice(0, 3);
  const smallArticles    = articles.slice(3, visibleCount);
  const hasMore          = visibleCount < articles.length;

  return (
    <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
      <AuthorJsonLd author={author} />
      <Header />

      {/* ── HERO ── */}
      <ParallaxHero categoryBanner={categoryBanner}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="shrink-0 w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] border-[3px] border-[#F5C645] flex items-center justify-center bg-black/30"
          >
            {authorImg ? (
              <div className="relative w-full h-full">
                <Image src={authorImg} alt={`${author.name} author photo`} fill sizes="140px" className="object-cover" priority />
              </div>
            ) : (
              <span className="font-['Poppins',sans-serif] font-bold text-[#F5C645] select-none" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
                {authorInitials}
              </span>
            )}
          </motion.div>

          {/* Name + meta */}
          <div className="flex flex-col gap-0">
            <motion.div
              className="flex items-center gap-3 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-[32px] h-[2px] bg-[#F5C645]" />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/60">
                {author.category?.name || "Journalist"}
              </span>
            </motion.div>

            {/* Single H1 on the page — page.jsx no longer renders a second one */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Poppins',sans-serif] font-bold leading-[0.9] tracking-[-0.03em] bg-gradient-to-r from-[#F5C645] via-white to-[#F5C645] bg-[length:200%] bg-clip-text text-transparent"
              style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
            >
              {author.name}
            </motion.h1>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap items-center gap-0 divide-x divide-white/20">
              <motion.div
                className="flex items-end gap-2 pr-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="font-['Poppins',sans-serif] font-bold text-[#F5C645] text-[28px] sm:text-[34px] leading-none">
                  {articles.length}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40 pb-1 leading-tight">
                  Articles<br />Published
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="font-['Poppins',sans-serif] font-bold text-white text-[20px] sm:text-[24px] leading-none">
                  {author.country || "—"}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40 mt-1">Based In</span>
              </motion.div>

              {joinedDate && (
                <motion.div
                  className="flex items-center gap-2 pl-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="text-[12px] text-white/50 tracking-wide">{joinedDate}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* ── ABOUT ── */}
      <motion.section
        className="w-full bg-white border-b border-black/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
          <h2 className="font-['Poppins',sans-serif] font-bold text-black text-[13px] sm:text-[14px] tracking-[0.1em] uppercase mb-4">
            About {author.name}
          </h2>

          <div className="text-[13px] sm:text-[14px] text-black/65 leading-[1.8] max-w-[680px]">
            {author.bio ? (
              author.bio.split('. ').map((line, idx, arr) => (
                <p key={idx} className="mb-2">
                  {line}{idx < arr.length - 1 ? '.' : ''}
                </p>
              ))
            ) : (
              <p>Journalist at {SITE_NAME}.</p>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, icon, label }, idx) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow ${author.name} on ${label}`}
                  aria-label={`Follow ${author.name} on ${label}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center border border-black/15 text-black/45 hover:border-black hover:text-black transition-all rounded-sm"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* ── STORIES ── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Poppins',sans-serif] font-bold text-black text-[16px] sm:text-[18px] uppercase tracking-[0.08em]">
            Stories by {author.name}
          </h2>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/35">
            {articles.length} Articles
          </span>
        </div>

        {articles.length === 0 && (
          <p className="text-[15px] text-black/35">No published articles yet.</p>
        )}

        {featuredArticles.length > 0 && <FeaturedArticlesBlock articles={featuredArticles} />}

        {smallArticles.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-8">
            {smallArticles.map((article, index) => (
              <SmallArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <motion.button
              onClick={() => setVisibleCount((c) => c + 8)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-[460px] border border-black/15 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/55 hover:border-black hover:text-black transition-all flex items-center justify-center gap-3"
            >
              Load More Articles
              <motion.svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </motion.button>
          </div>
        )}
      </section>

      {/* ── NEWSLETTER ── */}
      <div className="px-4">
        <motion.section
          className="w-full bg-[#111] mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-12 py-8 mb-8 rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-11 h-11 rounded-full border border-[#F5C645]/40 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaEnvelope size={16} className="text-[#F5C645]" />
              </motion.div>
              <div>
                <p className="font-['Poppins',sans-serif] font-bold text-white text-[14px] sm:text-[15px] uppercase tracking-wide">
                  Never Miss a Story
                </p>
                <p className="text-[11px] text-white/40 mt-0.5 leading-tight">
                  Get {author.name.split(" ")[0]}'s latest stories straight to your inbox.
                </p>
              </div>
            </div>
            <div className="flex items-stretch gap-0 w-full sm:w-auto sm:min-w-[360px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/15 border-r-0 px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#F5C645]/50 transition-colors"
              />
              <button className="bg-[#F5C645] text-black font-bold text-[11px] uppercase tracking-[0.14em] px-5 py-3 hover:bg-[#e8b800] transition-colors shrink-0 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ── FOLLOW STRIP ── */}
      {socialLinks.length > 0 && (
        <motion.section
          className="w-full bg-black border-t border-white/5 py-7 px-4 sm:px-8 lg:px-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-[28px] h-[2px] bg-[#F5C645]" />
                <p className="font-bold uppercase text-[#F5C645] tracking-[0.14em] text-[11px]">
                  Follow {author.name}
                </p>
              </div>
              <p className="text-[10px] uppercase text-white/30 tracking-[0.12em] pl-10">
                Stay connected across platforms
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ href, icon, label }, idx) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow ${author.name} on ${label}`}
                  aria-label={`Follow ${author.name} on ${label}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 border border-white/15 text-white/45 hover:border-[#F5C645] hover:text-[#F5C645] transition-all text-[10px] uppercase tracking-[0.14em] no-underline"
                >
                  {icon}
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <Footer />
    </div>
  );
}