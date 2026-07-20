import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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

async function searchArticles(q) {
  if (!q) return [];
  try {
    const res = await fetch(`${API_BASE}/public/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
}

export async function generateMetadata({ searchParams }) {
  const { q = "" } = await searchParams;
  const title = q ? `"${q}" — Search Results | ${SITE_NAME}` : `Search | ${SITE_NAME}`;
  return {
    title,
    description: `Search ${SITE_NAME} for articles, stories and coverage.`,
    alternates: { canonical: `${SITE_URL}/search${q ? `?q=${encodeURIComponent(q)}` : ""}` },
    robots: { index: false }, // search results pages shouldn't be indexed
  };
}

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const results = await searchArticles(q);

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-6">
          Search
        </h1>

        <SearchForm initialQuery={q} />

        {q && (
          <p className="mt-8 mb-6 text-[13px] text-black/50">
            {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
          </p>
        )}

        <div className="flex flex-col divide-y divide-black/10">
          {results.map((article) => (
            <Link
              key={article.id}
              href={`/${article.category}/${article.slug}`}
              className="group py-6 flex flex-col gap-1 no-underline"
            >
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
                {article.categoryName || article.category}
              </span>
              <h2 className="text-[19px] font-semibold text-black tracking-[-0.01em] group-hover:text-[#4a5a6a] transition-colors">
                {article.title}
              </h2>
              <p className="text-[13px] text-black/60 line-clamp-2">{article.excerpt}</p>
              <time className="text-[11px] text-black/40 uppercase tracking-wide mt-1" dateTime={toIso(article.date)}>
                {formatDisplay(article.date)}
              </time>
            </Link>
          ))}
        </div>

        {q && results.length === 0 && (
          <p className="text-black/50 text-sm">No stories matched your search.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

