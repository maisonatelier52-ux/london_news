// app/authors/[slug]/page.jsx
import AuthorClient from "@/components/authordetail/AuthorClient";
import { notFound } from "next/navigation";

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE  = process.env.NEXT_PUBLIC_API_URL   || "http://localhost:5000/api";

async function getAuthorData(slug) {
  try {
    const res = await fetch(`${API_BASE}/public/author/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getAuthorData(slug);
  const canonicalUrl = `${SITE_URL}/authors/${slug}`;

  if (!data?.author) {
    return {
      title: `Author Not Found | ${SITE_NAME}`,
      description: "This author profile does not exist.",
    };
  }

  const { author } = data;
  const title       = `${author.name} | Journalist | ${SITE_NAME}`;
  const description = author.bio?.slice(0, 155) || `Read articles by ${author.name} on ${SITE_NAME}.`;
  const rawImage    = author.profileImage || "";
  const ogImage     = rawImage.startsWith("http")
    ? rawImage
    : rawImage
      ? `${API_BASE.replace("/api", "")}${rawImage}`
      : `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
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
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url:      canonicalUrl,
      siteName: SITE_NAME,
      type:     "profile",
      locale:   "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: author.name }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [ogImage],
      site: "@londonnews",
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const data = await getAuthorData(slug);
  if (!data?.author) notFound();

  const { author } = data;
  const canonicalUrl = `${SITE_URL}/authors/${slug}`;
  const rawImage = author.profileImage || "";
  const ogImage  = rawImage.startsWith("http")
    ? rawImage
    : rawImage
      ? `${API_BASE.replace("/api", "")}${rawImage}`
      : `${SITE_URL}/og-default.jpg`;

  // ── Enhanced Person JSON-LD ────────────────────────────────────────────
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/authors/${slug}#person`,
    name: author.name,
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      url: ogImage,
    },
    description: author.bio?.slice(0, 160) || `Journalist at ${SITE_NAME}`,
    jobTitle: author.category?.name || "Journalist",
    ...(author.category?.name && {
      knowsAbout: [author.category.name, "London", "News", "Journalism"],
    }),
    worksFor: {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-GB",
    sameAs: [
      author.social?.twitter,
      author.social?.medium,
      author.social?.quora,
      author.social?.reddit,
      author.websiteLink,
    ].filter(Boolean),
  };

  // ── BreadcrumbList ─────────────────────────────────────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Authors", item: `${SITE_URL}/authors` },
      { "@type": "ListItem", position: 3, name: author.name, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/*
        NOTE: No sr-only H1 here — AuthorClient renders the single H1 (author.name).
        Having two H1s harms SEO. The JSON-LD + metadata title carry the
        "Journalist at London News" context for crawlers without duplicating H1.
      */}

      <AuthorClient
        author={data.author}
        articles={data.articles || []}
        slug={slug}
      />
    </>
  );
}