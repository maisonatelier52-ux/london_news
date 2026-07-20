// app/category/[slug]/page.jsx
//
// New taxonomy-driven desk-listing route (sits ALONGSIDE the legacy
// app/[category]/page.jsx desk pages — does not replace them). Looks up a
// desk by slug via GET /api/public/desk/:slug and lists its own articles
// plus its child topics. This file was missing entirely, which is why
// /category/business 404'd.

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

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

const formatDisplay = (dateStr) =>
  new Date(toIso(dateStr)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

async function getDeskData(slug) {
  try {
    const res = await fetch(`${API_BASE}/public/desk/${slug.toLowerCase()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching desk data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getDeskData(slug);
  if (!data?.desk) {
    return { title: `Not Found | ${SITE_NAME}`, robots: { index: false } };
  }
  const { desk } = data;
  const title = desk.seoTitle || `${desk.name} | ${SITE_NAME}`;
  const description = desk.seoDescription || desk.description || `The latest ${desk.name} stories from ${SITE_NAME}.`;
  // The legacy desk-prefixed route (e.g. /business) stays canonical per the
  // SEO/crawl contract — this taxonomy route is additive, not a replacement.
  const canonicalUrl = `${SITE_URL}/category/${desk.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, siteName: SITE_NAME, type: "website" },
  };
}

export default async function CategoryDeskPage({ params }) {
  const { slug } = await params;
  const data = await getDeskData(slug);
  if (!data?.desk) notFound();

  const { desk, topics, articles } = data;

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <h1 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-3">
          {desk.name}
        </h1>
        {desk.description && (
          <p className="text-[15px] text-black/60 max-w-2xl mb-6">{desk.description}</p>
        )}

        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="text-[12px] uppercase tracking-wide px-3 py-1.5 rounded-full border border-black/10 text-[#4a5a6a] hover:border-[#1B2435] hover:text-[#1B2435] transition-colors no-underline"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}

        {articles.length === 0 ? (
          <p className="text-black/50 text-sm">No stories in this desk yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/${article.category}/${article.slug}`}
                className="group flex flex-col gap-0 no-underline"
              >
                <div className="overflow-hidden h-[200px] bg-black/5 relative rounded-lg">
                  {article.image && (
                    <Image
                      src={resolveImg(article.image)}
                      alt={article.imageAlt || article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="mt-4 text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
                  {article.categoryName || desk.name}
                </span>
                <h3 className="mt-2 text-[20px] font-semibold leading-[1.15] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 text-[13px] text-black/60 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-black/60 uppercase tracking-wide">
                  <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
