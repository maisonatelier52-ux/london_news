// app/[category]/page.jsx
// UPDATED June 2026 — SEO Strategy:
// • max-image-preview:large for Google Discover
// • inLanguage on CollectionPage schema
// • Entity signals via about/about[].name
// • BLUF sr-only paragraph for AI Overview
// • robots meta max-snippet:-1

import CategoryClient from "@/components/categorydetail/CategoryClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

const toIso = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).toISOString();
  }
  return new Date(dateStr).toISOString();
};

const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE.replace("/api", "")}${src}`;
};

const generateCategoryMeta = (categoryName, articleCount = 0) => {
  const displayName = capitalize(categoryName);
  const lowerName = categoryName.toLowerCase();
  const D = displayName;
  const S = SITE_NAME;

  const patterns = [
    { keywords: ["politic", "election", "government", "parliament"], type: "political" },
    { keywords: ["business", "finance", "market", "economy", "stock"], type: "financial" },
    { keywords: ["tech", "technology", "digital", "software", "app"], type: "technology" },
    { keywords: ["health", "wellness", "medical", "fitness", "diet"], type: "health" },
    { keywords: ["sport", "football", "cricket", "tennis", "olympic"], type: "sports" },
    { keywords: ["entertain", "movie", "film", "music", "celebrity"], type: "entertainment" },
    { keywords: ["travel", "tourism", "holiday", "destination"], type: "travel" },
    { keywords: ["food", "restaurant", "recipe", "cuisine", "cooking"], type: "food" },
    { keywords: ["fashion", "style", "beauty", "clothing"], type: "fashion" },
    { keywords: ["education", "school", "university", "college"], type: "education" },
    { keywords: ["environment", "climate", "green", "nature", "ecology"], type: "environment" },
    { keywords: ["art", "gallery", "museum", "exhibition", "creative"], type: "art" },
    { keywords: ["science", "research", "discovery", "innovation", "space"], type: "science" },
  ];

  let categoryType = "default";
  for (const p of patterns) {
    if (p.keywords.some(k => lowerName.includes(k))) { categoryType = p.type; break; }
  }

  const titles = {
    default:       `${D} News — Latest Stories & Analysis | ${S}`,
    political:     `${D} News — Politics, Elections & Government | ${S}`,
    financial:     `${D} News — Markets, Finance & Economy | ${S}`,
    technology:    `${D} News — Tech Trends & Innovation | ${S}`,
    health:        `${D} News — Wellness, Medical & Fitness | ${S}`,
    sports:        `${D} News — Scores, Transfers & Highlights | ${S}`,
    entertainment: `${D} News — Movies, Music & Celebrity | ${S}`,
    travel:        `${D} News — Destinations & Travel Tips | ${S}`,
    food:          `${D} News — Recipes & Restaurant Reviews | ${S}`,
    fashion:       `${D} News — Style, Runway & Beauty | ${S}`,
    education:     `${D} News — Schools, Unis & Learning | ${S}`,
    environment:   `${D} News — Climate, Green & Sustainability | ${S}`,
    art:           `${D} News — Galleries, Exhibitions & Culture | ${S}`,
    science:       `${D} News — Research, Discovery & Innovation | ${S}`,
  };

  const descriptions = {
    default:       `The latest ${D} news, analysis and breaking stories from ${S}. Independent reporting updated daily.`,
    political:     `${D} news: elections, policy, government affairs and political analysis from ${S}'s journalists.`,
    financial:     `${D} news: market analysis, corporate updates, financial trends and economic insights from ${S}.`,
    technology:    `${D} news: product launches, tech trends, digital innovation and breakthroughs from ${S}.`,
    health:        `${D} news: medical research, wellness tips, fitness advice and healthy living from ${S}.`,
    sports:        `${D} news: live scores, match reports, transfers and expert analysis from ${S}'s sports desk.`,
    entertainment: `${D} news: movies, TV, music releases, celebrity updates and pop culture from ${S}.`,
    travel:        `${D} news: destination guides, travel tips, hotel reviews and adventure stories from ${S}.`,
    food:          `${D} news: recipes, restaurant reviews, chef interviews and culinary trends from ${S}.`,
    fashion:       `${D} news: runway shows, style trends, designer interviews and beauty tips from ${S}.`,
    education:     `${D} news: schools, universities, online learning and education stories from ${S}.`,
    environment:   `${D} news: climate action, sustainability, green initiatives and environmental stories from ${S}.`,
    art:           `${D} news: gallery openings, exhibitions, artist interviews and creative culture from ${S}.`,
    science:       `${D} news: scientific discoveries, research breakthroughs and technology innovation from ${S}.`,
  };

  const keywords = {
    default:       `${lowerName} news, latest ${lowerName}, ${lowerName} headlines, breaking news, ${S.toLowerCase()}`,
    political:     `${lowerName} news, UK ${lowerName}, elections, parliament, government, London ${lowerName}`,
    financial:     `${lowerName} news, financial markets, UK economy, corporate news, London ${lowerName}`,
    technology:    `${lowerName} news, tech trends, digital innovation, AI, London tech`,
    health:        `${lowerName} news, wellness, medical research, fitness, London health`,
    sports:        `${lowerName} news, live scores, match reports, transfers, London sports`,
    entertainment: `${lowerName} news, movies, music, celebrities, London entertainment`,
    travel:        `${lowerName} news, destinations, travel tips, hotels, London travel`,
    food:          `${lowerName} news, recipes, restaurants, food trends, London food`,
    fashion:       `${lowerName} news, style trends, runway, London fashion`,
    education:     `${lowerName} news, schools, universities, online courses, London education`,
    environment:   `${lowerName} news, climate change, sustainability, green energy, London environment`,
    art:           `${lowerName} news, galleries, exhibitions, London art scene`,
    science:       `${lowerName} news, research, discoveries, London science`,
  };

  const bodyKeywords = {
    default:       `Independent ${D} news and analysis from London. Our journalists cover the latest ${lowerName} headlines, breaking stories and in-depth reports every day.`,
    political:     `Independent ${D} news from London covering elections, government policy and parliament. Our journalists deliver the latest politics headlines and breaking stories daily.`,
    financial:     `Independent ${D} news from London covering financial markets, the UK economy and corporate business. Expert analysis of market trends, finance stories and economic news.`,
    technology:    `Independent ${D} news from London covering the latest tech trends, digital innovation and product launches. Breaking technology news and analysis from our London desk.`,
    health:        `Independent ${D} news from London covering medical research, wellness and fitness. Breaking health stories and expert analysis updated daily by our London journalists.`,
    sports:        `Independent ${D} news from London with live scores, match reports and transfer updates. Breaking sport headlines and expert analysis from our London sports desk.`,
    entertainment: `Independent ${D} news from London covering movies, music, TV and celebrity. The latest entertainment headlines and pop culture stories updated daily.`,
    travel:        `Independent ${D} news from London with destination guides, hotel reviews and travel tips. Breaking travel stories and holiday inspiration from our London journalists.`,
    food:          `Independent ${D} news from London covering recipes, restaurant reviews and culinary trends. The latest food and drink stories from our London journalists updated daily.`,
    fashion:       `Independent ${D} news from London covering runway shows, style trends and beauty. The latest fashion and design stories from our London journalists updated daily.`,
    education:     `Independent ${D} news from London covering schools, universities and online learning. The latest education stories and expert analysis from our London journalists.`,
    environment:   `Independent ${D} news from London covering climate change, green energy and sustainability. Latest environmental stories and analysis from our London journalists.`,
    art:           `Independent ${D} news from London covering gallery openings, exhibitions and the creative arts. The latest art and culture stories from our London journalists.`,
    science:       `Independent ${D} news from London covering scientific research, discoveries and innovation. Breaking science stories and expert analysis updated daily.`,
  };

  return {
    title:        titles[categoryType]        || titles.default,
    description:  descriptions[categoryType]  || descriptions.default,
    keywords:     keywords[categoryType]      || keywords.default,
    bodyKeywords: bodyKeywords[categoryType]  || bodyKeywords.default,
    displayName,
    categoryType,
  };
};

