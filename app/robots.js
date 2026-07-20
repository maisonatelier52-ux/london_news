// // app/robots.js
// // Place this file at: app/robots.js
// // Accessible at: https://yourdomain.com/robots.txt

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";

// export default function robots() {
//   return {
//     rules: [
//       {
//         // Allow all well-behaved bots
//         userAgent: "*",
//         allow: "/",
//         disallow: [
//           "/api/",        // never expose backend routes
//           "/admin/",      // admin panel if you have one
//           "/_next/",      // Next.js internals
//         ],
//       },
//       {
//         // Block AI training scrapers
//         userAgent: [
//           "GPTBot",
//           "CCBot",
//           "anthropic-ai",
//           "Claude-Web",
//           "Google-Extended",
//           "Bytespider",
//           "PetalBot",
//         ],
//         disallow: "/",
//       },
//     ],
//     sitemap: `${SITE_URL}/sitemap.xml`,
//     host: SITE_URL,
//   };
// }

// app/robots.js
// UPDATED June 2026 — Per SEO Strategy:
// AI retrieval bots MUST be allowed for AI Overview / GEO citations.
// Only block training scrapers (CCBot, Bytespider, PetalBot).
// Blocking GPTBot, anthropic-ai, ClaudeBot, PerplexityBot = ZERO AI citations.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";

// Applied to every individually-named bot below too — a per-user-agent group
// in robots.txt does NOT inherit the "*" group's disallow list, so without
// repeating this, GPTBot/ClaudeBot/etc's own "allow: /" groups would have
// left /admin, /login, and /preview crawlable by those bots specifically.
const SENSITIVE_PATHS = [
  "/api/",       // never expose backend routes
  "/admin/",     // admin panel
  "/login",      // top-level admin login (task 4.6 route contract)
  "/preview/",   // secret preview URLs for draft articles/homepage
];

export default function robots() {
  return {
    rules: [
      // ── Well-behaved search & AI retrieval bots — ALLOW ALL (except sensitive paths) ─
      {
        userAgent: "*",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },

      // ── Google AI bots — ALLOW (required for AI Overviews & Discover) ─
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
      {
        userAgent: "Googlebot-News",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },

      // ── OpenAI — ALLOW (required for ChatGPT Search citations) ─────────
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },

      // ── Anthropic — ALLOW (required for Claude citations) ──────────────
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },

      // ── Perplexity — ALLOW (required for Perplexity citations) ─────────
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },

      // ── Microsoft Copilot — ALLOW (required for Bing/Copilot citations) ─
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },

      // ── Training-only scrapers — BLOCK (not retrieval agents) ──────────
      // These do not provide citation benefit, only training data extraction.
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "PetalBot",
        disallow: "/",
      },
    ],

    // ── Sitemaps ───────────────────────────────────────────────────────────
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/news-sitemap.xml`,
    ],
    host: SITE_URL,
  };
}