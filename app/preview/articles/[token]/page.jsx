import { notFound } from "next/navigation";
import NewsDetailClient from "@/components/articledetail/NewsDetailClient";

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

async function getPreviewArticle(token) {
  try {
    const res = await fetch(`${API_BASE}/articles/preview/${token}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching preview article:", error);
    return null;
  }
}

// Never let a preview page get indexed or crawled.
export async function generateMetadata() {
  return { title: `Preview | ${SITE_NAME}`, robots: { index: false, follow: false } };
}

export default async function ArticlePreviewPage({ params }) {
  const { token } = await params;
  const data = await getPreviewArticle(token);
  if (!data?.article) notFound();

  const { article } = data;

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

  return (
    <>
      {/* Sticky preview banner — always visible regardless of publish state */}
      <div className="sticky top-0 z-[200] w-full bg-[#1B2435] text-white text-center py-2 text-[12px] font-semibold uppercase tracking-wide">
        Preview — {article.isPublished ? "currently live" : "not yet published"}
        {article.scheduledPublishAt && (
          <span className="font-normal normal-case"> · scheduled for {new Date(article.scheduledPublishAt).toLocaleString("en-GB")}</span>
        )}
      </div>

      <NewsDetailClient
        article={articleData}
        prevArticle={null}
        nextArticle={null}
        relatedArticles={[]}
        category={article.category}
        siteUrl={SITE_URL}
        siteName={SITE_NAME}
      />
    </>
  );
}

