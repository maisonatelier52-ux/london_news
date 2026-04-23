// // app/[category]/[slug]/page.jsx
// // ✅ Connected to MongoDB backend via /api/public/articles/slug/:slug
// // ✅ Full SEO: JSON-LD (NewsArticle + BreadcrumbList), OpenGraph, Twitter Card,
// //    Canonical, microdata, semantic breadcrumb UI, Prev/Next navigation
// // ✅ Uses next/image for all images, Link with title attributes
// // ✅ Fixed: fetchPriority (camelCase), author link navigation
// // ✅ Added category validation to prevent wrong category access

// "use client";

// import { useState, useEffect } from "react";
// import Head from "next/head";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import Image from "next/image";
// import { notFound, useParams, useRouter } from "next/navigation";
// import {
//   FaXTwitter, FaFacebookF, FaWhatsapp,
//   FaMedium, FaQuora, FaRedditAlien
// } from "react-icons/fa6";
// import { FiCopy } from "react-icons/fi";

// // ─── Config ───────────────────────────────────────────────────────────────────
// const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || "https://www.yourdomain.com";
// const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
// const API_BASE  = process.env.NEXT_PUBLIC_API_URL   || "http://localhost:5000/api";
// const TWITTER   = "@londonnews";

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const toIso = (dateStr) => {
//   if (!dateStr) return new Date().toISOString();
//   if (typeof dateStr === "string" && dateStr.includes("/")) {
//     const [d, m, y] = dateStr.split("/");
//     return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).toISOString();
//   }
//   return new Date(dateStr).toISOString();
// };

// const formatDisplay = (dateStr) =>
//   new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
//     day: "numeric", month: "long", year: "numeric",
//   });

// const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// /** ImageKit URLs are already absolute; legacy paths get the base URL prepended */
// const resolveImg = (src) => {
//   if (!src) return "";
//   if (src.startsWith("http")) return src;
//   return `${API_BASE.replace("/api", "")}${src}`;
// };

// // ─── SEO Head ─────────────────────────────────────────────────────────────────
// function ArticleSEOHead({ article, category, author }) {
  
  
//   if (!article) return null;

//   // Use article's actual category for canonical URL, not the URL param
//   const canonicalUrl  = `${SITE_URL}/${article.category}/${article.slug}`;
//   const articleImage  = article.image ? resolveImg(article.image) : `${SITE_URL}/images/og-default.webp`;
//   const metaTitle     = article.metaTitle     || `${article.title} | ${capitalize(article.category)} | ${SITE_NAME}`;
//   const metaDesc      = article.metaDescription || article.excerpt || "";

//   const articleJsonLd = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
//     headline: article.title,
//     description: metaDesc,
//     image: [articleImage],
//     datePublished: toIso(article.date),
//     dateModified:  toIso(article.date),
//     author: author
//       ? { "@type": "Person", name: author.name,
//           url: `${SITE_URL}/authors/${author.slug}` }
//       : { "@type": "Organization", name: SITE_NAME },
//     publisher: {
//       "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL,
//       logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp`, width: 600, height: 60 },
//     },
//     articleSection: capitalize(article.category),
//     keywords: Array.isArray(article.keywords) ? article.keywords.join(", ")
//               : article.tags?.join(", ") || "",
//     url: canonicalUrl,
//   };

//   const breadcrumbJsonLd = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       { "@type": "ListItem", position: 1, name: "Home",                       item: SITE_URL },
//       { "@type": "ListItem", position: 2, name: `${capitalize(article.category)} News`, item: `${SITE_URL}/${article.category}` },
//       { "@type": "ListItem", position: 3, name: article.title,                 item: canonicalUrl },
//     ],
//   };

//   return (
//     <Head>
//       <title>{metaTitle}</title>
//       <meta name="description"   content={metaDesc} />
//       {article.keywords?.length > 0 && <meta name="keywords" content={article.keywords.join(", ")} />}
//       <link rel="canonical"      href={canonicalUrl} />
//       <meta name="robots"        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//       {author?.name && <meta name="author" content={author.name} />}
//       <meta property="article:published_time" content={toIso(article.date)} />
//       <meta property="article:modified_time"  content={toIso(article.date)} />
//       <meta property="article:section"        content={capitalize(article.category)} />
//       {article.tags?.map((t) => <meta key={t} property="article:tag" content={t} />)}
//       <meta property="og:type"         content="article" />
//       <meta property="og:site_name"    content={SITE_NAME} />
//       <meta property="og:title"        content={metaTitle} />
//       <meta property="og:description"  content={metaDesc} />
//       <meta property="og:url"          content={canonicalUrl} />
//       <meta property="og:image"        content={articleImage} />
//       <meta property="og:image:width"  content="1200" />
//       <meta property="og:image:height" content="630" />
//       <meta property="og:image:alt"    content={article.imageAlt || article.title} />
//       <meta property="og:locale"       content="en_GB" />
//       <meta name="twitter:card"        content="summary_large_image" />
//       <meta name="twitter:site"        content={TWITTER} />
//       <meta name="twitter:creator"     content={TWITTER} />
//       <meta name="twitter:title"       content={metaTitle} />
//       <meta name="twitter:description" content={metaDesc} />
//       <meta name="twitter:image"       content={articleImage} />
//       <meta name="twitter:image:alt"   content={article.imageAlt || article.title} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
//     </Head>
//   );
// }

// // ─── Breadcrumb UI ────────────────────────────────────────────────────────────
// function Breadcrumb({ category, articleTitle }) {
//   return (
//     <div className="border-b border-black/10">
//       <nav aria-label="Breadcrumb" className="max-w-[780px] mx-auto px-4 sm:px-8 py-3">
//         <ol
//           className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40 flex-wrap"
//           itemScope itemType="https://schema.org/BreadcrumbList"
//         >
//           <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
//             <Link
//               href="/"
//               title="Go to London News homepage"
//               className="hover:text-black transition-colors no-underline text-black/40"
//               itemProp="item"
//             >
//               <span itemProp="name">Home</span>
//             </Link>
//             <meta itemProp="position" content="1" />
//           </li>
//           <li aria-hidden="true">/</li>
//           <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
//             <Link
//               href={`/${category}`}
//               title={`Browse all ${capitalize(category)} articles`}
//               className="hover:text-black transition-colors no-underline text-black/40"
//               itemProp="item"
//             >
//               <span itemProp="name">{capitalize(category)}</span>
//             </Link>
//             <meta itemProp="position" content="2" />
//           </li>
//           <li aria-hidden="true">/</li>
//           <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
//             <span className="text-black/60 line-clamp-1" itemProp="name">{articleTitle}</span>
//             <meta itemProp="position" content="3" />
//           </li>
//         </ol>
//       </nav>
//     </div>
//   );
// }

// // ─── Share Bar with React Icons ───────────────────────────────────────────────
// function ShareBar({ vertical = false, url = "", title = "" }) {
//   const enc = encodeURIComponent;
//   const base = "flex items-center justify-center w-8 h-8 border border-black/20 hover:border-transparent transition-all duration-300 cursor-pointer rounded-full hover:scale-110";
//   const wrap = vertical ? "flex flex-col gap-3" : "flex flex-row gap-3";

//   const [copySuccess, setCopySuccess] = useState(false);

//   const handleCopy = async () => {
//     if (navigator.clipboard) {
//       await navigator.clipboard.writeText(url);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     }
//   };

//   return (
//     <div className={wrap} aria-label="Share article">
//       <a
//         href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
//         target="_blank" rel="noopener noreferrer"
//         className={`${base} bg-black hover:text-white`}
//         title="Share on X (Twitter)"
//         aria-label="Share on X"
//       >
//         <FaXTwitter size={14} />
//       </a>
//       <a
//         href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
//         target="_blank" rel="noopener noreferrer"
//         className={`${base} bg-[#1877F2] hover:text-white hover:border-[#1877F2]`}
//         title="Share on Facebook"
//         aria-label="Share on Facebook"
//       >
//         <FaFacebookF size={14} />
//       </a>
//       <a
//         href={`https://wa.me/?text=${enc(title)}%20${enc(url)}`}
//         target="_blank" rel="noopener noreferrer"
//         className={`${base} bg-[#25D366] hover:text-white hover:border-[#25D366]`}
//         title="Share on WhatsApp"
//         aria-label="Share on WhatsApp"
//       >
//         <FaWhatsapp size={14} />
//       </a>
//       <button
//         className={`${base} bg-black hover:text-white relative`}
//         title="Copy link"
//         aria-label="Copy article link"
//         onClick={handleCopy}
//       >
//         {copySuccess ? (
//           <span className="text-[10px] absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded whitespace-nowrap">
//             Copied!
//           </span>
//         ) : (
//           <FiCopy size={14} />
//         )}
//       </button>
//     </div>
//   );
// }

// // ─── Body Block ───────────────────────────────────────────────────────────────
// function BodyBlock({ block }) {
//   switch (block.type) {
//     case "paragraph":
//       return <p className="text-[15px] sm:text-[16px] text-black/80 leading-[1.75] mb-6">{block.text}</p>;
//     case "subheading":
//     case "heading": {
//       const Tag = block.level === 2 ? "h2" : "h3";
//       return <Tag className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4">{block.text}</Tag>;
//     }
//     case "pullquote":
//       return (
//         <blockquote className="my-10 pl-6 border-l-4 border-[#F5C645]">
//           <p className="text-[20px] sm:text-[24px] font-semibold text-black leading-[1.3] tracking-[-0.01em] italic">
//             &ldquo;{block.text}&rdquo;
//           </p>
//           {block.attribution && (
//             <cite className="mt-3 block text-[11px] uppercase tracking-[0.14em] text-black/40 not-italic">
//               — {block.attribution}
//             </cite>
//           )}
//         </blockquote>
//       );
//     case "image": {
//       const imgSrc = resolveImg(block.src);
//       return (
//         <figure className="my-10 -mx-4 sm:-mx-0">
//           {imgSrc && (
//             <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[420px]">
//               <Image
//                 src={imgSrc}
//                 alt={block.alt || block.caption || "Article image"}
//                 fill
//                 sizes="(max-width: 780px) 100vw, 780px"
//                 className="object-cover"
//                 loading="lazy"
//               />
//             </div>
//           )}
//           {block.caption && (
//             <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
//               {block.caption}
//             </figcaption>
//           )}
//         </figure>
//       );
//     }
//     default:
//       return null;
//   }
// }

// // ─── Prev / Next Navigation ───────────────────────────────────────────────────
// function PrevNextNav({ prev, next, category }) {
//   return (
//     <nav aria-label="Article navigation" className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
//       <div className="bg-[#f7f6f2] p-5 border-l-4 border-[#F5C645]">
//         <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">← Previous Article</p>
//         {prev ? (
//           <Link
//             href={`/${category}/${prev.slug}`}
//             title={`Read previous: ${prev.title}`}
//             className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
//           >
//             {prev.title}
//           </Link>
//         ) : (
//           <p className="text-[13px] text-black/30">No previous article</p>
//         )}
//       </div>
//       <div className="bg-[#f7f6f2] p-5 text-right border-r-4 border-[#F5C645]">
//         <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">Next Article →</p>
//         {next ? (
//           <Link
//             href={`/${category}/${next.slug}`}
//             title={`Read next: ${next.title}`}
//             className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
//           >
//             {next.title}
//           </Link>
//         ) : (
//           <p className="text-[13px] text-black/30">No next article</p>
//         )}
//       </div>
//     </nav>
//   );
// }

// // ─── Skeleton Loader ──────────────────────────────────────────────────────────
// function ArticleSkeleton() {
//   return (
//     <div className="animate-pulse">
//       <div className="max-w-[780px] mx-auto px-4 sm:px-8 pt-10 lg:pt-14">
//         <div className="h-3 w-32 bg-black/10 rounded mb-5" />
//         <div className="h-8 w-full bg-black/10 rounded mb-2" />
//         <div className="h-8 w-3/4 bg-black/10 rounded mb-5" />
//         <div className="h-4 w-full bg-black/10 rounded mb-2" />
//         <div className="h-4 w-5/6 bg-black/10 rounded mb-8" />
//         <div className="flex gap-3 items-center mb-6">
//           <div className="w-9 h-9 rounded-full bg-black/10" />
//           <div className="h-3 w-24 bg-black/10 rounded" />
//         </div>
//       </div>
//       <div className="max-w-[1100px] mx-auto px-0 sm:px-8 mt-8">
//         <div className="w-full h-[260px] sm:h-[400px] lg:h-[560px] bg-black/10" />
//       </div>
//       <div className="max-w-[780px] mx-auto px-4 sm:px-8 mt-10 space-y-4">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className={`h-4 bg-black/10 rounded ${i % 3 === 2 ? "w-3/4" : "w-full"}`} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Shared Header ────────────────────────────────────────────────────────────
// function SiteHeader() {
//   const NAV_ITEMS = ["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business"];
//   return (
//     <header
//       className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
//       style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-[0]" />
//       <div className="flex lg:hidden items-center justify-between w-full relative z-10">
//         <Link href="/" title="London News - Home" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">{SITE_NAME}</Link>
//         <a href="#" title="Subscribe to London News" className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline">Subscribe</a>
//       </div>
//       <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center relative z-10" aria-label="Main navigation">
//         {NAV_ITEMS.map((n) => (
//           <a
//             key={n}
//             href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}
//             title={`Browse ${n} news`}
//             className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
//           >
//             {n}
//           </a>
//         ))}
//       </nav>
//       <a
//         href="#"
//         title="Customise your news feed or subscribe"
//         className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10"
//       >
//         Customise / Subscribe
//       </a>
//     </header>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function NewsDetailPage() {
//   const params   = useParams();
//   const router   = useRouter();
//   const slug     = params?.slug;
//   const category = params?.category;

//   const [article,     setArticle]     = useState(null);
//   const [related,     setRelated]     = useState([]);
//   const [prevArticle, setPrevArticle] = useState(null);
//   const [nextArticle, setNextArticle] = useState(null);
//   const [loading,     setLoading]     = useState(true);
//   const [error,       setError]       = useState(null);
//   const [shareUrl,    setShareUrl]    = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") setShareUrl(window.location.href);
//   }, []);

//   useEffect(() => {
//     if (!slug || !category) return;

//     let isMounted = true;
//     setLoading(true);
//     setError(null);

//     fetch(`${API_BASE}/public/articles/slug/${slug}`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Article not found (${res.status})`);
//         return res.json();
//       })
//       .then(({ article: fetchedArticle, prevArticle: fetchedPrev, nextArticle: fetchedNext, related: fetchedRelated }) => {
//         if (!isMounted) return;
        
//         // ── VALIDATE CATEGORY MATCHES ──
//         // Check if the article's category slug matches the URL category
//         if (fetchedArticle.category.toLowerCase() !== category.toLowerCase()) {
//           console.warn(`Category mismatch: URL has "${category}" but article belongs to "${fetchedArticle.category}"`);
//           throw new Error(`Article not found in ${category} category`);
//         }
        
//         setArticle(fetchedArticle);
//         setPrevArticle(fetchedPrev);
//         setNextArticle(fetchedNext);
//         setRelated(fetchedRelated || []);
//       })
//       .catch((err) => {
//         if (isMounted) {
//           console.error("Failed to fetch article:", err);
//           setError(err.message);
//         }
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });
      
