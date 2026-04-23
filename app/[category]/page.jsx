"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { notFound, useParams } from "next/navigation";
import Footer from "@/components/Footer";

// ─── Config ───────────────────────────────────────────────────────────────────
const SITE_URL   = process.env.NEXT_PUBLIC_SITE_URL  || "https://www.yourdomain.com";
const SITE_NAME  = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE   = process.env.NEXT_PUBLIC_API_URL   || "http://localhost:5000/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const toIso = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).toISOString();
  }
  return new Date(dateStr).toISOString();
};

const formatDisplay = (dateStr) =>
  new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// ─── Resolve image URL (ImageKit returns full URLs) ───────────────────────────
const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  // Legacy local upload path fallback
  return `${API_BASE.replace("/api", "")}${src}`;
};

// ─── Category SEO copy ────────────────────────────────────────────────────────
const CATEGORY_META = {
  politics:    { title: `Politics — Breaking News & Analysis | ${SITE_NAME}`,    description: "Comprehensive politics news coverage including elections, policy debates, government affairs, and political analysis from expert journalists." },
  business:    { title: `Business — Market Analysis & Insights | ${SITE_NAME}`,  description: "Breaking business news featuring market analysis, corporate developments, financial insights, economic trends, and industry coverage." },
  culture:     { title: `Culture — Arts, Entertainment & Lifestyle | ${SITE_NAME}`, description: "Explore culture, arts, entertainment, food, lifestyle and community stories from expert journalists." },
  science:     { title: `Science — Discoveries & Research | ${SITE_NAME}`,       description: "Latest science news covering discoveries, research breakthroughs, space, medicine and technology." },
  environment: { title: `Environment — Climate & Nature | ${SITE_NAME}`,         description: "Environment and climate news: conservation, sustainability, green energy, and nature stories from around the world." },
  art:         { title: `Art — Exhibitions, Reviews & Interviews | ${SITE_NAME}`,description: "Art news and reviews: gallery openings, artist profiles, exhibitions, and cultural commentary." },
};

const getCategoryMeta = (cat) =>
  CATEGORY_META[cat] || {
    title: `${capitalize(cat)} — Breaking News & Analysis | ${SITE_NAME}`,
    description: `Latest ${cat} news, analysis, and expert coverage from trusted journalists at ${SITE_NAME}. Updated daily.`,
  };

// ─── SEO Head (client-side) ───────────────────────────────────────────────────
function CategorySEOHead({ category, articles }) {
  const meta         = getCategoryMeta(category);
  const canonicalUrl = `${SITE_URL}/${category}`;
  const ogImage      = `${SITE_URL}/images/og-default.webp`;

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${capitalize(category)} News`,
    description: meta.description,
    url: canonicalUrl,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/${category}/${a.slug}`,
        item: {
          "@type": "NewsArticle",
          headline: a.title,
          description: a.excerpt,
          datePublished: toIso(a.date),
          dateModified:  toIso(a.date),
          image: a.image ? resolveImg(a.image) : ogImage,
          author: a.author
            ? { "@type": "Person", name: a.author.name }
            : { "@type": "Organization", name: SITE_NAME },
          publisher: {
            "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
          },
        },
      })),
    },
    publisher: {
      "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: `${capitalize(category)} News`, item: canonicalUrl },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: canonicalUrl,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
    about: { "@type": "Thing", name: capitalize(category) },
    primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={`${category} news, latest ${category}, ${category} headlines, ${category} updates, breaking news, ${SITE_NAME}`} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={`${capitalize(category)} News - ${SITE_NAME}`} />
      <meta property="og:locale"      content="en_GB" />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@londonnews" />
      <meta name="twitter:title"       content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image"       content={ogImage} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
    </Head>
  );
}

