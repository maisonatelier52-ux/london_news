// // components/articledetail/NewsDetailClient.jsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
// import {
//   FaXTwitter, FaFacebookF, FaWhatsapp,
//   FaMedium, FaQuora, FaRedditAlien
// } from "react-icons/fa6";
// import { FiCopy } from "react-icons/fi";
// import Header from "../../components/Header";
// import MoodSurveyWidget from "../MoodSurveyWidget";

// const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// // ─── Heading hierarchy rules ──────────────────────────────────────────────────
// // Page H1 = article title (visible, in JSX below)
// // Article subheadings must be H2 (first level under H1)
// // Nested subheadings must be H3
// //
// // Block type mapping:
// //   "heading"    with level=2  → <h2>   (main section heading)
// //   "heading"    with level=3  → <h3>   (sub-section heading)
// //   "subheading"               → <h2>   (always; these are top-level section breaks)
// //
// // "subheading" type NEVER renders as h3 — that would skip a level and
// // break heading order (H1 → H3 = fail on SEO testers).
// // ─────────────────────────────────────────────────────────────────────────────

// // ─── Scroll Reveal Hook ─────────────────────────────────────────────────────
// function useScrollReveal() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   return { ref, controls, isInView };
// }

// // ─── Share Bar Component with Animations ─────────────────────────────────────
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

//   const iconVariants = {
//     initial: { scale: 1, y: 0 },
//     hover: {
//       scale: 1.2,
//       y: -3,
//       transition: { type: "spring", stiffness: 400, damping: 10 }
//     },
//     tap: { scale: 0.95 }
//   };

//   return (
//     <div className={wrap} aria-label="Share article">
//       <motion.a
//         variants={iconVariants}
//         initial="initial"
//         whileHover="hover"
//         whileTap="tap"
//         href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
//         target="_blank" rel="noopener noreferrer"
//         className={`${base} bg-black hover:text-white`}
//         title="Share on X (Twitter)"
//         aria-label="Share on X"
//       >
//         <FaXTwitter size={14} />
//       </motion.a>
//       <motion.a
//         variants={iconVariants}
//         initial="initial"
//         whileHover="hover"
//         whileTap="tap"
//         href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
//         target="_blank" rel="noopener noreferrer"
//         className={`${base} bg-[#1877F2] hover:text-white hover:border-[#1877F2]`}
//         title="Share on Facebook"
//         aria-label="Share on Facebook"
//       >
//         <FaFacebookF size={14} />
//       </motion.a>
//       <motion.a
//         variants={iconVariants}
//         initial="initial"
//         whileHover="hover"
//         whileTap="tap"
//         href={`https://wa.me/?text=${enc(title)}%20${enc(url)}`}
//         target="_blank" rel="noopener noreferrer"
//         className={`${base} bg-[#25D366] hover:text-white hover:border-[#25D366]`}
//         title="Share on WhatsApp"
//         aria-label="Share on WhatsApp"
//       >
//         <FaWhatsapp size={14} />
//       </motion.a>
//       <motion.button
//         variants={iconVariants}
//         initial="initial"
//         whileHover="hover"
//         whileTap="tap"
//         className={`${base} bg-black hover:text-white relative`}
//         title="Copy link"
//         aria-label="Copy article link"
//         onClick={handleCopy}
//       >
//         <AnimatePresence>
//           {copySuccess && (
//             <motion.span
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               className="text-[10px] absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded whitespace-nowrap z-10"
//             >
//               Copied!
//             </motion.span>
//           )}
//         </AnimatePresence>
//         <FiCopy size={14} />
//       </motion.button>
//     </div>
//   );
// }

// // ─── Animated Body Block Component ────────────────────────────────────────────
// function BodyBlock({ block, index }) {
//   const { ref, controls } = useScrollReveal();

//   const paragraphVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: index * 0.05 }
//     }
//   };

//   const headingVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   const quoteVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6 }
//     }
//   };

//   switch (block.type) {
//     case "paragraph":
//       return (
//         <motion.p
//           ref={ref}
//           variants={paragraphVariants}
//           initial="hidden"
//           animate={controls}
//           className="text-[15px] sm:text-[16px] text-black/80 leading-[1.75] mb-6"
//         >
//           {block.text}
//         </motion.p>
//       );

//     case "subheading":
//     case "heading": {
//       // SEO FIX — heading order:
//       // "subheading" = top-level section break under the article H1 → always H2
//       // "heading" with level 3 → H3 (nested sub-section)
//       // "heading" with level 2 (or no level) → H2
//       // This guarantees H1 → H2 → H3 and never H1 → H3 (skip).
//       const isH3 = block.type === "heading" && block.level === 3;
//       const Tag = isH3 ? "h3" : "h2";

//       return (
//         <motion.div
//           ref={ref}
//           variants={headingVariants}
//           initial="hidden"
//           animate={controls}
//           className="relative"
//         >
//           <Tag className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4 relative inline-block">
//             {block.text}
//           </Tag>
//           <motion.div
//             className="absolute bottom-0 left-0 h-0.5 bg-[#F5C645]"
//             initial={{ width: "0%" }}
//             animate={controls}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <div className="w-0 h-full bg-[#F5C645]" />
//           </motion.div>
//         </motion.div>
//       );
//     }

//     case "pullquote":
//       return (
//         <motion.blockquote
//           ref={ref}
//           variants={quoteVariants}
//           initial="hidden"
//           animate={controls}
//           className="my-10 pl-6 border-l-4 border-[#F5C645]"
//         >
//           <p className="text-[20px] sm:text-[24px] font-semibold text-black leading-[1.3] tracking-[-0.01em] italic">
//             &ldquo;{block.text}&rdquo;
//           </p>
//           {block.attribution && (
//             <cite className="mt-3 block text-[11px] uppercase tracking-[0.14em] text-black/40 not-italic">
//               — {block.attribution}
//             </cite>
//           )}
//         </motion.blockquote>
//       );

