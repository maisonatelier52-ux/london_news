// components/categorydetail/CategoryClient.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "../../components/Header";
import MoodSurveyWidget from "../MoodSurveyWidget";

// Converts a hyphenated slug like "local-news" into "Local News"
const capitalize = (s = "") =>
  s
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const toIso = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).toISOString();
  }
  return new Date(dateStr).toISOString();
};

const formatDisplay = (dateStr) => {
  if (!dateStr) return "";
  return new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
};

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

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, index }) {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" } },
      }}
      initial="hidden"
      animate={controls}
    >
      <Link
        href={`/${article.category}/${article.slug}`}
        aria-label={`Read article: ${article.title}`}
        className="group flex flex-col gap-0 no-underline"
      >
        <div className="overflow-hidden h-[200px] sm:h-[230px] bg-black/5 relative rounded-lg">
          {article.resolvedImage && (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <Image
                src={article.resolvedImage}
                alt={article.imageAlt || article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          )}
        </div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        >
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a] relative inline-block">
            {article.categoryName || article.category}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F5C645] transition-all duration-300 group-hover:w-full" />
          </span>
        </motion.div>

        <h3 className="mt-2 text-[20px] sm:text-[22px] font-semibold leading-[1.15] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="mt-2 text-[13px] text-black/60 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-black/60 uppercase tracking-wide flex-wrap">
          <span>{article.author?.name || "Staff Writer"}</span>
          <span>·</span>
          <time dateTime={article.isoDate}>{article.formattedDate || formatDisplay(article.date)}</time>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col gap-0 animate-pulse">
      <div className="h-[200px] sm:h-[230px] bg-black/10" />
      <div className="mt-4 h-3 w-20 bg-black/10 rounded" />
      <div className="mt-2 h-5 w-full bg-black/10 rounded" />
      <div className="mt-1 h-5 w-3/4 bg-black/10 rounded" />
      <div className="mt-2 h-3 w-full bg-black/10 rounded" />
      <div className="mt-1 h-3 w-5/6 bg-black/10 rounded" />
      <div className="mt-3 h-3 w-32 bg-black/10 rounded" />
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ category, siteUrl }) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      className="w-full px-4 sm:px-8 lg:px-12 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/50 flex-wrap">
        <li>
          <Link href="/" className="hover:text-black transition-colors no-underline text-black/50">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span className="text-black/70">{capitalize(category)}</span>
        </li>
      </ol>
    </motion.nav>
  );
}