async function getCategoryData(category) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const articlesRes = await fetch(
      `${baseUrl}/public/articles/${category.toLowerCase()}`,
      { cache: 'no-store' }
    );
    if (!articlesRes.ok) {
      if (articlesRes.status === 404) return null;
      throw new Error(`Failed to fetch articles: ${articlesRes.status}`);
    }
    const articles = await articlesRes.json();

    let categoryMeta = null;
    try {
      const metaRes = await fetch(
        `${baseUrl}/public/categories/${category.toLowerCase()}`,
        { cache: 'no-store' }
      );
      if (metaRes.ok) categoryMeta = await metaRes.json();
    } catch {}

    return { articles: Array.isArray(articles) ? articles : [], categoryMeta };
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const normalizedCategory = category?.toLowerCase() || "";
  const categoryData = await getCategoryData(normalizedCategory);
  const articleCount = categoryData?.articles?.length || 0;
  const meta = generateCategoryMeta(normalizedCategory, articleCount);

  if (categoryData?.categoryMeta) {
    const cm = categoryData.categoryMeta;
    if (cm.metaTitle || cm.title) meta.title = cm.metaTitle || cm.title;
    if (cm.metaDescription || cm.description) {
      const d = cm.metaDescription || cm.description;
      meta.description = d.length <= 160 ? d : d.slice(0, 157) + "…";
    }
    if (cm.keywords) meta.keywords = cm.keywords;
  }

  const canonicalUrl = `${SITE_URL}/${normalizedCategory}`;
  const ogImage = `${SITE_URL}/images/logo-img.webp`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
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
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${meta.displayName} News — ${SITE_NAME}` }],
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
      creator: "@londonnews",
      site: "@londonnews",
    },
  };
}

export async function generateStaticParams() { return []; }

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const normalizedCategory = category?.toLowerCase() || "";

  const categoryData = await getCategoryData(normalizedCategory);
  if (!categoryData?.articles?.length) notFound();

  const articles = categoryData.articles;
  const categoryMeta = categoryData.categoryMeta;

  const processedArticles = articles.map(article => ({
    ...article,
    resolvedImage: resolveImg(article.image),
    isoDate: toIso(article.date),
    formattedDate: new Date(toIso(article.date)).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    }),
  }));

  const featured = processedArticles[0] || null;
  const otherArticles = processedArticles.slice(1);

  const meta = generateCategoryMeta(normalizedCategory, articles.length);
  if (categoryMeta) {
    meta.title       = categoryMeta.metaTitle || categoryMeta.title || meta.title;
    const rawDesc    = categoryMeta.metaDescription || categoryMeta.description;
    if (rawDesc) meta.description = rawDesc.length <= 160 ? rawDesc : rawDesc.slice(0, 157) + "…";
    meta.keywords    = categoryMeta.keywords || meta.keywords;
    meta.displayName = categoryMeta.displayName || categoryMeta.name || capitalize(normalizedCategory);
  }

  // ── CollectionPage JSON-LD ─────────────────────────────────────────────
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/${normalizedCategory}#collectionpage`,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/${normalizedCategory}`,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: { "@type": "Thing", name: meta.displayName },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: processedArticles.length,
      itemListElement: processedArticles.slice(0, 5).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/${normalizedCategory}/${a.slug}`,
        item: {
          "@type": "NewsArticle",
          headline: a.title,
          datePublished: a.isoDate,
          image: a.resolvedImage || `${SITE_URL}/images/og-default.webp`,
          author: a.author
            ? { "@type": "Person", name: a.author.name }
            : { "@type": "Organization", name: SITE_NAME },
          publisher: {
            "@type": "NewsMediaOrganization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${normalizedCategory}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${meta.displayName} News`,
        item: `${SITE_URL}/${normalizedCategory}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Real H1 for crawlers */}
      <h1 className="sr-only">{meta.title.split(" | ")[0]}</h1>

      {/*
        BLUF sr-only paragraph — complete answer in first 100 words
        for AI Overview citation probability.
      */}
      <div className="sr-only">
        <h2>Latest {meta.displayName} News &amp; Analysis from London</h2>
        <p>{meta.bodyKeywords}</p>
        <p>{meta.description}</p>
        {featured && (
          <>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
          </>
        )}
      </div>

      <CategoryClient
        category={normalizedCategory}
        articles={processedArticles}
        featured={featured}
        otherArticles={otherArticles}
        siteUrl={SITE_URL}
        siteName={SITE_NAME}
        meta={meta}
      />
    </>
  );
}