

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export default async function sitemap() {
//   const urls = [];

//   // ── 1. Static pages ──────────────────────────────────────────────────────
//   urls.push({
//     url: SITE_URL,
//     lastModified: new Date(),
//     changeFrequency: "daily",
//     priority: 1.0,
//   });

//   // ── 2. Category pages ─────────────────────────────────────────────────────
//   let categories = [];
//   try {
//     const res = await fetch(`${API_BASE}/public/categories`, {
//       next: { revalidate: 3600 },
//     });
//     if (res.ok) categories = await res.json();
//   } catch (err) {
//     console.error("Sitemap: failed to fetch categories", err);
//   }

//   for (const cat of categories) {
//     urls.push({
//       url: `${SITE_URL}/${cat.slug}`,
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     });
//   }

//   // ── 3. Article pages ──────────────────────────────────────────────────────
//   let articles = [];
//   try {
//     const res = await fetch(`${API_BASE}/public/latest?limit=200`, {
//       next: { revalidate: 1800 },
//     });
//     if (res.ok) articles = await res.json();
//   } catch (err) {
//     console.error("Sitemap: failed to fetch articles", err);
//   }

//   for (const article of articles) {
//     let lastMod = new Date();
//     if (article.date) {
//       if (article.date.includes("/")) {
//         const [d, m, y] = article.date.split("/");
//         lastMod = new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
//       } else {
//         lastMod = new Date(article.date);
//       }
//     }

//     urls.push({
//       url: `${SITE_URL}/${article.category}/${article.slug}`,
//       lastModified: isNaN(lastMod.getTime()) ? new Date() : lastMod,
//       changeFrequency: "weekly",
//       priority: 0.6,
//     });
//   }

//   // ── 4. Dynamic Pages (created by admin - appears in footer) ────────────────
//   let pages = [];
//   try {
//     // Fetch all published pages from your API (same endpoint used by footer)
//     const res = await fetch(`${API_BASE}/pages?publishedOnly=true`, {
//       next: { revalidate: 3600 },
//     });
    
//     if (res.ok) {
//       const allPages = await res.json();
//       // Filter only published pages
//       pages = allPages.filter(page => page.isPublished !== false);
//       console.log(`Sitemap: Found ${pages.length} published pages`);
//     }
//   } catch (err) {
//     console.error("Sitemap: failed to fetch dynamic pages", err);
//   }

//   // Also fetch from public/footer endpoint to get pages that are linked in footer
//   let footerPages = [];
//   try {
//     const res = await fetch(`${API_BASE}/public/footer`, {
//       next: { revalidate: 3600 },
//     });
//     if (res.ok) {
//       const footer = await res.json();
//       // Extract all linked pages from footer columns
//       const allFooterLinks = [
//         ...(footer.column1Links || []),
//         ...(footer.column2Links || []),
//         ...(footer.column3Links || []),
//         ...(footer.column4Links || []),
//       ];
//       footerPages = allFooterLinks.filter(link => link.slug);
//       console.log(`Sitemap: Found ${footerPages.length} pages in footer`);
//     }
//   } catch (err) {
//     console.error("Sitemap: failed to fetch footer pages", err);
//   }

//   // Merge both sources (avoid duplicates)
//   const allPagesMap = new Map();
  
//   // Add from pages API
//   for (const page of pages) {
//     allPagesMap.set(page.slug, {
//       slug: page.slug,
//       template: page.template,
//       lastModified: page.updatedAt || page.lastUpdated || new Date(),
//     });
//   }
  
//   // Add from footer links (if not already in map)
//   for (const link of footerPages) {
//     if (!allPagesMap.has(link.slug)) {
//       allPagesMap.set(link.slug, {
//         slug: link.slug,
//         template: "unknown",
//         lastModified: new Date(),
//       });
//     }
//   }

//   // Generate sitemap entries for each page
//   for (const [slug, pageData] of allPagesMap) {
//     // Skip if slug is empty
//     if (!slug) continue;
    
//     // Determine priority based on page type
//     let priority = 0.7;
//     let changeFrequency = "weekly";
    
//     if (slug === "about" || slug === "contact") {
//       priority = 0.9;
//       changeFrequency = "monthly";
//     } else if (slug === "privacy-policy" || slug === "terms-and-conditions" || slug === "legal") {
//       priority = 0.6;
//       changeFrequency = "monthly";
//     } else if (slug === "advertising-policy" || slug === "corrections-policy" || slug === "editorial-policy") {
//       priority = 0.6;
//       changeFrequency = "monthly";
//     } else if (slug === "right-of-reply" || slug === "source-methodology" || slug === "ownership-and-funding") {
//       priority = 0.6;
//       changeFrequency = "monthly";
//     } else if (slug === "careers") {
//       priority = 0.5;
//       changeFrequency = "weekly";
//     } else if (slug === "team") {
//       priority = 0.7;
//       changeFrequency = "weekly";
//     }
    
//     urls.push({
//       url: `${SITE_URL}/page/${slug}`,
//       lastModified: new Date(pageData.lastModified),
//       changeFrequency: changeFrequency,
//       priority: priority,
//     });
//   }

//   return urls;
// }

