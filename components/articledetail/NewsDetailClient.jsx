// components/articledetail/NewsDetailClient.jsx
"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  FaXTwitter, FaFacebookF, FaWhatsapp,
  FaMedium, FaQuora, FaRedditAlien
} from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// ─── Share Bar Component ─────────────────────────────────────────────────────
function ShareBar({ vertical = false, url = "", title = "" }) {
  const enc = encodeURIComponent;
  const base = "flex items-center justify-center w-8 h-8 border border-black/20 hover:border-transparent transition-all duration-300 cursor-pointer rounded-full hover:scale-110";
  const wrap = vertical ? "flex flex-col gap-3" : "flex flex-row gap-3";
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className={wrap} aria-label="Share article">
      <a
        href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${base} bg-black hover:text-white`}
        title="Share on X (Twitter)"
        aria-label="Share on X"
      >
        <FaXTwitter size={14} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${base} bg-[#1877F2] hover:text-white hover:border-[#1877F2]`}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <FaFacebookF size={14} />
      </a>
      <a
        href={`https://wa.me/?text=${enc(title)}%20${enc(url)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${base} bg-[#25D366] hover:text-white hover:border-[#25D366]`}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={14} />
      </a>
      <button
        className={`${base} bg-black hover:text-white relative`}
        title="Copy link"
        aria-label="Copy article link"
        onClick={handleCopy}
      >
        {copySuccess ? (
          <span className="text-[10px] absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded whitespace-nowrap z-10">
            Copied!
          </span>
        ) : (
          <FiCopy size={14} />
        )}
      </button>
    </div>
  );
}