// ─── Breadcrumb UI ────────────────────────────────────────────────────────────
function Breadcrumb({ category }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
      <ol
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40"
        itemScope itemType="https://schema.org/BreadcrumbList"
      >
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
          <Link
            href="/"
            title="Go to London News homepage"
            className="hover:text-black transition-colors no-underline text-black/40"
            itemProp="item"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <li aria-hidden="true">/</li>
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
          <span className="text-black/70" itemProp="name">{capitalize(category)}</span>
          <meta itemProp="position" content="2" />
          <link itemProp="item" href={`${SITE_URL}/${category}`} />
        </li>
      </ol>
    </nav>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col gap-0 animate-pulse">
      <div className="h-[200px] sm:h-[230px] bg-black/10" />
      <div className="mt-4 h-3 w-20 bg-black/10 rounded" />
      <div className="mt-2 h-5 w-full bg-black/10 rounded" />
      <div className="mt-1 h-5 w-3/4 bg-black/10 rounded" />
      <div className="mt-2 h-3 w-full bg-black/10 rounded" />
      <div className="mt-1 h-3 w-5/6 bg-black/10 rounded" />
      <div className="mt-3 h-3 w-32 bg-black/10 rounded" />
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article }) {
  const imageUrl = resolveImg(article.image);

  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      title={`Read: ${article.title}`}
      className="group flex flex-col gap-0 no-underline"
    >
      <div className="overflow-hidden h-[200px] sm:h-[230px] bg-black/5 relative">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={article.imageAlt || article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="mt-4">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
          {article.categoryName || article.category}
        </span>
      </div>
      <h3 className="mt-2 text-[20px] sm:text-[22px] font-semibold leading-[1.15] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 text-[13px] text-black/60 leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>
      <div className="mt-3 flex items-center gap-3 text-[11px] text-black/40 uppercase tracking-wide flex-wrap">
        <span>{article.author?.name || "Staff Writer"}</span>
        <span>·</span>
        <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>
    </Link>
  );
}