// ─── Hero Banner ──────────────────────────────────────────────────────────────
// The large logotype is decorative (aria-hidden). Real H1 + H2 live in page.jsx
// as sr-only / server-rendered elements for crawlers.
function HeroBanner({ category, bannerImage }) {
  const categoryName = capitalize(category);
  // Don't append "News" again if the slug already contains it (e.g. "local-news")
  const titleText = /\bnews\b/i.test(categoryName) ? categoryName : `${categoryName} News`;
  const titleWords = titleText.split(" ");

  return (
    <section
      className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex flex-col justify-end overflow-hidden"
      style={{
        backgroundImage: bannerImage ? `url(${bannerImage})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label={`${categoryName} category hero`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />

      <div className="relative z-10 px-4 sm:px-8 lg:px-12 pb-10 lg:pb-14">
        <motion.p
          className="text-[10px] sm:text-[11px] text-bold font-medium tracking-[0.14em] uppercase text-white/90 mb-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Browsing Category
        </motion.p>

        {/* Decorative logotype — aria-hidden, not counted by crawlers */}
        <p
          aria-hidden="true"
          className="font-['Poppins',sans-serif] font-semibold text-[clamp(52px,9vw,120px)] leading-[0.85] tracking-[-0.08em] text-[#F5C645]"
          style={{ textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)" }}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}

// ─── Featured Story ───────────────────────────────────────────────────────────
// SEO NOTE: This H2 is client-rendered (not seen by SSR crawlers).
// The authoritative server-rendered H2 lives in page.jsx as sr-only.
// This H2 is kept for visual structure / screen readers post-hydration.
function FeaturedStory({ featured, category }) {
  const { ref, controls } = useScrollReveal();

  const featuredVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (!featured) return null;

  return (
    <motion.section
      ref={ref}
      className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16 w-full"
      aria-label="Featured story"
      variants={featuredVariants}
      initial="hidden"
      animate={controls}
    >
      <Link
        href={`/${featured.category}/${featured.slug}`}
        aria-label={`Read featured article: ${featured.title}`}
        className="group flex flex-col lg:flex-row gap-8 lg:gap-14 no-underline"
      >
        <motion.div
          className="w-full lg:w-[55%] h-[280px] sm:h-[380px] lg:h-[460px] overflow-hidden bg-black/5 relative rounded-md"
          variants={child}
        >
          {featured.resolvedImage && (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full relative"
            >
              <Image
                src={featured.resolvedImage}
                alt={featured.imageAlt || featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div className="w-full lg:w-[45%] flex flex-col justify-center" variants={child}>
          <motion.div className="flex items-center gap-3 mb-4" variants={child}>
            <div className="w-[40px] h-[3px] bg-[#F5C645]" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
              Featured · {featured.categoryName || capitalize(featured.category)}
            </span>
          </motion.div>

          {/* Visual H2 for post-hydration; sr-only H2 in page.jsx handles crawlers */}
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold leading-[1.05] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors">
            {featured.title}
          </h2>

          <motion.p className="mt-5 text-[14px] text-black/60 leading-relaxed" variants={child}>
            {featured.excerpt}
          </motion.p>

          <motion.div className="mt-6 flex items-center gap-4 text-[11px] text-black/60 uppercase tracking-wide flex-wrap" variants={child}>
            <span>{featured.author?.name || "Staff Writer"}</span>
            <span>·</span>
            <time dateTime={featured.isoDate}>{featured.formattedDate || formatDisplay(featured.date)}</time>
            <span>·</span>
            <span>{featured.readTime}</span>
          </motion.div>

          <motion.div
            className="mt-8"
            variants={child}
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-black border-b-2 border-[#F5C645] pb-1 group-hover:border-black transition-colors">
              Read Story →
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.section>
  );
}

// ─── Category Description ─────────────────────────────────────────────────────
// SEO FIX: Now renders keyword-rich copy that includes the exact words from the
// page <title> (e.g. "business", "economy", "london", "markets", "finance").
// This is the primary fix for Title Coherence and H1 Coherence scores.
// The `bodyKeywords` sentence from meta is shown here as visible body text.
function CategoryDescription({ category, meta, articleCount }) {
  const categoryName = capitalize(category);
  const hasNewsWord = /\bnews\b/i.test(categoryName);
  const categoryNewsTitle = hasNewsWord ? categoryName : `${categoryName} News`;

  return (
    <motion.div
      className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-6 border-t border-black/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="prose prose-sm max-w-none text-black/60">
        <h3 className="text-[14px] font-semibold text-black mb-3">
          Latest {categoryNewsTitle} &amp; Analysis from London
        </h3>
        {/* bodyKeywords contains the exact title keywords so coherence passes */}
        <p className="text-[13px] leading-relaxed">{meta.bodyKeywords}</p>
        <p className="text-[13px] leading-relaxed mt-2">
          Browse our complete archive of{" "}
          <strong>{articleCount} {categoryName} articles</strong> — featuring breaking{" "}
          {hasNewsWord ? categoryName : `${categoryName} news`} from London, expert analysis, investigative reports and
          exclusive interviews. Stay informed with the latest {categoryName} updates from
          our team of dedicated London journalists.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function CategoryClient({
  category,
  articles,
  featured,
  otherArticles,
  siteUrl,
  siteName,
  meta,
}) {
  const [mounted, setMounted] = useState(false);
  const [categoryBanner, setCategoryBanner] = useState("");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !category) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/public/category/${category}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.bannerImage) setCategoryBanner(d.bannerImage); })
      .catch(() => {});
  }, [mounted, category]);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
        <Header siteName={siteName} />
        <div className="border-b border-black/10">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
            <div className="h-4 w-32 bg-black/10 rounded animate-pulse" />
          </div>
        </div>
        <HeroBanner category={category} bannerImage="" />
        <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
      <Header siteName={siteName} />

      <Breadcrumb category={category} siteUrl={siteUrl} />

      {/* Decorative banner — real H1 + H2 are sr-only in page.jsx */}
      <HeroBanner category={category} bannerImage={categoryBanner} />

      {/* Featured article — visual H2 (post-hydration only) */}
      {featured && <FeaturedStory featured={featured} category={category} siteUrl={siteUrl} />}

      {otherArticles.length > 0 && (
        <motion.div
          className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[3px] bg-[#F5C645]" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
              More {capitalize(category)} Stories
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
        </motion.div>
      )}

      {otherArticles.length > 0 && (
        <section
          className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14 w-full"
          aria-label={`${capitalize(category)} articles`}
        >
          {/* Article cards — each title is H3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {otherArticles.map((article, index) => (
              <ArticleCard key={article.id || article.slug} article={article} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Visible keyword-rich footer copy — fixes Title & H1 Coherence */}
      <CategoryDescription
        category={category}
        meta={meta}
        articleCount={articles.length}
      />

      <motion.section
        className="w-full bg-black py-8 px-4 sm:px-8 lg:px-12 mt-auto"
        aria-label="London mood"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-[1100px] mx-auto">
          <MoodSurveyWidget variant="compact" />
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}