//     case "image": {
//       const imageVariants = {
//         hidden: { opacity: 0, scale: 1.05 },
//         visible: {
//           opacity: 1,
//           scale: 1,
//           transition: { duration: 0.8 }
//         }
//       };

//       return (
//         <motion.figure
//           ref={ref}
//           variants={imageVariants}
//           initial="hidden"
//           animate={controls}
//           className="my-10 -mx-4 sm:-mx-0"
//         >
//           {block.src && (
//             <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[420px]">
//               <Image
//                 src={block.src}
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
//         </motion.figure>
//       );
//     }

//     default:
//       return null;
//   }
// }

// // ─── Animated Prev / Next Navigation ─────────────────────────────────────────
// function PrevNextNav({ prev, next, category }) {
//   const { ref, controls } = useScrollReveal();

//   return (
//     <motion.nav
//       ref={ref}
//       variants={{
//         hidden: { opacity: 0, y: 30 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//       }}
//       initial="hidden"
//       animate={controls}
//       aria-label="Article navigation"
//       className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12"
//     >
//       {prev && (
//         <motion.div
//           className="bg-[#f7f6f2] p-5 border-l-4 border-[#F5C645]"
//           whileHover={{ x: -5 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">← Previous Article</p>
//           <Link
//             href={`/${category}/${prev.slug}`}
//             title={`Read previous: ${prev.title}`}
//             className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
//           >
//             {prev.title}
//           </Link>
//         </motion.div>
//       )}
//       {next && (
//         <motion.div
//           className="bg-[#f7f6f2] p-5 text-right border-r-4 border-[#F5C645]"
//           whileHover={{ x: 5 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">Next Article →</p>
//           <Link
//             href={`/${category}/${next.slug}`}
//             title={`Read next: ${next.title}`}
//             className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
//           >
//             {next.title}
//           </Link>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// }

// // ─── Animated Tags Component ─────────────────────────────────────────────────
// function Tags({ tags }) {
//   if (!tags?.length) return null;

//   return (
//     <div className="mt-12 pt-8 border-t border-black/20 flex flex-wrap gap-2">
//       <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50 mr-2">Tags:</span>
//       {tags.map((tag, index) => (
//         <motion.span
//           key={tag}
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.05, duration: 0.3 }}
//           whileHover={{
//             y: -2,
//             backgroundColor: "#F5C645",
//             color: "black",
//             transition: { duration: 0.2 }
//           }}
//           className="px-3 py-1 text-[10px] uppercase tracking-[0.12em] border border-black text-black transition-colors cursor-pointer"
//         >
//           {tag}
//         </motion.span>
//       ))}
//     </div>
//   );
// }

// // ─── Animated Author Card ────────────────────────────────────────────────────
// function AuthorCard({ author, authorInitials, authorImage, authorSlug }) {
//   const { ref, controls } = useScrollReveal();

//   if (!author) return null;

