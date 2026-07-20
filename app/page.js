
// app/page.js  ← SERVER COMPONENT (no "use client")

import HomeClient from "@/components/HomeClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  title: "London News – Independent News for London | Politics, Culture & More",
  description:
    "Stay ahead with London News – your independent source for London politics, business, culture, lifestyle, technology and sport. Updated daily.",
  keywords:
    "London news, London politics, London business, London culture, London sport, UK news, independent news London",
  metadataBase: new URL(SITE_URL),

  // ── robots meta — max-image-preview:large required for Google Discover ───
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",    // critical for Discover traffic
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

  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "London News – Independent News for London",
    description:
      "Stay ahead with London News – your independent source for London politics, business, culture, lifestyle, technology and sport. Updated daily.",
    locale: "en_GB",
    images: [
      {
        url: `${SITE_URL}/images/logo-img.webp`,
        width: 1200,
        height: 630,
        alt: "London News – Your City. Your Stories.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@londonnews",
    title: "London News – Independent News for London",
    description:
      "Stay ahead with London News – your independent source for London politics, business, culture, lifestyle, technology and sport.",
    images: [`${SITE_URL}/images/logo-img.webp`],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function Home() {
  return <HomeClient />;
}