// ─── Shared Header ────────────────────────────────────────────────────────────
function SiteHeader() {
  const NAV_ITEMS = ["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business"];
  return (
    <header
      className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
      style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-[0]" />
      <div className="flex lg:hidden items-center justify-between w-full relative z-10">
        <Link href="/" title="London News - Home" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">{SITE_NAME}</Link>
        <a href="#" title="Subscribe to London News" className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline">Subscribe</a>
      </div>
      <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center relative z-10" aria-label="Main navigation">
        {NAV_ITEMS.map((n) => (
          <a
            key={n}
            href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}
            title={`Browse ${n} news`}
            className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
          >
            {n}
          </a>
        ))}
      </nav>
      <a
        href="#"
        title="Customise your news feed or subscribe"
        className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10"
      >
        Customise / Subscribe
      </a>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params?.category;

  const [articles, setArticles]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    if (!categoryParam) return;

    const urlCategory = categoryParam.toLowerCase();
    setCurrentCategory(urlCategory);
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/public/articles/${urlCategory}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Category not found (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch category articles:", err);
        setError(err.message);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [categoryParam]);

  // ── FEATURED ARTICLE: Shows the LATEST article (first in array) ──
  // If you want the OLDEST article (last in array), uncomment the second option
  const featured = articles[0] || null; // ✅ LATEST article (newest first)
  // const featured = articles[articles.length - 1] || null; // 🔄 OLDEST article (last item)
  
  const otherArticles = articles.slice(1);

  const heroImage = featured?.image ? resolveImg(featured.image) : "";

  const HeroBanner = () => (
    <section
      className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex flex-col justify-end overflow-hidden"
      style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      aria-label={`${capitalize(currentCategory)} category hero`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 pb-10 lg:pb-14">
        <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-white/70 mb-2">
          Browsing Category
        </p>
        <h1
          className="font-['Poppins',sans-serif] font-semibold text-[clamp(52px,9vw,120px)] leading-[0.85] tracking-[-0.08em] text-[#F5C645]"
          style={{ textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)" }}
        >
          {capitalize(currentCategory)}
        </h1>
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
        <SiteHeader />
        <div className="border-b border-black/10">
          <Breadcrumb category={currentCategory || categoryParam} />
        </div>
        <HeroBanner />
        <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    // return (
    //   <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
    //     <SiteHeader />
    //     <div className="border-b border-black/10"><Breadcrumb category={currentCategory} /></div>
    //     <HeroBanner />
    //     <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-20 text-center">
    //       <p className="text-[16px] text-black/60 mb-2">Could not load {capitalize(currentCategory)} stories.</p>
    //       <p className="text-[13px] text-black/40 mb-6">{error}</p>
    //       <button
    //         onClick={() => window.location.reload()}
    //         className="px-8 py-3 bg-[#F5C645] text-black text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-black hover:text-[#F5C645] transition-all"
    //       >
    //         Try Again
    //       </button>
    //     </div>
    //     <Footer />
    //   </div>
    // );
    notFound();
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
        {currentCategory && <CategorySEOHead category={currentCategory} articles={[]} />}
        <SiteHeader />
        <div className="border-b border-black/10"><Breadcrumb category={currentCategory} /></div>
        <HeroBanner />
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-20 text-center">
          <p className="text-[16px] text-black/60">No stories found in {capitalize(currentCategory)} yet.</p>
          <Link href="/" title="Back to London News homepage" className="mt-6 inline-block text-[#F5C645] underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
      <CategorySEOHead category={currentCategory} articles={articles} />

      <section className="sr-only">
        <h1>{capitalize(currentCategory)} — Breaking News, Expert Analysis &amp; Latest Updates</h1>
        <p>Browse {articles.length} {currentCategory} articles from {SITE_NAME}.</p>
      </section>

      <SiteHeader />

      <div className="border-b border-black/10">
        <Breadcrumb category={currentCategory} />
      </div>

      <HeroBanner />

      {/* ── FEATURED STORY ── */}
      {featured && (
        <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16 w-full" aria-label="Featured story">
          <Link
            href={`/${featured.category}/${featured.slug}`}
            title={`Read featured: ${featured.title}`}
            className="group flex flex-col lg:flex-row gap-8 lg:gap-14 no-underline"
          >
            <div className="w-full lg:w-[55%] h-[280px] sm:h-[380px] lg:h-[460px] overflow-hidden bg-black/5 relative">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt={featured.imageAlt || featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="w-full lg:w-[45%] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[3px] bg-[#F5C645]" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
                  Featured · {featured.categoryName || capitalize(featured.category)}
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold leading-[1.05] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-[14px] text-black/60 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-[11px] text-black/40 uppercase tracking-wide flex-wrap">
                <span>{featured.author?.name || "Staff Writer"}</span>
                <span>·</span>
                <time dateTime={toIso(featured.date)}>{formatDisplay(featured.date)}</time>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <div className="mt-8">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-black border-b-2 border-[#F5C645] pb-1 group-hover:border-black transition-colors">
                  Read Story →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── DIVIDER ── */}
      {otherArticles.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[3px] bg-[#F5C645]" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
              More {capitalize(currentCategory)} Stories
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
        </div>
      )}

      {/* ── ARTICLE GRID ── */}
      {otherArticles.length > 0 && (
        <section
          className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-14 w-full"
          aria-label={`${capitalize(currentCategory)} articles`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ── MOOD STRIP ── */}
      <section className="w-full bg-black py-8 px-4 sm:px-8 lg:px-12 mt-auto" aria-label="London mood">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] sm:text-[15px] font-bold uppercase text-[#F5C645] tracking-wide">London's Mood Right Now</p>
            <p className="text-[11px] font-normal uppercase text-white/40 mt-1">Updated 32 minutes ago</p>
          </div>
          <div className="flex gap-8 text-white/70 text-[12px] uppercase tracking-wide">
            <p><span className="text-[18px] text-white font-light">82% </span>Happy</p>
            <p><span className="text-[18px] text-white font-light">6% </span>Sad</p>
            <p><span className="text-[18px] text-white font-light">12% </span>Can't complain</p>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5C645] border border-[#F5C645]/40 px-5 py-2 hover:border-[#F5C645] transition-all cursor-pointer">
            Take Daily Survey
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}