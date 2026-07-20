// app/[category]/[slug]/page.jsx
// UPDATED June 2026 — SEO Strategy:
// • max-image-preview:large for Google Discover
// • Enhanced NewsArticle schema (inLanguage, about, mentions, isAccessibleForFree)
// • FAQPage schema when article has FAQ/subheading blocks
// • Full @graph BreadcrumbList
// • BLUF sr-only paragraph for AI Overview citation
// • Neutral robots meta with max-snippet:-1

import NewsDetailClient from "@/components/articledetail/NewsDetailClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

const formatDisplay = (dateStr) =>
  new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

async function getArticleData(slug, category) {
  try {
    const res = await fetch(`${API_BASE}/public/articles/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch article: ${res.status}`);
    }
    const data = await res.json();
    if (data.article?.category?.toLowerCase() !== category.toLowerCase()) return null;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const data = await getArticleData(slug, category);

  if (!data?.article) {
    return {
      title: "Article Not Found | London News",
      description: "The requested article could not be found.",
      robots: { index: false },
    };
  }

  const article = data.article;
  const canonicalUrl = `${SITE_URL}/${article.category}/${article.slug}`;
  const articleImage = article.image ? resolveImg(article.image) : `${SITE_URL}/images/logo-img.webp`;
  const metaTitle = article.metaTitle || `${article.title} | ${capitalize(article.category)} | ${SITE_NAME}`;
  const metaDesc = article.metaDescription || article.excerpt || "";

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: article.keywords?.join(", ") || article.tags?.join(", ") || "",
    authors: [{ name: article.author?.name || SITE_NAME }],
    // ── robots meta — max-image-preview:large for Google Discover ────────
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: articleImage, width: 1200, height: 630, alt: article.imageAlt || article.title }],
      type: "article",
      publishedTime: toIso(article.date),
      modifiedTime: toIso(article.date),
      section: capitalize(article.category),
      tags: article.tags,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [articleImage],
      creator: "@londonnews",
      site: "@londonnews",
    },
  };
}

export default async function NewsDetailPage({ params }) {
  const { category, slug } = await params;
  const data = await getArticleData(slug, category);
  if (!data?.article) notFound();

  const { article, prevArticle, nextArticle, related } = data;

  const articleData = {
    ...article,
    formattedDate: formatDisplay(article.date),
    isoDate: toIso(article.date),
    heroImage: resolveImg(article.image),
    authorImage: article.author?.profileImage ? resolveImg(article.author.profileImage) : null,
    authorInitials: article.author?.name?.split(" ").map((n) => n[0]).join("") || "LN",
    authorSlug: article.author?.slug || null,
    content: article.content || [],
    tags: article.tags || [],
    keywords: article.keywords || [],
  };

  const prevData = prevArticle ? { ...prevArticle, image: resolveImg(prevArticle.image) } : null;
  const nextData = nextArticle ? { ...nextArticle, image: resolveImg(nextArticle.image) } : null;
  const relatedData = (related || []).map(item => ({ ...item, image: resolveImg(item.image) }));

  // ── Extract entities from tags/keywords for schema ────────────────────
  const entityMentions = [...(article.tags || []), ...(article.keywords || [])]
    .slice(0, 5)
    .map(name => ({ "@type": "Thing", name }));

  // ── Extract FAQ blocks for FAQPage schema ─────────────────────────────
  const subheadingBlocks = (article.content || []).filter(
    b => b.type === "subheading" || (b.type === "heading" && b.level === 2)
  );

  // ── Build BLUF summary (first paragraph text for AI Overview) ─────────
  const firstParagraph = (article.content || []).find(b => b.type === "paragraph");
  const blufText = firstParagraph?.text || article.excerpt || "";

  // ── NewsArticle JSON-LD ───────────────────────────────────────────────
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${SITE_URL}/${article.category}/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    image: [
      {
        "@type": "ImageObject",
        url: articleData.heroImage,
        width: 1200,
        height: 630,
      },
    ],
    datePublished: articleData.isoDate,
    // dateModified only included on meaningful updates — omit if same as published
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.name,
          url: article.author.slug
            ? `${SITE_URL}/authors/${article.author.slug}`
            : undefined,
        }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.webp`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${article.category}/${article.slug}`,
    },
    articleSection: capitalize(article.category),
    keywords: article.keywords?.join(", ") || article.tags?.join(", ") || "",
    url: `${SITE_URL}/${article.category}/${article.slug}`,
    // ── June 2026 additions ──────────────────────────────────────────────
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    // Entity signals for Google's knowledge graph
    ...(entityMentions.length > 0 && {
      about: [{ "@type": "Thing", name: capitalize(article.category) }],
      mentions: entityMentions,
    }),
  };

  // ── BreadcrumbList JSON-LD ─────────────────────────────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${article.category}/${article.slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${capitalize(article.category)} News`,
        item: `${SITE_URL}/${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/${article.category}/${article.slug}`,
      },
    ],
  };

  // ── FAQPage schema — only if article has 2+ subheadings ──────────────
  const faqJsonLd =
    subheadingBlocks.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: subheadingBlocks.slice(0, 5).map((block, i) => {
            // Find the paragraph immediately after this subheading
            const blockIdx = (article.content || []).findIndex(b => b === block);
            const nextPara = (article.content || [])
              .slice(blockIdx + 1)
              .find(b => b.type === "paragraph");
            return {
              "@type": "Question",
              name: block.text,
              acceptedAnswer: {
                "@type": "Answer",
                text: nextPara?.text || block.text,
              },
            };
          }),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/*
        BLUF — Bottom Line Up Front: sr-only paragraph with the article's
        first answer in the first 100 words. AI Overview systems prefer
        pages that put a complete answer near the top of the page.
      */}
      <div className="sr-only">
        <p>{blufText}</p>
      </div>

      <NewsDetailClient
        article={articleData}
        prevArticle={prevData}
        nextArticle={nextData}
        relatedArticles={relatedData}
        category={article.category}
        siteUrl={SITE_URL}
        siteName={SITE_NAME}
      />
    </>
  );
}