// app/sitemap.js
// UPDATED June 2026 — SEO Strategy Requirements:
// - General sitemap: all pages, categories, articles, authors, static pages
// - News sitemap is separate: app/news-sitemap.js (last 48h articles only)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default async function sitemap() {
  const urls = [];

  // ── 1. Static pages ──────────────────────────────────────────────────────
  urls.push({
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // ── 2. Category pages ─────────────────────────────────────────────────────
  let categories = [];
  try {
    const res = await fetch(`${API_BASE}/public/categories`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) categories = await res.json();
  } catch (err) {
    console.error("Sitemap: failed to fetch categories", err);
  }

  // Legacy single-segment URLs (e.g. /business) remain canonical. A desk
  // always gets one, at its own slug (or its legacySlug alias, e.g. the
  // "Culture" desk answering at /entertainment instead of /culture). A
  // topic only gets one when it has an explicit legacySlug alias set (e.g.
  // "Crime & Courts" -> /crime, "Weather" -> /weather) — most topics (like
  // "Markets") have no legacy route of their own and are reached only via
  // /topics/[slug].
  const desks = categories.filter((c) => c.type !== "topic");
  const topics = categories.filter((c) => c.type === "topic");
  const aliasedTopics = topics.filter((c) => c.legacySlug);

  for (const cat of [...desks, ...aliasedTopics]) {
    urls.push({
      url: `${SITE_URL}/${cat.legacySlug || cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // ── 2b. New taxonomy routes (additive, non-canonical) ───────────────────
  // /sections — desk + topic index
  urls.push({
    url: `${SITE_URL}/sections`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  // /category/[slug] — same desks, new taxonomy-driven URL
  for (const desk of desks) {
    urls.push({
      url: `${SITE_URL}/category/${desk.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    });
  }

  // /topics/[slug]
  for (const topic of topics) {
    urls.push({
      url: `${SITE_URL}/topics/${topic.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    });
  }

  // ── 2c. Classifieds ───────────────────────────────────────────────────────
  urls.push({
    url: `${SITE_URL}/classifieds`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.5,
  });

  let classifieds = [];
  try {
    const res = await fetch(`${API_BASE}/classifieds?limit=500`, {
      next: { revalidate: 1800 },
    });
    if (res.ok) {
      const data = await res.json();
      classifieds = Array.isArray(data) ? data : data.items || [];
    }
  } catch (err) {
    console.error("Sitemap: failed to fetch classifieds", err);
  }

  for (const listing of classifieds) {
    if (!listing.slug) continue;
    urls.push({
      url: `${SITE_URL}/classifieds/${listing.slug}`,
      lastModified: listing.updatedAt ? new Date(listing.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    });
  }

  // ── 3. Article pages ──────────────────────────────────────────────────────
  let articles = [];
  try {
    const res = await fetch(`${API_BASE}/public/latest?limit=500`, {
      next: { revalidate: 900 },
    });
    if (res.ok) articles = await res.json();
  } catch (err) {
    console.error("Sitemap: failed to fetch articles", err);
  }

  for (const article of articles) {
    let lastMod = new Date();
    if (article.date) {
      if (article.date.includes("/")) {
        const [d, m, y] = article.date.split("/");
        lastMod = new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
      } else {
        lastMod = new Date(article.date);
      }
    }

    urls.push({
      url: `${SITE_URL}/${article.category}/${article.slug}`,
      lastModified: isNaN(lastMod.getTime()) ? new Date() : lastMod,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // ── 4. Author pages ───────────────────────────────────────────────────────
  // Author pages help E-E-A-T — include them in sitemap
  // We derive from articles to avoid a separate API call
  const authorSlugs = new Set();
  for (const article of articles) {
    if (article.author?.slug) authorSlugs.add(article.author.slug);
  }
  for (const slug of authorSlugs) {
    urls.push({
      url: `${SITE_URL}/authors/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // ── 5. Dynamic Pages (footer / admin-created pages) ────────────────────────
  let pages = [];
  try {
    const res = await fetch(`${API_BASE}/pages?publishedOnly=true`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const allPages = await res.json();
      pages = allPages.filter((page) => page.isPublished !== false);
    }
  } catch (err) {
    console.error("Sitemap: failed to fetch dynamic pages", err);
  }

  // Also pull footer links so we don't miss any pages
  let footerPages = [];
  try {
    const res = await fetch(`${API_BASE}/public/footer`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const footer = await res.json();
      const allFooterLinks = [
        ...(footer.column1Links || []),
        ...(footer.column2Links || []),
        ...(footer.column3Links || []),
        ...(footer.column4Links || []),
      ];
      footerPages = allFooterLinks.filter((link) => link.slug);
    }
  } catch (err) {
    console.error("Sitemap: failed to fetch footer pages", err);
  }

  const allPagesMap = new Map();
  for (const page of pages) {
    allPagesMap.set(page.slug, {
      slug: page.slug,
      template: page.template,
      lastModified: page.updatedAt || page.lastUpdated || new Date(),
    });
  }
  for (const link of footerPages) {
    if (!allPagesMap.has(link.slug)) {
      allPagesMap.set(link.slug, {
        slug: link.slug,
        template: "unknown",
        lastModified: new Date(),
      });
    }
  }

  for (const [slug, pageData] of allPagesMap) {
    if (!slug) continue;

    let priority = 0.7;
    let changeFrequency = "weekly";

    if (slug === "about" || slug === "contact") {
      priority = 0.9;
      changeFrequency = "monthly";
    } else if (
      slug === "privacy-policy" ||
      slug === "terms-and-conditions" ||
      slug === "legal"
    ) {
      priority = 0.5;
      changeFrequency = "monthly";
    } else if (
      slug === "advertising-policy" ||
      slug === "corrections-policy" ||
      slug === "editorial-policy" ||
      slug === "source-methodology" ||
      slug === "ownership-and-funding" ||
      slug === "right-of-reply"
    ) {
      // Trust signal pages — important for E-E-A-T
      priority = 0.7;
      changeFrequency = "monthly";
    } else if (slug === "team") {
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (slug === "careers") {
      priority = 0.5;
      changeFrequency = "weekly";
    }

    urls.push({
      url: `${SITE_URL}/page/${slug}`,
      lastModified: new Date(pageData.lastModified),
      changeFrequency,
      priority,
    });
  }

  return urls;
}