//     return () => { isMounted = false; };
//   }, [slug, category]);

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
//         <SiteHeader />
//         <ArticleSkeleton />
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !article) {
//     // return (
//     //   <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
//     //     <SiteHeader />
//     //     <div className="max-w-[780px] mx-auto px-4 sm:px-8 py-20 text-center">
//     //       <h1 className="text-2xl font-semibold text-black mb-4">Article Not Found</h1>
//     //       <p className="text-black/60 mb-2">
//     //         The article you're looking for doesn't exist in the {capitalize(category || "this")} category or has been moved.
//     //       </p>
//     //       {error && <p className="text-[13px] text-black/40 mb-6">{error}</p>}
//     //       <Link href={`/${category}`} title={`Back to ${capitalize(category || "Category")} articles`} className="inline-block text-[#F5C645] underline mr-4">
//     //         Back to {capitalize(category || "Category")}
//     //       </Link>
//     //       <Link href="/" title="Go to London News homepage" className="inline-block text-black/50 underline">Home</Link>
//     //     </div>
//     //     <Footer />
//     //   </div>
//     // );
//     notFound();
//   }

//   const authorInitials = article.author?.name
//     ?.split(" ").map((n) => n[0]).join("") || "LN";

//   const liveShareUrl = shareUrl || `${SITE_URL}/${article.category}/${article.slug}`;
//   const heroImg      = resolveImg(article.image);
//   const authorImg    = resolveImg(article.author?.profileImage);

//   // Generate author slug for the link
//   const authorSlug = article.author?.slug || null;

//   return (
//     <div
//       className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white"
//       itemScope itemType="https://schema.org/NewsArticle"
//     >
//       <ArticleSEOHead article={article} category={category} author={article.author} />

//       {/* Hidden Microdata */}
//       <meta itemProp="headline"       content={article.title} />
//       <meta itemProp="description"    content={article.excerpt} />
//       {article.image && <meta itemProp="image" content={resolveImg(article.image)} />}
//       <meta itemProp="datePublished"  content={toIso(article.date)} />
//       <meta itemProp="dateModified"   content={toIso(article.date)} />
//       <meta itemProp="articleSection" content={capitalize(article.category)} />
//       {article.tags?.length > 0 && <meta itemProp="keywords" content={article.tags.join(", ")} />}
//       <div itemProp="author" itemScope itemType="https://schema.org/Person" style={{ display: "none" }}>
//         <meta itemProp="name" content={article.author?.name || SITE_NAME} />
//       </div>
//       <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" style={{ display: "none" }}>
//         <meta itemProp="name" content={SITE_NAME} />
//         <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
//           <meta itemProp="url" content={`${SITE_URL}/images/logo.webp`} />
//         </div>
//       </div>

//       <SiteHeader />
//       <Breadcrumb category={article.category} articleTitle={article.title} />

//       {/* ── ARTICLE HEADER ── */}
//       <div className="max-w-[780px] mx-auto px-4 sm:px-8 pt-10 lg:pt-14 w-full">
//         <div className="flex items-center gap-3 mb-5">
//           <div className="w-[32px] h-[3px] bg-[#F5C645]" />
//           <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
//             {article.categoryName || capitalize(article.category)} · {article.tags?.[0] || "News"}
//           </span>
//         </div>

//         <h1
//           className="font-['Poppins',sans-serif] font-semibold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.05] tracking-[-0.03em] text-black"
//           itemProp="name"
//         >
//           {article.title}
//         </h1>

//         <p className="mt-5 text-[16px] sm:text-[18px] text-black/60 leading-[1.6] font-light">
//           {article.excerpt}
//         </p>

//         {/* Author + Date */}
//         <div className="mt-6 pt-6 border-t border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             {authorImg ? (
//               <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
//                 <Image
//                   src={authorImg}
//                   alt={`${article.author?.name || "Author"} profile picture`}
//                   fill
//                   sizes="36px"
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             ) : (
//               <div className="w-9 h-9 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
//                 {authorInitials}
//               </div>
//             )}
//             <div>
//               {/* Author name links to /authors/[slug] */}
//               {authorSlug ? (
//                 <Link
//                   href={`/authors/${authorSlug}`}
//                   title={`View articles by ${article.author?.name}`}
//                   className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors no-underline"
//                 >
//                   {article.author?.name || "Staff Writer"}
//                 </Link>
//               ) : (
//                 <p className="text-[13px] font-semibold text-black">
//                   {article.author?.name || "Staff Writer"}
//                 </p>
//               )}
//               <p className="text-[11px] text-black/40 uppercase tracking-wide">
//                 {article.author?.country || "Journalist"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4 text-[11px] text-black/70 uppercase tracking-wide">
//             <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
//             <span>·</span>
//             <span>{article.readTime}</span>
//           </div>
//         </div>

//         {/* Mobile share bar */}
//         <div className="mt-5 sm:hidden">
//           <ShareBar url={liveShareUrl} title={article.title} />
//         </div>
//       </div>

//       {/* ── HERO IMAGE ── */}
//       <div className="max-w-[1100px] mx-auto px-0 sm:px-8 mt-8 w-full">
//         <figure className="w-full">
//           <div className="w-full h-[260px] sm:h-[400px] lg:h-[560px] overflow-hidden bg-black/5 relative">
//             {heroImg && (
//               <Image
//                 src={heroImg}
//                 alt={article.imageAlt || article.title}
//                 fill
//                 sizes="(max-width: 1100px) 100vw, 1100px"
//                 priority
//                 fetchPriority="high"
//                 className="object-cover"
//               />
//             )}
//           </div>
//           {article.imageAlt && (
//             <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
//               {article.imageAlt}
//             </figcaption>
//           )}
//         </figure>
//       </div>

//       {/* ── ARTICLE BODY ── */}
//       <div
//         className="max-w-[780px] mx-auto px-4 sm:px-8 mt-10 lg:mt-14 w-full relative"
//         itemProp="articleBody"
//       >
//         {/* Desktop sticky share bar */}
//         <div className="hidden lg:block absolute -left-16 top-0">
//           <div className="sticky top-24">
//             <ShareBar vertical url={liveShareUrl} title={article.title} />
//           </div>
//         </div>

//         <div className="article-body">
//           {article.content?.map((block, i) => <BodyBlock key={i} block={block} />)}
//         </div>

//         {/* Tags */}
//         {article.tags?.length > 0 && (
//           <div className="mt-12 pt-8 border-t border-black/20 flex flex-wrap gap-2">
//             {article.tags.map((tag) => (
//               <span key={tag}
//                 className="px-3 py-1 text-[10px] uppercase tracking-[0.12em] border border-black text-black transition-colors">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         <PrevNextNav prev={prevArticle} next={nextArticle} category={article.category} />

//         {/* Author bio */}
//         {article.author && (
//           <div className="mt-4 p-6 bg-[#f7f6f2] flex gap-5 items-start">
//             {authorImg ? (
//               <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
//                 <Image
//                   src={authorImg}
//                   alt={`${article.author.name} profile picture`}
//                   fill
//                   sizes="48px"
//                   className="object-cover"
//                   loading="lazy"
//                 />
//               </div>
//             ) : (
//               <div className="w-12 h-12 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[15px] font-semibold shrink-0">
//                 {authorInitials}
//               </div>
//             )}
//             <div className="flex-1">
//               {authorSlug ? (
//                 <Link
//                   href={`/authors/${authorSlug}`}
//                   title={`View all articles by ${article.author.name}`}
//                 >
//                   <p className="text-[13px] font-bold text-black hover:text-[#4a5a6a] transition-colors">{article.author.name}</p>
//                 </Link>
//               ) : (
//                 <p className="text-[13px] font-bold text-black">{article.author.name}</p>
//               )}
//               <p className="text-[11px] uppercase tracking-wide text-black/40 mb-2">
//                 {article.author.country || "Journalist"}
//               </p>
//               <p className="text-[13px] text-black/60 leading-relaxed">{article.author.bio}</p>
//               {article.author.social && (
//                 <div className="flex gap-3 mt-3">
//                   {article.author.social.twitter && (
//                     <a
//                       href={article.author.social.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`Follow ${article.author.name} on X (Twitter)`}
//                       className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//                     >
//                       <FaXTwitter size={14} />
//                     </a>
//                   )}
//                   {article.author.social.medium && (
//                     <a
//                       href={article.author.social.medium}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`Follow ${article.author.name} on Medium`}
//                       className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//                     >
//                       <FaMedium size={14} />
//                     </a>
//                   )}
//                   {article.author.social.quora && (
//                     <a
//                       href={article.author.social.quora}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`Follow ${article.author.name} on Quora`}
//                       className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#B92B27] hover:text-white hover:border-[#B92B27] transition-all duration-300"
//                     >
//                       <FaQuora size={14} />
//                     </a>
//                   )}
//                   {article.author.social.reddit && (
//                     <a
//                       href={article.author.social.reddit}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`Follow ${article.author.name} on Reddit`}
//                       className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] transition-all duration-300"
//                     >
//                       <FaRedditAlien size={14} />
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── RELATED STORIES ── */}
//       {related.length > 0 && (
//         <section className="w-full bg-black mt-16" aria-label="Related stories">
//           <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
//             <div className="flex items-center gap-4 mb-10">
//               <div className="w-[40px] h-[3px] bg-[#F5C645]" />
//               <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">Related Stories</span>
//               <div className="flex-1 h-px bg-white/10" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
//               {related.map((item) => {
//                 const relatedImg = resolveImg(item.image);
//                 return (
//                   <Link
//                     key={item.id}
//                     href={`/${item.category}/${item.slug}`}
//                     title={`Read related: ${item.title}`}
//                     className="group no-underline flex flex-col gap-0"
//                   >
//                     <div className="overflow-hidden h-[180px] bg-white/5 relative">
//                       {relatedImg && (
//                         <Image
//                           src={relatedImg}
//                           alt={item.imageAlt || item.title}
//                           fill
//                           sizes="(max-width: 640px) 100vw, 33vw"
//                           className="object-cover transition-transform duration-700 group-hover:scale-105"
//                           loading="lazy"
//                         />
//                       )}
//                     </div>
//                     <span className="mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#F5C645]">
//                       {item.categoryName || capitalize(item.category)}
//                     </span>
//                     <h4 className="mt-2 text-[16px] sm:text-[18px] font-semibold leading-[1.2] text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors line-clamp-2">
//                       {item.title}
//                     </h4>
//                     <time dateTime={toIso(item.date)} className="mt-2 text-[11px] text-white/30 uppercase tracking-wide">
//                       {formatDisplay(item.date)}
//                     </time>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── MOOD STRIP ── */}
//       <section className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12" aria-label="London mood">
//         <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//           <div>
//             <p className="text-[13px] sm:text-[15px] font-bold uppercase text-[#F5C645] tracking-wide">London's Mood Right Now</p>
//             <p className="text-[11px] font-normal uppercase text-white/40 mt-1">Updated 32 minutes ago</p>
//           </div>
//           <div className="flex gap-8 text-white/70 text-[12px] uppercase tracking-wide">
//             <p><span className="text-[18px] text-white font-light">82% </span>Happy</p>
//             <p><span className="text-[18px] text-white font-light">6% </span>Sad</p>
//             <p><span className="text-[18px] text-white font-light">12% </span>Can't complain</p>
//           </div>
//           <button className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5C645] border border-[#F5C645]/40 px-5 py-2 hover:border-[#F5C645] transition-all cursor-pointer">
//             Take Daily Survey
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// app/[category]/[slug]/page.jsx
import NewsDetailClient from "@/components/articledetail/NewsDetailClient";
import { notFound } from "next/navigation";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to resolve image URLs
const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE.replace("/api", "")}${src}`;
};

// Helper to parse date to ISO string
const toIso = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).toISOString();
  }
  return new Date(dateStr).toISOString();
};

// Helper to capitalize
const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// Helper to format display date
const formatDisplay = (dateStr) =>
  new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Function to fetch article data
async function getArticleData(slug, category) {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const url = `${baseUrl}/public/articles/slug/${slug}`;
    
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch article: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Validate category matches
    if (data.article?.category?.toLowerCase() !== category.toLowerCase()) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Generate static params for static site generation
export async function generateStaticParams() {
  // For dynamic API, you might want to pre-fetch popular article slugs
  // or return an empty array to handle dynamically
  return [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const data = await getArticleData(slug, category);
  
  if (!data?.article) {
    return {
      title: "Article Not Found | London News",
      description: "The requested article could not be found.",
      robots: { index: false },
    };
  }
  
  const article = data.article;
  const canonicalUrl = `${SITE_URL}/${article.category}/${article.slug}`;
  const articleImage = article.image ? resolveImg(article.image) : `${SITE_URL}/images/og-default.webp`;
  const metaTitle = article.metaTitle || `${article.title} | ${capitalize(article.category)} | ${SITE_NAME}`;
  const metaDesc = article.metaDescription || article.excerpt || "";
  
  return {
    title: metaTitle,
    description: metaDesc,
    keywords: article.keywords?.join(", ") || article.tags?.join(", ") || "",
    authors: [{ name: article.author?.name || SITE_NAME }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: articleImage,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
      type: "article",
      publishedTime: toIso(article.date),
      modifiedTime: toIso(article.date),
      section: capitalize(article.category),
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [articleImage],
      creator: "@londonnews",
      site: "@londonnews",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Main Server Component
export default async function NewsDetailPage({ params }) {
  const { category, slug } = await params;
  const data = await getArticleData(slug, category);
  
  if (!data?.article) {
    notFound();
  }
  
  const { article, prevArticle, nextArticle, related } = data;
  
  // Prepare props for client component
  const articleData = {
    ...article,
    formattedDate: formatDisplay(article.date),
    isoDate: toIso(article.date),
    heroImage: resolveImg(article.image),
    authorImage: article.author?.profileImage ? resolveImg(article.author.profileImage) : null,
    authorInitials: article.author?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "LN",
    authorSlug: article.author?.slug || null,
    content: article.content || [],
    tags: article.tags || [],
    keywords: article.keywords || [],
  };
  
  const prevData = prevArticle ? {
    ...prevArticle,
    image: resolveImg(prevArticle.image),
  } : null;
  
  const nextData = nextArticle ? {
    ...nextArticle,
    image: resolveImg(nextArticle.image),
  } : null;
  
  const relatedData = (related || []).map(item => ({
    ...item,
    image: resolveImg(item.image),
  }));
  
  // Generate JSON-LD schemas
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${SITE_URL}/${article.category}/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    image: [
      {
        "@type": "ImageObject",
        url: articleData.heroImage,
        width: 1200,
        height: 630,
      },
    ],
    datePublished: articleData.isoDate,
    dateModified: articleData.isoDate,
    author: article.author ? {
      "@type": "Person",
      name: article.author.name,
      url: article.author.slug ? `${SITE_URL}/authors/${article.author.slug}` : undefined,
    } : {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.webp`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${article.category}/${article.slug}`,
    },
    articleSection: capitalize(article.category),
    keywords: article.keywords?.join(", ") || article.tags?.join(", ") || "",
    url: `${SITE_URL}/${article.category}/${article.slug}`,
  };
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${article.category}/${article.slug}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${capitalize(article.category)} News`,
        item: `${SITE_URL}/${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/${article.category}/${article.slug}`,
      },
    ],
  };
  
  return (
    <>
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Client Component with interactivity */}
      <NewsDetailClient
        article={articleData}
        prevArticle={prevData}
        nextArticle={nextData}
        relatedArticles={relatedData}
        category={article.category}
        siteUrl={SITE_URL}
        siteName={SITE_NAME}
      />
    </>
  );
}