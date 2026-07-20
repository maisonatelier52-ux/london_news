// app/news-sitemap.xml/route.js
// Google News Sitemap — Required for Google News & Top Stories eligibility.
// SEO Strategy: Must include only articles published in the last 48 hours.
// Must include publication_date, title, and keywords fields.
// Submit this sitemap in Google Search Console alongside the main sitemap.

export const dynamic = "force-dynamic";
export const revalidate = 900; // re-generate every 15 minutes

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function toIso(dateStr) {
  if (!dateStr) return new Date().toISOString();
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(
      `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
    ).toISOString();
  }
  return new Date(dateStr).toISOString();
}

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let articles = [];

  try {
    // Fetch recent articles — we'll filter to last 48h
    const res = await fetch(`${API_BASE}/public/latest?limit=100`, {
      cache: "no-store",
    });
    if (res.ok) articles = await res.json();
  } catch (err) {
    console.error("News sitemap: failed to fetch articles", err);
  }

  // Filter to articles published in the last 48 hours
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const recentArticles = articles.filter((article) => {
    const pub = new Date(toIso(article.date));
    return pub >= cutoff;
  });

  const items = recentArticles
    .map((article) => {
      const pubDate = toIso(article.date);
      const keywords = [
        ...(article.keywords || []),
        ...(article.tags || []),
        article.categoryName || article.category || "",
      ]
        .filter(Boolean)
        .join(", ");

      return `
  <url>
    <loc>${SITE_URL}/${escapeXml(article.category)}/${escapeXml(article.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      ${keywords ? `<news:keywords>${escapeXml(keywords)}</news:keywords>` : ""}
    </news:news>
    <image:image>
      <image:loc>${escapeXml(article.image || "")}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}