//   return (
//     <motion.div
//       ref={ref}
//       variants={{
//         hidden: { opacity: 0, scale: 0.95 },
//         visible: {
//           opacity: 1,
//           scale: 1,
//           transition: { duration: 0.6 }
//         }
//       }}
//       initial="hidden"
//       animate={controls}
//       className="mt-4 p-6 bg-[#f7f6f2] flex gap-5 items-start"
//     >
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 300 }}
//         className="relative w-12 h-12 rounded-full overflow-hidden shrink-0"
//       >
//         {authorImage ? (
//           <Image
//             src={authorImage}
//             alt={`${author.name} profile picture`}
//             fill
//             sizes="48px"
//             className="object-cover"
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[15px] font-semibold shrink-0">
//             {authorInitials}
//           </div>
//         )}
//       </motion.div>
//       <div className="flex-1">
//         {authorSlug ? (
//           <Link
//             href={`/authors/${authorSlug}`}
//             title={`View all articles by ${author.name}`}
//             className="no-underline"
//           >
//             <span className="text-[13px] font-bold text-black hover:text-[#4a5a6a] transition-colors">
//               {author.name}
//             </span>
//           </Link>
//         ) : (
//           <span className="text-[13px] font-bold text-black">{author.name}</span>
//         )}
//         <p className="text-[11px] uppercase tracking-wide text-black/40 mb-2">
//           {author.country || "Journalist"}
//         </p>
//         <p className="text-[13px] text-black/60 leading-relaxed">{author.bio}</p>
//         {author.social && (
//           <div className="flex gap-3 mt-3">
//             {author.social.twitter && (
//               <motion.a
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 href={author.social.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title={`Follow ${author.name} on X (Twitter)`}
//                 className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//               >
//                 <FaXTwitter size={14} />
//               </motion.a>
//             )}
//             {author.social.medium && (
//               <motion.a
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 href={author.social.medium}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title={`Follow ${author.name} on Medium`}
//                 className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
//               >
//                 <FaMedium size={14} />
//               </motion.a>
//             )}
//             {author.social.quora && (
//               <motion.a
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 href={author.social.quora}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title={`Follow ${author.name} on Quora`}
//                 className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#B92B27] hover:text-white hover:border-[#B92B27] transition-all duration-300"
//               >
//                 <FaQuora size={14} />
//               </motion.a>
//             )}
//             {author.social.reddit && (
//               <motion.a
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 href={author.social.reddit}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title={`Follow ${author.name} on Reddit`}
//                 className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] transition-all duration-300"
//               >
//                 <FaRedditAlien size={14} />
//               </motion.a>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// // ─── Main Client Component ──────────────────────────────────────────────────
// export default function NewsDetailClient({
//   article,
//   prevArticle,
//   nextArticle,
//   relatedArticles,
//   category,
//   siteUrl,
//   siteName,
// }) {
//   const [shareUrl, setShareUrl] = useState("");
//   const [activeHeading, setActiveHeading] = useState("");
//   const heroRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setShareUrl(window.location.href);

//       // Setup scroll spy for headings
//       const headings = document.querySelectorAll("h2, h3");
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               setActiveHeading(entry.target.id);
//             }
//           });
//         },
//         { rootMargin: "-100px 0px -400px 0px", threshold: 0 }
//       );

//       headings.forEach((heading) => observer.observe(heading));
//       return () => headings.forEach((heading) => observer.unobserve(heading));
//     }
//   }, []);

//   const liveShareUrl = shareUrl || `${siteUrl}/${article.category}/${article.slug}`;

//   // Extract headings for table of contents
//   const headings = article.content?.filter(block =>
//     block.type === "heading" || block.type === "subheading"
//   ) || [];

//   // Animation variants
//   const heroImageVariants = {
//     hidden: { opacity: 0, scale: 1.1 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
//   };

//   const categoryLabelVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } }
//   };

//   const headlineVariants = {
//     hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, delay: 0.2 }
//     }
//   };

//   const excerptVariants = {
//     hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.6, delay: 0.4 }
//     }
//   };

//   const metaVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: 0.6 }
//     }
//   };

//   const breadcrumbVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   const relatedCardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.5 }
//     })
//   };

//   return (
//     <div
//       className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white"
//       itemScope
//       itemType="https://schema.org/NewsArticle"
//     >
//       {/* Microdata for SEO testers - HIDDEN but present */}
//       <div style={{ display: "none" }}>
//         <span itemProp="headline">{article.title}</span>
//         <span itemProp="description">{article.excerpt}</span>
//         {article.heroImage && <span itemProp="image">{article.heroImage}</span>}
//         <span itemProp="datePublished">{article.isoDate}</span>
//         <span itemProp="dateModified">{article.isoDate}</span>
//         <span itemProp="articleSection">{capitalize(article.category)}</span>
//         <span itemProp="keywords">{article.keywords?.join(", ") || article.tags?.join(", ")}</span>
//         <div itemProp="author" itemScope itemType="https://schema.org/Person">
//           <span itemProp="name">{article.author?.name || siteName}</span>
//         </div>
//         <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
//           <span itemProp="name">{siteName}</span>
//           <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
//             <span itemProp="url">{`${siteUrl}/images/logo.webp`}</span>
//           </div>
//         </div>
//         <div itemProp="mainEntityOfPage" itemScope itemType="https://schema.org/WebPage">
//           <span itemProp="url">{`${siteUrl}/${article.category}/${article.slug}`}</span>
//         </div>
//       </div>

//       <Header siteName={siteName} />

//       {/* Animated Breadcrumb */}
//       <motion.div
//         className="border-b border-black/10"
//         variants={breadcrumbVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <nav aria-label="Breadcrumb" className="max-w-[780px] mx-auto px-4 sm:px-8 py-3">
//           <ol
//             className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40 flex-wrap"
//             itemScope
//             itemType="https://schema.org/BreadcrumbList"
//           >
//             <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
//               <Link href="/" title="Go to London News homepage" className="hover:text-black transition-colors no-underline" itemProp="item">
//                 <span itemProp="name">Home</span>
//               </Link>
//               <meta itemProp="position" content="1" />
//             </li>
//             <li aria-hidden="true">/</li>
//             <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
//               <Link href={`/${article.category}`} title={`Browse all ${capitalize(article.category)} articles`} className="hover:text-black transition-colors no-underline" itemProp="item">
//                 <span itemProp="name">{capitalize(article.category)}</span>
//               </Link>
//               <meta itemProp="position" content="2" />
//             </li>
//             <li aria-hidden="true">/</li>
//             <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
//               <span className="text-black/60 line-clamp-1" itemProp="name">{article.title}</span>
//               <meta itemProp="position" content="3" />
//             </li>
//           </ol>
//         </nav>
//       </motion.div>

//       {/* ARTICLE HEADER */}
//       <div className="max-w-[780px] mx-auto px-4 sm:px-8 pt-10 lg:pt-14 w-full">
//         <motion.div
//           className="flex items-center gap-3 mb-5"
//           variants={categoryLabelVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="w-[32px] h-[3px] bg-[#F5C645]" />
//           <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
//             {article.categoryName || capitalize(article.category)} · {article.tags?.[0] || "News"}
//           </span>
//         </motion.div>

//         {/* H1 — article title, top of hierarchy */}
//         <motion.h1
//           variants={headlineVariants}
//           initial="hidden"
//           animate="visible"
//           className="font-['Poppins',sans-serif] font-semibold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.05] tracking-[-0.03em] text-black"
//           itemProp="headline"
//         >
//           {article.title}
//         </motion.h1>

//         <motion.p
//           variants={excerptVariants}
//           initial="hidden"
//           animate="visible"
//           className="mt-5 text-[16px] sm:text-[18px] text-black/60 leading-[1.6] font-light"
//           itemProp="description"
//         >
//           {article.excerpt}
//         </motion.p>

//         {/* Author + Date */}
//         <motion.div
//           variants={metaVariants}
//           initial="hidden"
//           animate="visible"
//           className="mt-6 pt-6 border-t border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//         >
//           <div className="flex items-center gap-3">
//             {article.authorImage ? (
//               <motion.div
//                 className="relative w-9 h-9 rounded-full overflow-hidden shrink-0"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <Image
//                   src={article.authorImage}
//                   alt={`${article.author?.name || "Author"} profile picture`}
//                   fill
//                   sizes="36px"
//                   className="object-cover"
//                 />
//               </motion.div>
//             ) : (
//               <div className="w-9 h-9 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
//                 {article.authorInitials}
//               </div>
//             )}
//             <div>
//               {article.authorSlug ? (
//                 <Link
//                   href={`/authors/${article.authorSlug}`}
//                   title={`View articles by ${article.author?.name}`}
//                   className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors no-underline"
//                   itemProp="author"
//                 >
//                   {article.author?.name || "Staff Writer"}
//                 </Link>
//               ) : (
//                 <span className="text-[13px] font-semibold text-black" itemProp="author">
//                   {article.author?.name || "Staff Writer"}
//                 </span>
//               )}
//               <p className="text-[11px] text-black/40 uppercase tracking-wide">
//                 {article.author?.country || "Journalist"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4 text-[11px] text-black/70 uppercase tracking-wide">
//             <time dateTime={article.isoDate} itemProp="datePublished">{article.formattedDate}</time>
//             <span>·</span>
//             <span itemProp="timeRequired">{article.readTime}</span>
//           </div>
//         </motion.div>

//         {/* Mobile share bar */}
//         <motion.div
//           className="mt-5 sm:hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <ShareBar url={liveShareUrl} title={article.title} />
//         </motion.div>
//       </div>

//       {/* HERO IMAGE */}
//       <motion.div
//         className="max-w-[1100px] mx-auto px-0 sm:px-8 mt-8 w-full"
//         variants={heroImageVariants}
//         initial="hidden"
//         animate="visible"
//         ref={heroRef}
//       >
//         <figure className="w-full">
//           <div className="w-full h-[260px] sm:h-[400px] lg:h-[560px] overflow-hidden bg-black/5 relative">
//             {article.heroImage && (
//               <Image
//                 src={article.heroImage}
//                 alt={article.imageAlt || article.title}
//                 fill
//                 sizes="(max-width: 1100px) 100vw, 1100px"
//                 priority
//                 fetchPriority="high"
//                 className="object-cover"
//                 itemProp="image"
//               />
//             )}
//           </div>
//           {article.imageAlt && (
//             <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
//               {article.imageAlt}
//             </figcaption>
//           )}
//         </figure>
//       </motion.div>

//       {/* ARTICLE BODY */}
//       <div className="max-w-[780px] mx-auto px-4 sm:px-8 mt-10 lg:mt-14 w-full relative">

//         {/* Table of Contents */}
//         {headings.length > 2 && (
//           <motion.div
//             className="mb-8 p-4 bg-[#f7f6f2] rounded-lg"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* H2 inside TOC would break hierarchy — use a styled p instead */}
//             <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/50 mb-3">Table of Contents</p>
//             <ul className="space-y-2">
//               {headings.map((heading, idx) => {
//                 const headingId = heading.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
//                 return (
//                   <motion.li
//                     key={idx}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: idx * 0.05 }}
//                   >
//                     <a
//                       href={`#${headingId}`}
//                       className={`text-[13px] hover:text-[#F5C645] transition-colors ${activeHeading === headingId ? "text-[#F5C645] font-semibold" : "text-black/60"}`}
//                       title={heading.text}
//                     >
//                       {heading.text}
//                     </a>
//                   </motion.li>
//                 );
//               })}
//             </ul>
//           </motion.div>
//         )}

//         {/* Desktop sticky share bar */}
//         <motion.div
//           className="hidden lg:block absolute -left-16 top-0"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.9, duration: 0.5 }}
//         >
//           <div className="sticky top-24">
//             <ShareBar vertical url={liveShareUrl} title={article.title} />
//           </div>
//         </motion.div>

//         <div className="article-body" itemProp="articleBody">
//           {article.content?.map((block, i) => {
//             if (block.type === "heading" || block.type === "subheading") {
//               // SEO FIX — same rule as BodyBlock:
//               // subheading → H2 always
//               // heading level 3 → H3
//               // heading level 2 (or absent) → H2
//               const isH3 = block.type === "heading" && block.level === 3;
//               const Tag = isH3 ? "h3" : "h2";
//               const headingId = block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   transition={{ duration: 0.5 }}
//                   className="relative"
//                 >
//                   <Tag
//                     id={headingId}
//                     className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4 scroll-mt-20 relative inline-block"
//                   >
//                     {block.text}
//                   </Tag>
//                   <motion.div
//                     className="absolute bottom-3 left-0 h-0.5 bg-[#F5C645]"
//                     initial={{ width: "0%" }}
//                     whileInView={{ width: "40%" }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                   />
//                 </motion.div>
//               );
//             }
//             return <BodyBlock key={i} block={block} index={i} />;
//           })}
//         </div>

//         {/* Tags */}
//         <Tags tags={article.tags} />

//         {/* Prev/Next Navigation */}
//         <PrevNextNav prev={prevArticle} next={nextArticle} category={article.category} />

//         {/* Author bio */}
//         <AuthorCard
//           author={article.author}
//           authorInitials={article.authorInitials}
//           authorImage={article.authorImage}
//           authorSlug={article.authorSlug}
//         />
//       </div>

//       {/* RELATED STORIES */}
//       {relatedArticles?.length > 0 && (
//         <motion.section
//           className="w-full bg-black mt-16"
//           aria-label="Related stories"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
//             <motion.div
//               className="flex items-center gap-4 mb-10"
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="w-[40px] h-[3px] bg-[#F5C645]" />
//               {/*
//                 SEO FIX: "Related Stories" label was an H2, which competes with
//                 article body H2s and confuses heading order.
//                 Changed to a styled <p> — visual identical, no heading pollution.
//               */}
//               <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">Related Stories</p>
//               <div className="flex-1 h-px bg-white/10" />
//             </motion.div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
//               {relatedArticles.map((item, idx) => (
//                 <motion.div
//                   key={item.id}
//                   custom={idx}
//                   variants={relatedCardVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true }}
//                   whileHover={{ y: -1 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Link
//                     href={`/${item.category}/${item.slug}`}
//                     title={`Read related: ${item.title}`}
//                     className="group no-underline flex flex-col gap-0"
//                   >
//                     <motion.div
//                       className="overflow-hidden h-[180px] bg-white/5 relative"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {item.image && (
//                         <Image
//                           src={item.image}
//                           alt={item.imageAlt || item.title}
//                           fill
//                           sizes="(max-width: 640px) 100vw, 33vw"
//                           className="object-cover transition-transform duration-700 group-hover:scale-105"
//                           loading="lazy"
//                         />
//                       )}
//                     </motion.div>
//                     <motion.span
//                       className="mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#F5C645]"
//                       whileHover={{ x: 5 }}
//                     >
//                       {item.categoryName || capitalize(item.category)}
//                     </motion.span>
//                     {/* Related card titles use H3 — they sit below the article H2s, correct order */}
//                     <h3 className="mt-2 text-[16px] sm:text-[18px] font-semibold leading-[1.2] text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors line-clamp-2">
//                       {item.title}
//                     </h3>
//                     <time dateTime={item.isoDate || item.date} className="mt-2 text-[11px] text-white/30 uppercase tracking-wide">
//                       {item.formattedDate || new Date(item.date).toLocaleDateString("en-GB")}
//                     </time>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>
//       )}

//       {/* MOOD STRIP */}
//       <motion.section
//         className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12"
//         aria-label="London mood"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="max-w-[1100px] mx-auto">
//           <MoodSurveyWidget variant="compact" />
//         </div>
//       </motion.section>

//       <Footer />
//     </div>
//   );
// }


// components/articledetail/NewsDetailClient.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import {
  FaXTwitter, FaFacebookF, FaWhatsapp,
  FaMedium, FaQuora, FaRedditAlien
} from "react-icons/fa6";
import { FiCopy, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Header from "../../components/Header";
import MoodSurveyWidget from "../MoodSurveyWidget";

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// ─── Scroll Reveal Hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
}