// ─── Body Block Component ────────────────────────────────────────────────────
function BodyBlock({ block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-[15px] sm:text-[16px] text-black/80 leading-[1.75] mb-6">{block.text}</p>;
    case "subheading":
    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      return <Tag className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4">{block.text}</Tag>;
    }
    case "pullquote":
      return (
        <blockquote className="my-10 pl-6 border-l-4 border-[#F5C645]">
          <p className="text-[20px] sm:text-[24px] font-semibold text-black leading-[1.3] tracking-[-0.01em] italic">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="mt-3 block text-[11px] uppercase tracking-[0.14em] text-black/40 not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case "image": {
      return (
        <figure className="my-10 -mx-4 sm:-mx-0">
          {block.src && (
            <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[420px]">
              <Image
                src={block.src}
                alt={block.alt || block.caption || "Article image"}
                fill
                sizes="(max-width: 780px) 100vw, 780px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
          {block.caption && (
            <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

// ─── Prev / Next Navigation ─────────────────────────────────────────────────
function PrevNextNav({ prev, next, category }) {
  return (
    <nav aria-label="Article navigation" className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      <div className="bg-[#f7f6f2] p-5 border-l-4 border-[#F5C645]">
        <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">← Previous Article</p>
        {prev ? (
          <Link
            href={`/${category}/${prev.slug}`}
            title={`Read previous: ${prev.title}`}
            className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
          >
            {prev.title}
          </Link>
        ) : (
          <p className="text-[13px] text-black/30">No previous article</p>
        )}
      </div>
      <div className="bg-[#f7f6f2] p-5 text-right border-r-4 border-[#F5C645]">
        <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">Next Article →</p>
        {next ? (
          <Link
            href={`/${category}/${next.slug}`}
            title={`Read next: ${next.title}`}
            className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
          >
            {next.title}
          </Link>
        ) : (
          <p className="text-[13px] text-black/30">No next article</p>
        )}
      </div>
    </nav>
  );
}

// ─── Site Header Component ──────────────────────────────────────────────────
function SiteHeader({ siteName = "London News" }) {
  const NAV_ITEMS = ["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business"];
  return (
    <header
      className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
      style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-[0]" />
      <div className="flex lg:hidden items-center justify-between w-full relative z-10">
        <Link href="/" title="London News - Home" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">{siteName}</Link>
        <a href="#" title="Subscribe to London News" className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline">Subscribe</a>
      </div>
      <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center relative z-10" aria-label="Main navigation">
        {NAV_ITEMS.map((n) => (
          <a
            key={n}
            href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}
            title={`Browse ${n} news`}
            className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
          >
            {n}
          </a>
        ))}
      </nav>
      <a
        href="#"
        title="Customise your news feed or subscribe"
        className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10"
      >
        Customise / Subscribe
      </a>
    </header>
  );
}

// ─── Main Client Component ──────────────────────────────────────────────────
export default function NewsDetailClient({
  article,
  prevArticle,
  nextArticle,
  relatedArticles,
  category,
  siteUrl,
  siteName,
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
      
      // Setup scroll spy for headings
      const headings = document.querySelectorAll("h2, h3");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        { rootMargin: "-100px 0px -400px 0px", threshold: 0 }
      );
      
      headings.forEach((heading) => observer.observe(heading));
      return () => headings.forEach((heading) => observer.unobserve(heading));
    }
  }, []);

  const liveShareUrl = shareUrl || `${siteUrl}/${article.category}/${article.slug}`;
  
  // Extract headings for table of contents
  const headings = article.content?.filter(block => 
    block.type === "heading" || block.type === "subheading"
  ) || [];

  return (
    <div
      className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white"
      itemScope
      itemType="https://schema.org/NewsArticle"
    >
      {/* Microdata for SEO testers - HIDDEN but present */}
      <div style={{ display: "none" }}>
        <span itemProp="headline">{article.title}</span>
        <span itemProp="description">{article.excerpt}</span>
        {article.heroImage && <span itemProp="image">{article.heroImage}</span>}
        <span itemProp="datePublished">{article.isoDate}</span>
        <span itemProp="dateModified">{article.isoDate}</span>
        <span itemProp="articleSection">{capitalize(article.category)}</span>
        <span itemProp="keywords">{article.keywords?.join(", ") || article.tags?.join(", ")}</span>
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">{article.author?.name || siteName}</span>
        </div>
        <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">{siteName}</span>
          <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <span itemProp="url">{`${siteUrl}/images/logo.webp`}</span>
          </div>
        </div>
        <div itemProp="mainEntityOfPage" itemScope itemType="https://schema.org/WebPage">
          <span itemProp="url">{`${siteUrl}/${article.category}/${article.slug}`}</span>
        </div>
      </div>

      <SiteHeader siteName={siteName} />

      {/* Breadcrumb UI */}
      <div className="border-b border-black/10">
        <nav aria-label="Breadcrumb" className="max-w-[780px] mx-auto px-4 sm:px-8 py-3">
          <ol
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40 flex-wrap"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <Link href="/" title="Go to London News homepage" className="hover:text-black transition-colors no-underline" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <Link href={`/${article.category}`} title={`Browse all ${capitalize(article.category)} articles`} className="hover:text-black transition-colors no-underline" itemProp="item">
                <span itemProp="name">{capitalize(article.category)}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <span className="text-black/60 line-clamp-1" itemProp="name">{article.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* ARTICLE HEADER */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 pt-10 lg:pt-14 w-full">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[32px] h-[3px] bg-[#F5C645]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
            {article.categoryName || capitalize(article.category)} · {article.tags?.[0] || "News"}
          </span>
        </div>

        {/* H1 - Main heading */}
        <h1
          className="font-['Poppins',sans-serif] font-semibold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.05] tracking-[-0.03em] text-black"
          itemProp="headline"
        >
          {article.title}
        </h1>

        {/* Article excerpt/description */}
        <h2 className="sr-only">Article Summary</h2>
        <p className="mt-5 text-[16px] sm:text-[18px] text-black/60 leading-[1.6] font-light" itemProp="description">
          {article.excerpt}
        </p>

        {/* Author + Date */}
        <div className="mt-6 pt-6 border-t border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {article.authorImage ? (
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image
                  src={article.authorImage}
                  alt={`${article.author?.name || "Author"} profile picture`}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                {article.authorInitials}
              </div>
            )}
            <div>
              {article.authorSlug ? (
                <Link
                  href={`/authors/${article.authorSlug}`}
                  title={`View articles by ${article.author?.name}`}
                  className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors no-underline"
                  itemProp="author"
                >
                  {article.author?.name || "Staff Writer"}
                </Link>
              ) : (
                <span className="text-[13px] font-semibold text-black" itemProp="author">
                  {article.author?.name || "Staff Writer"}
                </span>
              )}
              <p className="text-[11px] text-black/40 uppercase tracking-wide">
                {article.author?.country || "Journalist"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-black/70 uppercase tracking-wide">
            <time dateTime={article.isoDate} itemProp="datePublished">{article.formattedDate}</time>
            <span>·</span>
            <span itemProp="timeRequired">{article.readTime}</span>
          </div>
        </div>

        {/* Mobile share bar */}
        <div className="mt-5 sm:hidden">
          <ShareBar url={liveShareUrl} title={article.title} />
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="max-w-[1100px] mx-auto px-0 sm:px-8 mt-8 w-full">
        <figure className="w-full">
          <div className="w-full h-[260px] sm:h-[400px] lg:h-[560px] overflow-hidden bg-black/5 relative">
            {article.heroImage && (
              <Image
                src={article.heroImage}
                alt={article.imageAlt || article.title}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                priority
                fetchPriority="high"
                className="object-cover"
                itemProp="image"
              />
            )}
          </div>
          {article.imageAlt && (
            <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
              {article.imageAlt}
            </figcaption>
          )}
        </figure>
      </div>

      {/* ARTICLE BODY with Table of Contents */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 mt-10 lg:mt-14 w-full relative">
        {/* Table of Contents - for better SEO and UX */}
        {headings.length > 2 && (
          <div className="mb-8 p-4 bg-[#f7f6f2] rounded-lg">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/50 mb-3">Table of Contents</h3>
            <ul className="space-y-2">
              {headings.map((heading, idx) => {
                const headingId = heading.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <li key={idx}>
                    <a
                      href={`#${headingId}`}
                      className={`text-[13px] hover:text-[#F5C645] transition-colors ${activeHeading === headingId ? "text-[#F5C645] font-semibold" : "text-black/60"}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Desktop sticky share bar */}
        <div className="hidden lg:block absolute -left-16 top-0">
          <div className="sticky top-24">
            <ShareBar vertical url={liveShareUrl} title={article.title} />
          </div>
        </div>

        <div className="article-body" itemProp="articleBody">
          {article.content?.map((block, i) => {
            // Add IDs to headings for TOC linking
            if (block.type === "heading" || block.type === "subheading") {
              const headingId = block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const Tag = block.level === 2 ? "h2" : "h3";
              return (
                <Tag
                  key={i}
                  id={headingId}
                  className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4 scroll-mt-20"
                >
                  {block.text}
                </Tag>
              );
            }
            return <BodyBlock key={i} block={block} />;
          })}
        </div>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-black/20 flex flex-wrap gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50 mr-2">Tags:</span>
            {article.tags.map((tag) => (
              <span key={tag}
                className="px-3 py-1 text-[10px] uppercase tracking-[0.12em] border border-black text-black transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <PrevNextNav prev={prevArticle} next={nextArticle} category={article.category} />

        {/* Author bio section */}
        {article.author && (
          <div className="mt-4 p-6 bg-[#f7f6f2] flex gap-5 items-start">
            {article.authorImage ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src={article.authorImage}
                  alt={`${article.author.name} profile picture`}
                  fill
                  sizes="48px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[15px] font-semibold shrink-0">
                {article.authorInitials}
              </div>
            )}
            <div className="flex-1">
              {article.authorSlug ? (
                <Link
                  href={`/authors/${article.authorSlug}`}
                  title={`View all articles by ${article.author.name}`}
                  className="no-underline"
                >
                  <span className="text-[13px] font-bold text-black hover:text-[#4a5a6a] transition-colors">{article.author.name}</span>
                </Link>
              ) : (
                <span className="text-[13px] font-bold text-black">{article.author.name}</span>
              )}
              <p className="text-[11px] uppercase tracking-wide text-black/40 mb-2">
                {article.author.country || "Journalist"}
              </p>
              <p className="text-[13px] text-black/60 leading-relaxed">{article.author.bio}</p>
              {article.author.social && (
                <div className="flex gap-3 mt-3">
                  {article.author.social.twitter && (
                    <a
                      href={article.author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Follow ${article.author.name} on X (Twitter)`}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                    >
                      <FaXTwitter size={14} />
                    </a>
                  )}
                  {article.author.social.medium && (
                    <a
                      href={article.author.social.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Follow ${article.author.name} on Medium`}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                    >
                      <FaMedium size={14} />
                    </a>
                  )}
                  {article.author.social.quora && (
                    <a
                      href={article.author.social.quora}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Follow ${article.author.name} on Quora`}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#B92B27] hover:text-white hover:border-[#B92B27] transition-all duration-300"
                    >
                      <FaQuora size={14} />
                    </a>
                  )}
                  {article.author.social.reddit && (
                    <a
                      href={article.author.social.reddit}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Follow ${article.author.name} on Reddit`}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] transition-all duration-300"
                    >
                      <FaRedditAlien size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RELATED STORIES */}
      {relatedArticles?.length > 0 && (
        <section className="w-full bg-black mt-16" aria-label="Related stories">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-[40px] h-[3px] bg-[#F5C645]" />
              <h2 className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">Related Stories</h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.category}/${item.slug}`}
                  title={`Read related: ${item.title}`}
                  className="group no-underline flex flex-col gap-0"
                >
                  <div className="overflow-hidden h-[180px] bg-white/5 relative">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <span className="mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#F5C645]">
                    {item.categoryName || capitalize(item.category)}
                  </span>
                  <h3 className="mt-2 text-[16px] sm:text-[18px] font-semibold leading-[1.2] text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <time dateTime={item.isoDate || item.date} className="mt-2 text-[11px] text-white/30 uppercase tracking-wide">
                    {item.formattedDate || new Date(item.date).toLocaleDateString("en-GB")}
                  </time>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MOOD STRIP */}
      <section className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12" aria-label="London mood">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] sm:text-[15px] font-bold uppercase text-[#F5C645] tracking-wide">London's Mood Right Now</p>
            <p className="text-[11px] font-normal uppercase text-white/40 mt-1">Updated 32 minutes ago</p>
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

      <Footer />
    </div>
  );
}