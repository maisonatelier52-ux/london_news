// app/page/[pageSlug]/page.jsx
// UPDATED June 2026 — SEO Strategy:
// • max-image-preview:large robots meta
// • inLanguage on WebPage schema
// • Enhanced BreadcrumbList
// • Trust-signal pages (corrections, editorial) get boosted priority signals

import { notFound } from "next/navigation";
import PageClient from "@/components/PageClient";

const SITE_URL  = "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE  = process.env.NEXT_PUBLIC_API_URL   || "http://localhost:5000/api";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo-img.webp`;

// Trust-signal pages — important for E-E-A-T
const TRUST_PAGES = new Set([
  "about", "contact", "team", "corrections-policy", "editorial-policy",
  "source-methodology", "ownership-and-funding", "right-of-reply",
  "advertising-policy", "privacy-policy", "terms-and-conditions", "legal",
]);

async function getPageData(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/public/${slug}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch page: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { pageSlug } = await params;
  const page = await getPageData(pageSlug);
  const canonicalUrl = `${SITE_URL}/page/${pageSlug}`;

  if (!page) {
    return {
      title: `Page Not Found | ${SITE_NAME}`,
      description: "The requested page could not be found.",
      robots: { index: false },
    };
  }

  const pageTitle   = page.seoTitle || `${page.title} | ${SITE_NAME}`;
  const description = page.seoDescription || `Learn more about ${page.title} at ${SITE_NAME}`;
  const rawImage    = page.seoImage || page.ogImage || DEFAULT_OG_IMAGE;
  const ogImage     = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;
  const ogAlt       = page.heroImageAlt || page.title || SITE_NAME;

  // Trust-signal pages get full indexing; others standard
  const isTrustPage = TRUST_PAGES.has(pageSlug);

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
      site: "@londonnews",
    },
  };
}

export default async function Page({ params }) {
  const { pageSlug } = await params;
  const page = await getPageData(pageSlug);
  if (!page || !page.isPublished) notFound();

  // ── WebPage / AboutPage JSON-LD ────────────────────────────────────────
  const schemaType = pageSlug === "about" ? "AboutPage"
    : pageSlug === "contact" ? "ContactPage"
    : "WebPage";

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${SITE_URL}/page/${pageSlug}#webpage`,
    name: page.seoTitle || page.title,
    description: page.seoDescription || "",
    url: `${SITE_URL}/page/${pageSlug}`,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(page.lastUpdated && { dateModified: new Date(page.lastUpdated).toISOString() }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `${SITE_URL}/page/${pageSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageClient page={page} siteUrl={SITE_URL} siteName={SITE_NAME} />
    </>
  );
}