// ─── Share Bar Component ──────────────────────────────────────────────────────
function ShareBar({ vertical = false, url = "", title = "" }) {
  const enc = encodeURIComponent;
  const base = "flex items-center justify-center w-8 h-8 border border-black/20 hover:border-transparent transition-all duration-300 cursor-pointer rounded-full hover:scale-110";
  const wrap = vertical ? "flex flex-col gap-3" : "flex flex-row gap-3";
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const iconVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.2,
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className={wrap} aria-label="Share article">
      <motion.a
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${base} bg-black hover:text-white`}
        title="Share on X (Twitter)"
        aria-label="Share on X"
      >
        <FaXTwitter size={14} />
      </motion.a>
      <motion.a
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${base} bg-[#1877F2] hover:text-white hover:border-[#1877F2]`}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <FaFacebookF size={14} />
      </motion.a>
      <motion.a
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        href={`https://wa.me/?text=${enc(title)}%20${enc(url)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${base} bg-[#25D366] hover:text-white hover:border-[#25D366]`}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={14} />
      </motion.a>
      <motion.button
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`${base} bg-black hover:text-white relative`}
        title="Copy link"
        aria-label="Copy article link"
        onClick={handleCopy}
      >
        <AnimatePresence>
          {copySuccess && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-[10px] absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded whitespace-nowrap z-10"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
        <FiCopy size={14} />
      </motion.button>
    </div>
  );
}

