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

async function getTopicData(slug) {
  try {
    const res = await fetch(`${API_BASE}/public/topic/${slug.toLowerCase()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching topic data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getTopicData(slug);
  if (!data?.topic) {
    return { title: `Not Found | ${SITE_NAME}`, robots: { index: false } };
  }
  const { topic, desk } = data;
  const title = topic.seoTitle || `${topic.name}${desk ? ` — ${desk.name}` : ""} | ${SITE_NAME}`;
  const description = topic.seoDescription || topic.description || `The latest ${topic.name} stories from ${SITE_NAME}.`;
  const canonicalUrl = `${SITE_URL}/topics/${topic.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, siteName: SITE_NAME, type: "website" },
  };
}

export default async function TopicPage({ params }) {
  const { slug } = await params;
  const data = await getTopicData(slug);
  if (!data?.topic) notFound();

  const { topic, desk, articles } = data;

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {desk && (
          <Link
            href={`/category/${desk.slug}`}
            className="text-[12px] uppercase tracking-wide text-[#4a5a6a] hover:text-[#1B2435] mb-3 inline-block"
          >
            {desk.name}
          </Link>
        )}
        <h1 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-3">
          {topic.name}
        </h1>
        {topic.description && (
          <p className="text-[15px] text-black/60 max-w-2xl mb-12">{topic.description}</p>
        )}

        {articles.length === 0 ? (
          <p className="text-black/50 text-sm">No stories tagged with this topic yet.</p>
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
                  {article.categoryName || topic.name}
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