// ─── AT A GLANCE Component ────────────────────────────────────────────────────
function AtAGlanceBlock({ block }) {
  const { ref, controls } = useScrollReveal();

  const rows = block.glanceRows || [];
  if (rows.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      initial="hidden"
      animate={controls}
      className="my-10 bg-[#f7f5f0] border-t-2 border-black"
      role="region"
      aria-label="At a glance summary"
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-black/10">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-black/40 mb-1">
          Summary
        </p>
        <h2 className="text-[22px] sm:text-[26px] font-bold text-black tracking-[-0.02em] uppercase">
          {block.glanceTitle || "At a Glance"}
        </h2>
        {block.glanceSubtitle && (
          <p className="text-[13px] text-black/50 mt-1 font-light leading-relaxed">
            {block.glanceSubtitle}
          </p>
        )}
      </div>

      {/* Rows */}
      <div className="divide-y divide-black/8">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="flex items-start gap-6 px-6 py-4"
          >
            <div className="w-[140px] sm:w-[180px] shrink-0 pt-0.5">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-black/40">
                {row.label}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] sm:text-[15px] text-black/85 leading-relaxed">
                {row.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── FAQ Component ────────────────────────────────────────────────────────────
function FAQBlock({ block }) {
  const { ref, controls } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);

  const items = block.faqItems || [];
  if (items.length === 0) return null;

  function toggle(i) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      initial="hidden"
      animate={controls}
      className="mt-14 mb-10"
      role="region"
      aria-label="Frequently asked questions"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-[40px] h-[3px] bg-[#F5C645] shrink-0" />
        <h2 className="text-[11px] font-bold tracking-[0.20em] uppercase text-black/50">
          {block.faqTitle || "Frequently Asked Questions"}
        </h2>
        <div className="flex-1 h-px bg-black/10" />
      </div>

      {/* FAQ items */}
      <div
        className="border border-black/10 divide-y divide-black/10 rounded-sm"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {items.map((item, i) => (
          <div
            key={i}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left group cursor-pointer hover:bg-black/[0.02] transition-colors"
            >
              <span
                itemProp="name"
                className={`text-[14px] sm:text-[15px] font-semibold leading-snug transition-colors ${
                  openIndex === i ? "text-black" : "text-black/75 group-hover:text-black"
                }`}
              >
                {item.question}
              </span>
              <span className="shrink-0 mt-0.5">
                {openIndex === i ? (
                  <FiChevronUp size={16} className="text-black/50" />
                ) : (
                  <FiChevronDown size={16} className="text-black/30 group-hover:text-black/50 transition-colors" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="px-5 pb-5 pt-1">
                    <div className="w-[28px] h-[2px] bg-[#F5C645] mb-3" />
                    <p
                      itemProp="text"
                      className="text-[14px] text-black/65 leading-[1.75]"
                    >
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Animated Body Block Component ────────────────────────────────────────────
function BodyBlock({ block, index }) {
  const { ref, controls } = useScrollReveal();

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.05 }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  switch (block.type) {
    case "paragraph":
      return (
        <motion.p
          ref={ref}
          variants={paragraphVariants}
          initial="hidden"
          animate={controls}
          className="text-[15px] sm:text-[16px] text-black/80 leading-[1.75] mb-6"
        >
          {block.text}
        </motion.p>
      );

    case "subheading":
    case "heading": {
      const isH3 = block.type === "heading" && block.level === 3;
      const Tag = isH3 ? "h3" : "h2";

      return (
        <motion.div
          ref={ref}
          variants={headingVariants}
          initial="hidden"
          animate={controls}
          className="relative"
        >
          <Tag className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4 relative inline-block">
            {block.text}
          </Tag>
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-[#F5C645]"
            initial={{ width: "0%" }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-0 h-full bg-[#F5C645]" />
          </motion.div>
        </motion.div>
      );
    }

    case "pullquote":
      return (
        <motion.blockquote
          ref={ref}
          variants={quoteVariants}
          initial="hidden"
          animate={controls}
          className="my-10 pl-6 border-l-4 border-[#F5C645]"
        >
          <p className="text-[20px] sm:text-[24px] font-semibold text-black leading-[1.3] tracking-[-0.01em] italic">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="mt-3 block text-[11px] uppercase tracking-[0.14em] text-black/40 not-italic">
              — {block.attribution}
            </cite>
          )}
        </motion.blockquote>
      );

    case "image": {
      const imageVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8 }
        }
      };

      return (
        <motion.figure
          ref={ref}
          variants={imageVariants}
          initial="hidden"
          animate={controls}
          className="my-10 -mx-4 sm:-mx-0"
        >
          {block.src && (
            <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[420px]">
              <Image
                src={block.src}
                alt={block.alt || block.caption || "Article image"}
                fill
                sizes="(max-width: 780px) 100vw, 780px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
          {block.caption && (
            <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );
    }

    // at_a_glance and faq are handled separately — skip them in the body loop
    case "at_a_glance":
    case "faq":
      return null;

    default:
      return null;
  }
}

// ─── Animated Prev / Next Navigation ─────────────────────────────────────────
function PrevNextNav({ prev, next, category }) {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.nav
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      initial="hidden"
      animate={controls}
      aria-label="Article navigation"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12"
    >
      {prev && (
        <motion.div
          className="bg-[#f7f6f2] p-5 border-l-4 border-[#F5C645]"
          whileHover={{ x: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">← Previous Article</p>
          <Link
            href={`/${category}/${prev.slug}`}
            title={`Read previous: ${prev.title}`}
            className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
          >
            {prev.title}
          </Link>
        </motion.div>
      )}
      {next && (
        <motion.div
          className="bg-[#f7f6f2] p-5 text-right border-r-4 border-[#F5C645]"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-[10px] text-black/40 uppercase tracking-wide mb-2">Next Article →</p>
          <Link
            href={`/${category}/${next.slug}`}
            title={`Read next: ${next.title}`}
            className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors leading-snug no-underline block line-clamp-2"
          >
            {next.title}
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ─── Tags Component ───────────────────────────────────────────────────────────
function Tags({ tags }) {
  if (!tags?.length) return null;

  return (
    <div className="mt-12 pt-8 border-t border-black/20 flex flex-wrap gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50 mr-2">Tags:</span>
      {tags.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          whileHover={{
            y: -2,
            backgroundColor: "#F5C645",
            color: "black",
            transition: { duration: 0.2 }
          }}
          className="px-3 py-1 text-[10px] uppercase tracking-[0.12em] border border-black text-black transition-colors cursor-pointer"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Author Card ──────────────────────────────────────────────────────────────
function AuthorCard({ author, authorInitials, authorImage, authorSlug }) {
  const { ref, controls } = useScrollReveal();

  if (!author) return null;

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6 }
        }
      }}
      initial="hidden"
      animate={controls}
      className="mt-4 p-6 bg-[#f7f6f2] flex gap-5 items-start"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-12 h-12 rounded-full overflow-hidden shrink-0"
      >
        {authorImage ? (
          <Image
            src={authorImage}
            alt={`${author.name} profile picture`}
            fill
            sizes="48px"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[15px] font-semibold shrink-0">
            {authorInitials}
          </div>
        )}
      </motion.div>
      <div className="flex-1">
        {authorSlug ? (
          <Link
            href={`/authors/${authorSlug}`}
            title={`View all articles by ${author.name}`}
            className="no-underline"
          >
            <span className="text-[13px] font-bold text-black hover:text-[#4a5a6a] transition-colors">
              {author.name}
            </span>
          </Link>
        ) : (
          <span className="text-[13px] font-bold text-black">{author.name}</span>
        )}
        <p className="text-[11px] uppercase tracking-wide text-black/40 mb-2">
          {author.country || "Journalist"}
        </p>
        <p className="text-[13px] text-black/60 leading-relaxed">{author.bio}</p>
        {author.social && (
          <div className="flex gap-3 mt-3">
            {author.social.twitter && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title={`Follow ${author.name} on X (Twitter)`}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              >
                <FaXTwitter size={14} />
              </motion.a>
            )}
            {author.social.medium && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={author.social.medium}
                target="_blank"
                rel="noopener noreferrer"
                title={`Follow ${author.name} on Medium`}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              >
                <FaMedium size={14} />
              </motion.a>
            )}
            {author.social.quora && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={author.social.quora}
                target="_blank"
                rel="noopener noreferrer"
                title={`Follow ${author.name} on Quora`}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#B92B27] hover:text-white hover:border-[#B92B27] transition-all duration-300"
              >
                <FaQuora size={14} />
              </motion.a>
            )}
            {author.social.reddit && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={author.social.reddit}
                target="_blank"
                rel="noopener noreferrer"
                title={`Follow ${author.name} on Reddit`}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 text-black/40 hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] transition-all duration-300"
              >
                <FaRedditAlien size={14} />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function NewsDetailClient({
  article,
  prevArticle,
  nextArticle,
  relatedArticles,
  category,
  siteUrl,
  siteName,
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [activeHeading, setActiveHeading] = useState("");
  const heroRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);

      const headings = document.querySelectorAll("h2, h3");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        { rootMargin: "-100px 0px -400px 0px", threshold: 0 }
      );

      headings.forEach((heading) => observer.observe(heading));
      return () => headings.forEach((heading) => observer.unobserve(heading));
    }
  }, []);

  const liveShareUrl = shareUrl || `${siteUrl}/${article.category}/${article.slug}`;

  // ── Separate block types ──────────────────────────────────────────────────
  const content = article.content || [];

  // At a Glance: first occurrence only, shown below hero image
  const atAGlanceBlock = content.find(b => b.type === "at_a_glance") || null;

  // FAQ blocks: shown after article body, before tags
  const faqBlocks = content.filter(b => b.type === "faq");

  // Body blocks: everything that is NOT at_a_glance or faq
  const bodyBlocks = content.filter(b => b.type !== "at_a_glance" && b.type !== "faq");

  // Extract headings for table of contents (from body blocks only)
  const headings = bodyBlocks.filter(block =>
    block.type === "heading" || block.type === "subheading"
  );

  // Animation variants
  const heroImageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  const categoryLabelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } }
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: 0.2 }
    }
  };

  const excerptVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: 0.4 }
    }
  };

  const metaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 }
    }
  };

  const breadcrumbVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const relatedCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <div
      className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white"
      itemScope
      itemType="https://schema.org/NewsArticle"
    >
      {/* Microdata — hidden */}
      <div style={{ display: "none" }}>
        <span itemProp="headline">{article.title}</span>
        <span itemProp="description">{article.excerpt}</span>
        {article.heroImage && <span itemProp="image">{article.heroImage}</span>}
        <span itemProp="datePublished">{article.isoDate}</span>
        <span itemProp="dateModified">{article.isoDate}</span>
        <span itemProp="articleSection">{capitalize(article.category)}</span>
        <span itemProp="keywords">{article.keywords?.join(", ") || article.tags?.join(", ")}</span>
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">{article.author?.name || siteName}</span>
        </div>
        <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">{siteName}</span>
          <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <span itemProp="url">{`${siteUrl}/images/logo.webp`}</span>
          </div>
        </div>
        <div itemProp="mainEntityOfPage" itemScope itemType="https://schema.org/WebPage">
          <span itemProp="url">{`${siteUrl}/${article.category}/${article.slug}`}</span>
        </div>
      </div>

      <Header siteName={siteName} />

      {/* Breadcrumb */}
      <motion.div
        className="border-b border-black/10"
        variants={breadcrumbVariants}
        initial="hidden"
        animate="visible"
      >
        <nav aria-label="Breadcrumb" className="max-w-[780px] mx-auto px-4 sm:px-8 py-3">
          <ol
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40 flex-wrap"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <Link href="/" title="Go to London News homepage" className="hover:text-black transition-colors no-underline" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <Link href={`/${article.category}`} title={`Browse all ${capitalize(article.category)} articles`} className="hover:text-black transition-colors no-underline" itemProp="item">
                <span itemProp="name">{capitalize(article.category)}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <span className="text-black/60 line-clamp-1" itemProp="name">{article.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </motion.div>

      {/* Article Header */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 pt-10 lg:pt-14 w-full">
        <motion.div
          className="flex items-center gap-3 mb-5"
          variants={categoryLabelVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-[32px] h-[3px] bg-[#F5C645]" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
            {article.categoryName || capitalize(article.category)} · {article.tags?.[0] || "News"}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-['Poppins',sans-serif] font-semibold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.05] tracking-[-0.03em] text-black"
          itemProp="headline"
        >
          {article.title}
        </motion.h1>

        <motion.p
          variants={excerptVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-[16px] sm:text-[18px] text-black/60 leading-[1.6] font-light"
          itemProp="description"
        >
          {article.excerpt}
        </motion.p>

        {/* Author + Date */}
        <motion.div
          variants={metaVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 pt-6 border-t border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            {article.authorImage ? (
              <motion.div
                className="relative w-9 h-9 rounded-full overflow-hidden shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={article.authorImage}
                  alt={`${article.author?.name || "Author"} profile picture`}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#4a5a6a] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                {article.authorInitials}
              </div>
            )}
            <div>
              {article.authorSlug ? (
                <Link
                  href={`/authors/${article.authorSlug}`}
                  title={`View articles by ${article.author?.name}`}
                  className="text-[13px] font-semibold text-black hover:text-[#4a5a6a] transition-colors no-underline"
                  itemProp="author"
                >
                  {article.author?.name || "Staff Writer"}
                </Link>
              ) : (
                <span className="text-[13px] font-semibold text-black" itemProp="author">
                  {article.author?.name || "Staff Writer"}
                </span>
              )}
              <p className="text-[11px] text-black/40 uppercase tracking-wide">
                {article.author?.country || "Journalist"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-black/70 uppercase tracking-wide">
            <time dateTime={article.isoDate} itemProp="datePublished">{article.formattedDate}</time>
            <span>·</span>
            <span itemProp="timeRequired">{article.readTime}</span>
          </div>
        </motion.div>

        {/* Mobile share bar */}
        <motion.div
          className="mt-5 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ShareBar url={liveShareUrl} title={article.title} />
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        className="max-w-[1100px] mx-auto px-0 sm:px-8 mt-8 w-full"
        variants={heroImageVariants}
        initial="hidden"
        animate="visible"
        ref={heroRef}
      >
        <figure className="w-full">
          <div className="w-full h-[260px] sm:h-[400px] lg:h-[560px] overflow-hidden bg-black/5 relative">
            {article.heroImage && (
              <Image
                src={article.heroImage}
                alt={article.imageAlt || article.title}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                priority
                fetchPriority="high"
                className="object-cover"
                itemProp="image"
              />
            )}
          </div>
          {article.imageAlt && (
            <figcaption className="mt-3 text-[11px] text-black/40 leading-relaxed px-4 sm:px-0">
              {article.imageAlt}
            </figcaption>
          )}
        </figure>
      </motion.div>

      {/* ── AT A GLANCE — shown below hero image ── */}
      {atAGlanceBlock && (
        <div className="max-w-[780px] mx-auto px-4 sm:px-8 w-full">
          <AtAGlanceBlock block={atAGlanceBlock} />
        </div>
      )}

      {/* Article Body */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-8 mt-10 lg:mt-14 w-full relative">

        {/* Table of Contents */}
        {headings.length > 2 && (
          <motion.div
            className="mb-8 p-4 bg-[#f7f6f2] rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/50 mb-3">Table of Contents</p>
            <ul className="space-y-2">
              {headings.map((heading, idx) => {
                const headingId = heading.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      href={`#${headingId}`}
                      className={`text-[13px] hover:text-[#F5C645] transition-colors ${activeHeading === headingId ? "text-[#F5C645] font-semibold" : "text-black/60"}`}
                      title={heading.text}
                    >
                      {heading.text}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* Desktop sticky share bar */}
        <motion.div
          className="hidden lg:block absolute -left-16 top-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="sticky top-24">
            <ShareBar vertical url={liveShareUrl} title={article.title} />
          </div>
        </motion.div>

        {/* Body content — excludes at_a_glance and faq */}
        <div className="article-body" itemProp="articleBody">
          {bodyBlocks.map((block, i) => {
            if (block.type === "heading" || block.type === "subheading") {
              const isH3 = block.type === "heading" && block.level === 3;
              const Tag = isH3 ? "h3" : "h2";
              const headingId = block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Tag
                    id={headingId}
                    className="text-[20px] sm:text-[24px] font-semibold text-black tracking-[-0.02em] mt-10 mb-4 scroll-mt-20 relative inline-block"
                  >
                    {block.text}
                  </Tag>
                  <motion.div
                    className="absolute bottom-3 left-0 h-0.5 bg-[#F5C645]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </motion.div>
              );
            }
            return <BodyBlock key={i} block={block} index={i} />;
          })}
        </div>

        {/* ── FAQ blocks — shown after article body ── */}
        {faqBlocks.map((block, i) => (
          <FAQBlock key={i} block={block} />
        ))}

        {/* Tags */}
        <Tags tags={article.tags} />

        {/* Prev/Next Navigation */}
        <PrevNextNav prev={prevArticle} next={nextArticle} category={article.category} />

        {/* Author bio */}
        <AuthorCard
          author={article.author}
          authorInitials={article.authorInitials}
          authorImage={article.authorImage}
          authorSlug={article.authorSlug}
        />
      </div>

      {/* Related Stories */}
      {relatedArticles?.length > 0 && (
        <motion.section
          className="w-full bg-black mt-16"
          aria-label="Related stories"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-[40px] h-[3px] bg-[#F5C645]" />
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">Related Stories</p>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedArticles.map((item, idx) => (
                <motion.div
                  key={item.id}
                  custom={idx}
                  variants={relatedCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={`/${item.category}/${item.slug}`}
                    title={`Read related: ${item.title}`}
                    className="group no-underline flex flex-col gap-0"
                  >
                    <motion.div
                      className="overflow-hidden h-[180px] bg-white/5 relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </motion.div>
                    <motion.span
                      className="mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#F5C645]"
                      whileHover={{ x: 5 }}
                    >
                      {item.categoryName || capitalize(item.category)}
                    </motion.span>
                    <h3 className="mt-2 text-[16px] sm:text-[18px] font-semibold leading-[1.2] text-white tracking-[-0.01em] group-hover:text-white/70 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <time dateTime={item.isoDate || item.date} className="mt-2 text-[11px] text-white/30 uppercase tracking-wide">
                      {item.formattedDate || new Date(item.date).toLocaleDateString("en-GB")}
                    </time>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Mood Strip */}
      <motion.section
        className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12"
        aria-label="London mood"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1100px] mx-auto">
          <MoodSurveyWidget variant="compact" />
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}