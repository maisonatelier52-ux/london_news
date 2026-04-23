// // app/authors/[slug]/page.jsx
// "use client";

// import Head from "next/head";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import {
//   FaXTwitter, FaMedium, FaQuora, FaRedditAlien, FaGlobe,
// } from "react-icons/fa6";
// import Footer from "@/components/Footer";

// // ─── Config ───────────────────────────────────────────────────────────────────
// const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || "https://www.yourdomain.com";
// const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

// // ─── Static Authors Data ──────────────────────────────────────────────────────
// const AUTHORS_DATA = [
//   {
//     id: 1,
//     name: "Claire Donovan",
//     gender: "Female",
//     profileImage: "/images/authors/claire_donovan.webp",
//     country: "USA",
//     role: "International Correspondent",
//     bio: "Claire Donovan is a seasoned international correspondent with 12 years of experience reporting on global events, humanitarian crises, and cross-border developments. A Columbia Journalism School graduate, she has reported from conflict zones, refugee camps, and diplomatic summits across five continents, offering grounded perspectives on how world events shape everyday lives.",
//     websiteLink: "https://clairedonovanworld.com",
//     categories: ["world", "geo-politics"],
//     articlesCount: 47,
//     social: {
//       twitter: "https://x.com/clairedono26",
//       quora:   "https://www.quora.com/profile/Clairedonovan",
//       reddit:  "https://www.reddit.com/user/clairedonovan26/",
//       medium:  "https://medium.com/@clairedonovan_57602",
//     },
//     articles: [
//       {
//         id: 101,
//         slug: "un-summit-global-climate-pledge",
//         category: "world",
//         title: "World Leaders Sign Historic Climate Pledge at UN Emergency Summit",
//         excerpt: "Delegates from 140 nations gathered in Geneva to sign a binding agreement on carbon neutrality, marking the most significant multilateral climate action in a decade.",
//         image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
//         date: "14/03/2024",
//         readTime: "6 min read",
//       },
//       {
//         id: 102,
//         slug: "refugee-crisis-mediterranean-2024",
//         category: "world",
//         title: "Mediterranean Refugee Crisis Deepens as EU Struggles to Respond",
//         excerpt: "Record numbers of migrants are crossing the central Mediterranean route, overwhelming reception centres and testing the limits of European solidarity.",
//         image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg",
//         date: "28/02/2024",
//         readTime: "8 min read",
//       },
//       {
//         id: 103,
//         slug: "nato-eastern-flank-expansion",
//         category: "geo-politics",
//         title: "NATO's Eastern Flank: How the Alliance is Reshaping Its Footprint",
//         excerpt: "From the Baltic to the Black Sea, NATO is repositioning troops and infrastructure in ways not seen since the Cold War.",
//         image: "https://images.pexels.com/photos/50713/soldiers-military-usa-war-50713.jpeg",
//         date: "05/01/2024",
//         readTime: "7 min read",
//       },
//       {
//         id: 104,
//         slug: "china-taiwan-strait-tensions",
//         category: "geo-politics",
//         title: "Taiwan Strait Tensions Rise as China Conducts Largest Ever Drills",
//         excerpt: "Beijing's military exercises around Taiwan have prompted emergency diplomatic talks between Washington and its Indo-Pacific allies.",
//         image: "https://images.pexels.com/photos/5765561/pexels-photo-5765561.jpeg",
//         date: "19/12/2023",
//         readTime: "5 min read",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "James Calloway",
//     gender: "Male",
//     profileImage: "/images/authors/james_calloway.webp",
//     country: "USA",
//     role: "War Correspondent",
//     bio: "James Calloway is a veteran war correspondent with over 18 years of frontline reporting experience. A former U.S. Marine turned journalist, he has embedded with military units across the Middle East, Eastern Europe, and Africa, delivering ground-level accounts of armed conflicts, military strategy, and the human cost of war.",
//     websiteLink: "https://jamescallowayfrontline.com",
//     categories: ["war-conflict"],
//     articlesCount: 63,
//     social: {
//       twitter: "https://x.com/jamescallo26",
//       quora:   "https://www.quora.com/profile/Jamescalloway-1",
//       reddit:  "https://www.reddit.com/user/jamescalloway26/",
//       medium:  "https://medium.com/@jamescalloway_74585",
//     },
//     articles: [
//       {
//         id: 201,
//         slug: "ukraine-frontline-report-bakhmut",
//         category: "war-conflict",
//         title: "On the Ground in Bakhmut: The Battle That Defined a Generation of Soldiers",
//         excerpt: "Embedded with Ukrainian forces for three weeks, a raw account of street-by-street combat, soldier morale, and the psychological toll of modern urban warfare.",
//         image: "https://images.pexels.com/photos/5765827/pexels-photo-5765827.jpeg",
//         date: "22/04/2024",
//         readTime: "12 min read",
//       },
//       {
//         id: 202,
//         slug: "sudan-civil-war-humanitarian",
//         category: "war-conflict",
//         title: "Sudan's Forgotten War: A Humanitarian Catastrophe Unfolding in Silence",
//         excerpt: "As fighting between the SAF and RSF enters its second year, millions are displaced and aid corridors are collapsing. The world, largely, isn't watching.",
//         image: "https://images.pexels.com/photos/3872373/pexels-photo-3872373.jpeg",
//         date: "10/03/2024",
//         readTime: "9 min read",
//       },
//       {
//         id: 203,
//         slug: "israel-gaza-idf-operations",
//         category: "war-conflict",
//         title: "Inside the IDF's Ground Operations: Strategy, Risk, and International Law",
//         excerpt: "Military analysts and legal experts weigh in on the operational choices being made in Gaza, and what precedents they set for future urban conflicts.",
//         image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
//         date: "14/01/2024",
//         readTime: "10 min read",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Diana Reeves",
//     gender: "Female",
//     profileImage: "/images/authors/diana_reeves.webp",
//     country: "USA",
//     role: "Geopolitical Analyst",
//     bio: "Diana Reeves is a geopolitical analyst and foreign affairs journalist with a background in international relations from Johns Hopkins SAIS. She specializes in power dynamics between major world powers, territorial disputes, energy politics, and the shifting alliances reshaping the global order.",
//     websiteLink: "https://dianareevesgeopolitics.com",
//     categories: ["geo-politics", "world"],
//     articlesCount: 38,
//     social: {
//       twitter: "https://x.com/dianareeve26",
//       quora:   "https://www.quora.com/profile/Dianareeves",
//       reddit:  "https://www.reddit.com/user/dianareeves26/",
//       medium:  "https://medium.com/@dianareeves_73085",
//     },
//     articles: [
//       {
//         id: 301,
//         slug: "brics-expansion-dollar-dominance",
//         category: "geo-politics",
//         title: "BRICS Expansion and the Coming Challenge to Dollar Dominance",
//         excerpt: "With six new members joining the bloc, analysts are asking whether a credible alternative to the dollar-based financial system is finally taking shape.",
//         image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
//         date: "03/05/2024",
//         readTime: "8 min read",
//       },
//       {
//         id: 302,
//         slug: "arctic-new-geopolitical-frontier",
//         category: "geo-politics",
//         title: "The Arctic: How Melting Ice Is Opening a New Geopolitical Frontier",
//         excerpt: "Russia, China, and NATO members are positioning themselves for control of the world's last great strategic frontier as shipping lanes open and resource extraction becomes viable.",
//         image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
//         date: "18/02/2024",
//         readTime: "7 min read",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Nathan Cole",
//     gender: "Male",
//     profileImage: "/images/authors/nathan_cole.webp",
//     country: "USA",
//     role: "Cybersecurity Journalist",
//     bio: "Nathan Cole is a cybersecurity journalist and former ethical hacker with a decade of experience covering data breaches, state-sponsored cyber attacks, ransomware, and digital infrastructure vulnerabilities. A certified information security professional, he translates highly technical cyber threats into critical reporting for general audiences.",
//     websiteLink: "https://nathancolecyber.com",
//     categories: ["cybersecurity"],
//     articlesCount: 52,
//     social: {
//       twitter: "https://x.com/nathancole26",
//       quora:   "https://www.quora.com/profile/Nathancole-1",
//       reddit:  "https://www.reddit.com/user/nathancole26/",
//       medium:  "https://medium.com/@nathancole_52297",
//     },
//     articles: [
//       {
//         id: 401,
//         slug: "volt-typhoon-us-infrastructure",
//         category: "cybersecurity",
//         title: "Volt Typhoon: How Chinese Hackers Quietly Burrowed into US Infrastructure",
//         excerpt: "A CISA investigation has revealed that a Chinese state-sponsored group has been living inside critical US infrastructure networks for years — and may still be there.",
//         image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
//         date: "29/04/2024",
//         readTime: "9 min read",
//       },
//       {
//         id: 402,
//         slug: "ransomware-nhs-attack-2024",
//         category: "cybersecurity",
//         title: "Inside the NHS Ransomware Attack: How a Single Vendor Exposed Millions",
//         excerpt: "The Synnovis breach that crippled London hospitals reveals uncomfortable truths about third-party risk, NHS IT procurement, and the price of under-investment in cyber resilience.",
//         image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
//         date: "14/06/2024",
//         readTime: "11 min read",
//       },
//       {
//         id: 403,
//         slug: "ai-deepfake-election-interference",
//         category: "cybersecurity",
//         title: "AI Deepfakes Are Now a Genuine Election Security Threat",
//         excerpt: "From robocalls to fabricated video clips, AI-generated disinformation is arriving faster than regulators and platforms can respond — and election officials are alarmed.",
//         image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
//         date: "07/03/2024",
//         readTime: "7 min read",
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "Monica Voss",
//     gender: "Female",
//     profileImage: "/images/authors/monica_voss.webp",
//     country: "USA",
//     role: "Investigative Journalist",
//     bio: "Monica Voss is an investigative journalist and digital underworld researcher specializing in dark web marketplaces, illicit online networks, cryptocurrency crime, and anonymous trafficking operations. With extensive experience working alongside federal law enforcement agencies, she exposes the hidden layers of the internet that most never see.",
//     websiteLink: "https://monicavossdarkweb.com",
//     categories: ["dark-web", "investigation"],
//     articlesCount: 29,
//     social: {
//       twitter: "",
//       quora:   "https://www.quora.com/profile/Monicavoss",
//       reddit:  "https://www.reddit.com/user/monicavoss26/",
//       medium:  "https://medium.com/@monicavoss",
//     },
//     articles: [
//       {
//         id: 501,
//         slug: "dark-web-fentanyl-markets-2024",
//         category: "dark-web",
//         title: "The Dark Web Fentanyl Pipeline: From Chinese Labs to UK Letterboxes",
//         excerpt: "An eight-month investigation traces the supply chain of synthetic opioids moving through encrypted marketplaces, cryptocurrency mixers, and ordinary postal services.",
//         image: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg",
//         date: "11/05/2024",
//         readTime: "14 min read",
//       },
//       {
//         id: 502,
//         slug: "crypto-money-laundering-networks",
//         category: "dark-web",
//         title: "Crypto Laundering Networks Are More Sophisticated Than Ever",
//         excerpt: "Despite high-profile takedowns, blockchain forensics firms say illicit crypto flows have reached record highs — with new mixing techniques defeating most detection tools.",
//         image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
//         date: "02/02/2024",
//         readTime: "8 min read",
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "Derek Holloway",
//     gender: "Male",
//     profileImage: "/images/authors/derek_holloway.webp",
//     country: "USA",
//     role: "Investigative Reporter",
//     bio: "Derek Holloway is a hard-hitting investigative journalist with 14 years of experience exposing institutional corruption, political misconduct, and corporate cover-ups. A two-time IRE Award winner, he has led major investigations into government fraud, financial schemes, and abuse of power that have triggered congressional hearings and federal prosecutions.",
//     websiteLink: "https://derekhollowayi nvestigates.com",
//     categories: ["investigation"],
//     articlesCount: 41,
//     social: {
//       twitter: "",
//       quora:   "https://www.quora.com/profile/Derekholloway",
//       reddit:  "https://www.reddit.com/user/derekholloway26/",
//       medium:  "https://medium.com/@derekholloway",
//     },
//     articles: [
//       {
//         id: 601,
//         slug: "pentagon-contractor-fraud-scheme",
//         category: "investigation",
//         title: "The Pentagon Contractor Fraud That Went Undetected for Seven Years",
//         excerpt: "Internal documents and whistleblower testimony reveal how a defence contractor systematically overbilled the US government by hundreds of millions while auditors looked the other way.",
//         image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg",
//         date: "30/04/2024",
//         readTime: "13 min read",
//       },
//       {
//         id: 602,
//         slug: "uk-post-office-horizon-cover-up",
//         category: "investigation",
//         title: "The Horizon Cover-Up: What Executives Knew and When They Knew It",
//         excerpt: "New documents obtained under FOI reveal that senior Post Office executives were warned about Horizon software failures years before the first subpostmaster was prosecuted.",
//         image: "https://images.pexels.com/photos/955447/pexels-photo-955447.jpeg",
//         date: "22/01/2024",
//         readTime: "10 min read",
//       },
//       {
//         id: 603,
//         slug: "city-council-corruption-london",
//         category: "investigation",
//         title: "Inside the London Council Corruption Scandal Nobody Is Talking About",
//         excerpt: "A three-year investigation has uncovered a pattern of planning decisions, donations, and directorships that raises serious questions about the conduct of elected officials.",
//         image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
//         date: "08/11/2023",
//         readTime: "11 min read",
//       },
//     ],
//   },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const slugify = (str = "") =>
//   str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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

// // ─── SEO Head ─────────────────────────────────────────────────────────────────
// function AuthorSEOHead({ author }) {
//   if (!author) return null;
//   const slug         = slugify(author.name);
//   const canonicalUrl = `${SITE_URL}/authors/${slug}`;
//   const image        = author.profileImage?.startsWith("http")
//     ? author.profileImage
//     : `${SITE_URL}${author.profileImage || "/images/og-default.webp"}`;
//   const title        = `${author.name} — ${author.role} | ${SITE_NAME}`;
//   const description  = author.bio?.slice(0, 160) || `Read articles by ${author.name} on ${SITE_NAME}.`;

//   const personJsonLd = {
//     "@context": "https://schema.org",
//     "@type": "Person",
//     name: author.name,
//     url: canonicalUrl,
//     image,
//     description,
//     jobTitle: author.role,
//     worksFor: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL },
//     sameAs: [
//       author.social?.twitter,
//       author.social?.medium,
//       author.social?.quora,
//       author.social?.reddit,
//       author.websiteLink,
//     ].filter(Boolean),
//   };

//   const breadcrumbJsonLd = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       { "@type": "ListItem", position: 1, name: "Home",    item: SITE_URL },
//       { "@type": "ListItem", position: 2, name: "Authors", item: `${SITE_URL}/authors` },
//       { "@type": "ListItem", position: 3, name: author.name, item: canonicalUrl },
//     ],
//   };

//   return (
//     <Head>
//       <title>{title}</title>
//       <meta name="description"        content={description} />
//       <link rel="canonical"           href={canonicalUrl} />
//       <meta name="robots"             content="index, follow" />
//       <meta property="og:type"        content="profile" />
//       <meta property="og:site_name"   content={SITE_NAME} />
//       <meta property="og:title"       content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:url"         content={canonicalUrl} />
//       <meta property="og:image"       content={image} />
//       <meta name="twitter:card"       content="summary_large_image" />
//       <meta name="twitter:title"      content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image"      content={image} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
//     </Head>
//   );
// }

// // ─── Site Header ──────────────────────────────────────────────────────────────
// function SiteHeader() {
//   const NAV_ITEMS = ["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business"];
//   return (
//     <header
//       className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
//       style={{
//         backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-[0]" />
//       <div className="flex lg:hidden items-center justify-between w-full relative z-10">
//         <Link href="/" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">
//           {SITE_NAME}
//         </Link>
//         <a href="#" className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline">
//           Subscribe
//         </a>
//       </div>
//       <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center relative z-10">
//         {NAV_ITEMS.map((n) => (
//           <a
//             key={n}
//             href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}
//             className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
//           >
//             {n}
//           </a>
//         ))}
//       </nav>
//       <a
//         href="#"
//         className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10"
//       >
//         Customise / Subscribe
//       </a>
//     </header>
//   );
// }

// // ─── Breadcrumb ───────────────────────────────────────────────────────────────
// function Breadcrumb({ name }) {
//   return (
//     <div className="border-b border-black/10">
//       <nav className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
//         <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40">
//           <li>
//             <Link href="/" className="hover:text-black transition-colors no-underline text-black/40">
//               Home
//             </Link>
//           </li>
//           <li aria-hidden="true">/</li>
//           <li className="text-black/40">Authors</li>
//           <li aria-hidden="true">/</li>
//           <li className="text-black/70">{name}</li>
//         </ol>
//       </nav>
//     </div>
//   );
// }

// // ─── Article Card ─────────────────────────────────────────────────────────────
// function ArticleCard({ article, index }) {
//   const isWide = index === 0;
//   return (
//     <Link
//       href={`/${article.category}/${article.slug}`}
//       className={`group flex flex-col no-underline ${isWide ? "sm:col-span-2 lg:col-span-2" : ""}`}
//     >
//       <div
//         className={`overflow-hidden relative bg-black/5 ${
//           isWide ? "h-[260px] sm:h-[340px]" : "h-[190px] sm:h-[210px]"
//         }`}
//       >
//         <Image
//           src={article.image}
//           alt={article.title}
//           fill
//           sizes={isWide ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
//           className="object-cover transition-transform duration-700 group-hover:scale-105"
//           loading={index === 0 ? "eager" : "lazy"}
//         />
//         {/* Yellow category badge */}
//         <span className="absolute top-3 left-3 bg-[#F5C645] text-black text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-1">
//           {capitalize(article.category.replace(/-/g, " "))}
//         </span>
//       </div>

//       <div className="mt-3">
//         <h3
//           className={`font-['Poppins',sans-serif] font-semibold leading-[1.1] tracking-[-0.02em] text-black group-hover:text-[#4a5a6a] transition-colors ${
//             isWide ? "text-[20px] sm:text-[24px]" : "text-[15px] sm:text-[17px]"
//           }`}
//         >
//           {article.title}
//         </h3>
//         {isWide && (
//           <p className="mt-2 text-[13px] text-black/50 leading-relaxed line-clamp-2">
//             {article.excerpt}
//           </p>
//         )}
//         <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-wide text-black/30">
//           <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
//           {article.readTime && (
//             <>
//               <span>·</span>
//               <span>{article.readTime}</span>
//             </>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function AuthorPage() {
//   const params = useParams();
//   const slug   = params?.slug;

//   // Match author from static data by slug
//   const author = AUTHORS_DATA.find((a) => slugify(a.name) === slug) || null;

//   // ── Not found ──
//   if (!author) {
//     return (
//       <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
//         <SiteHeader />
//         <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-24 text-center">
//           <h1 className="font-['Poppins',sans-serif] text-[28px] font-semibold text-black mb-4">
//             Author Not Found
//           </h1>
//           <p className="text-black/50 mb-8">This author profile doesn't exist.</p>
//           <Link href="/" className="text-[#F5C645] underline text-[14px]">
//             Back to Home
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const authorInitials = author.name.split(" ").map((n) => n[0]).join("");

//   const socialLinks = [
//     author.social?.twitter && { href: author.social.twitter, icon: <FaXTwitter size={14} />, label: "X / Twitter" },
//     author.social?.medium  && { href: author.social.medium,  icon: <FaMedium size={14} />,   label: "Medium" },
//     author.social?.quora   && { href: author.social.quora,   icon: <FaQuora size={14} />,    label: "Quora" },
//     author.social?.reddit  && { href: author.social.reddit,  icon: <FaRedditAlien size={14} />, label: "Reddit" },
//     author.websiteLink     && { href: author.websiteLink,    icon: <FaGlobe size={14} />,    label: "Website" },
//   ].filter(Boolean);

//   return (
//     <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
//       <AuthorSEOHead author={author} />

//       <SiteHeader />
//       <Breadcrumb name={author.name} />

//       {/* ══════════════════════════════════════════════════
//           HERO — sky bg, big Poppins name in yellow
//          ══════════════════════════════════════════════════ */}
//       <section
//         className="relative w-full overflow-hidden"
//         style={{
//           backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* Gradient — blue top to dark bottom, same as homepage */}
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-black/70 z-0" />

//         <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 lg:pt-20 pb-0">
//           <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">

//             {/* Profile photo — yellow border, square crop */}
//             <div className="shrink-0">
//               <div className="relative w-[128px] h-[128px] sm:w-[168px] sm:h-[168px] lg:w-[208px] lg:h-[208px] overflow-hidden border-[4px] border-[#F5C645]">
//                 {author.profileImage ? (
//                   <Image
//                     src={author.profileImage}
//                     alt={`${author.name} — author photo`}
//                     fill
//                     sizes="208px"
//                     className="object-cover"
//                     priority
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-[#2a3a4a] flex items-center justify-center text-[#F5C645] font-['Poppins',sans-serif] font-bold text-[48px]">
//                     {authorInitials}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Name + role + tags + socials */}
//             <div className="flex flex-col pb-10 lg:pb-14">

//               {/* Eyebrow — yellow bar + role */}
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-[40px] h-[3px] bg-[#F5C645]" />
//                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/55">
//                   {author.role} · {author.country}
//                 </span>
//               </div>

//               {/* Big name — same weight/tracking as "London News" on homepage */}
//               <h1
//                 className="font-['Poppins',sans-serif] font-semibold leading-[0.88] tracking-[-0.05em] text-[#F5C645]"
//                 style={{
//                   fontSize: "clamp(38px, 6.5vw, 86px)",
//                   textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14)",
//                 }}
//               >
//                 {author.name}
//               </h1>

//               {/* Category tags */}
//               <div className="flex flex-wrap gap-2 mt-5">
//                 {author.categories.map((cat) => (
//                   <Link
//                     key={cat}
//                     href={`/${cat}`}
//                     className="text-[9px] font-bold tracking-[0.18em] uppercase bg-white/10 border border-white/20 text-white/60 px-3 py-1.5 hover:bg-[#F5C645] hover:text-black hover:border-[#F5C645] transition-all no-underline"
//                   >
//                     {capitalize(cat.replace(/-/g, " "))}
//                   </Link>
//                 ))}
//               </div>

//               {/* Social icon row */}
//               {socialLinks.length > 0 && (
//                 <div className="flex items-center gap-3 mt-5">
//                   {socialLinks.map(({ href, icon, label }) => (
//                     <a
//                       key={label}
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={label}
//                       className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/45 hover:border-[#F5C645] hover:text-[#F5C645] transition-all"
//                     >
//                       {icon}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════
//           BIO — full-width black block, matches homepage
//          ══════════════════════════════════════════════════ */}
//       <section className="w-full bg-black">
//         <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16">
//           <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">

//             {/* Bio text */}
//             <div className="flex-1">
//               <div className="w-[60px] h-[4px] bg-[#F5C645] mb-6" />
//               <p className="text-[15px] sm:text-[16px] text-white/65 leading-[1.85] max-w-[680px]">
//                 {author.bio}
//               </p>
//             </div>

//             {/* Stats column */}
//             <div className="shrink-0 flex flex-row lg:flex-col gap-8 lg:gap-8 items-start lg:items-end">

//               {/* Article count — big Poppins number like mood % on homepage */}
//               <div className="lg:text-right">
//                 <p
//                   className="font-['Poppins',sans-serif] font-semibold leading-none tracking-[-0.04em] text-[#F5C645]"
//                   style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
//                 >
//                   {author.articlesCount}
//                 </p>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">
//                   Published
//                 </p>
//               </div>

//               {/* Country */}
//               <div className="lg:text-right">
//                 <p className="font-['Poppins',sans-serif] font-semibold text-[20px] text-white leading-none">
//                   {author.country}
//                 </p>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">
//                   Based In
//                 </p>
//               </div>

//               {/* Website CTA */}
//               {author.websiteLink && (
//                 <a
//                   href={author.websiteLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5C645] border border-[#F5C645]/30 px-4 py-2.5 hover:border-[#F5C645] hover:bg-[#F5C645]/5 transition-all no-underline whitespace-nowrap"
//                 >
//                   Visit Website ↗
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════
//           ARTICLES GRID
//          ══════════════════════════════════════════════════ */}
//       <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20 w-full">

//         {/* Section header */}
//         <div className="flex items-center gap-4 mb-10">
//           <div className="w-[60px] h-[3px] bg-[#F5C645]" />
//           <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
//             Stories by {author.name.split(" ")[0]}
//           </span>
//           <div className="flex-1 h-px bg-black/10" />
//           <span className="text-[10px] text-black/25 uppercase tracking-wide shrink-0">
//             {author.articles.length} {author.articles.length === 1 ? "piece" : "pieces"}
//           </span>
//         </div>

//         {author.articles.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
//             {author.articles.map((article, i) => (
//               <ArticleCard key={article.id} article={article} index={i} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-[15px] text-black/35">No published articles yet.</p>
//         )}
//       </section>

//       {/* ══════════════════════════════════════════════════
//           FOLLOW STRIP — black, labelled social links
//          ══════════════════════════════════════════════════ */}
//       {socialLinks.length > 0 && (
//         <section className="w-full bg-black border-t border-white/5 py-10 px-4 sm:px-8 lg:px-12">
//           <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//             <div>
//               <p className="text-[13px] font-bold uppercase text-[#F5C645] tracking-wide">
//                 Follow {author.name}
//               </p>
//               <p className="text-[11px] uppercase text-white/30 tracking-[0.12em] mt-1">
//                 Stay connected across platforms
//               </p>
//             </div>
//             <div className="flex items-center gap-3 flex-wrap">
//               {socialLinks.map(({ href, icon, label }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2.5 border border-white/15 text-white/45 hover:border-[#F5C645] hover:text-[#F5C645] transition-all text-[11px] uppercase tracking-[0.14em] no-underline"
//                 >
//                   {icon}
//                   <span className="hidden sm:inline">{label}</span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           MOOD STRIP — same across all pages
//          ══════════════════════════════════════════════════ */}
//       <section className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12">
//         <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//           <div>
//             <p className="text-[13px] sm:text-[15px] font-bold uppercase text-[#F5C645] tracking-wide">
//               London's Mood Right Now
//             </p>
//             <p className="text-[11px] font-normal uppercase text-white/40 mt-1">
//               Updated 32 minutes ago
//             </p>
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


// app/authors/[slug]/page.jsx
"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaXTwitter, FaMedium, FaQuora, FaRedditAlien, FaGlobe,
} from "react-icons/fa6";
import Footer from "@/components/Footer";

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || "https://www.yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE  = process.env.NEXT_PUBLIC_API_URL   || "http://localhost:5000/api";

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
  new Date(toIso(dateStr)).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// ─── SEO Head ─────────────────────────────────────────────────────────────────
function AuthorSEOHead({ author }) {
  if (!author) return null;
  const canonicalUrl = `${SITE_URL}/authors/${author.slug}`;
  const image = resolveImg(author.profileImage) || `${SITE_URL}/images/og-default.webp`;
  const title = `${author.name} | ${SITE_NAME}`;
  const description = author.bio?.slice(0, 160) || `Read articles by ${author.name} on ${SITE_NAME}.`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: canonicalUrl,
    image,
    description,
    worksFor: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL },
    sameAs: [
      author.social?.twitter,
      author.social?.medium,
      author.social?.quora,
      author.social?.reddit,
      author.websiteLink,
    ].filter(Boolean),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </Head>
  );
}

// ─── Site Header ──────────────────────────────────────────────────────────────
function SiteHeader() {
  const NAV_ITEMS = ["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business"];
  return (
    <header
      className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
      style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-[0]" />
      <div className="flex lg:hidden items-center justify-between w-full relative z-10">
        <Link href="/" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">{SITE_NAME}</Link>
        <a href="#" className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline">Subscribe</a>
      </div>
      <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center relative z-10">
        {NAV_ITEMS.map((n) => (
          <a key={n} href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55">
            {n}
          </a>
        ))}
      </nav>
      <a href="#" className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0 relative z-10">
        Customise / Subscribe
      </a>
    </header>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ name }) {
  return (
    <div className="border-b border-black/10">
      <nav className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40">
          <li><Link href="/" className="hover:text-black transition-colors no-underline text-black/40">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black/40">Authors</li>
          <li aria-hidden="true">/</li>
          <li className="text-black/70">{name}</li>
        </ol>
      </nav>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function AuthorSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[320px] bg-black/10" />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="h-4 w-48 bg-black/10 rounded mb-4" />
        <div className="h-4 w-full bg-black/10 rounded mb-2" />
        <div className="h-4 w-3/4 bg-black/10 rounded" />
      </div>
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, index }) {
  const isWide = index === 0;
  const imgSrc = resolveImg(article.image);

  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className={`group flex flex-col no-underline ${isWide ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <div className={`overflow-hidden relative bg-black/5 ${isWide ? "h-[260px] sm:h-[340px]" : "h-[190px] sm:h-[210px]"}`}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={article.imageAlt || article.title}
            fill
            sizes={isWide ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading={index === 0 ? "eager" : "lazy"}
          />
        )}
        <span className="absolute top-3 left-3 bg-[#F5C645] text-black text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-1">
          {capitalize((article.categoryName || article.category || "").replace(/-/g, " "))}
        </span>
      </div>
      <div className="mt-3">
        <h3 className={`font-['Poppins',sans-serif] font-semibold leading-[1.1] tracking-[-0.02em] text-black group-hover:text-[#4a5a6a] transition-colors ${isWide ? "text-[20px] sm:text-[24px]" : "text-[15px] sm:text-[17px]"}`}>
          {article.title}
        </h3>
        {isWide && (
          <p className="mt-2 text-[13px] text-black/50 leading-relaxed line-clamp-2">{article.excerpt}</p>
        )}
        <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-wide text-black/30">
          <time dateTime={toIso(article.date)}>{formatDisplay(article.date)}</time>
          {article.readTime && <><span>·</span><span>{article.readTime}</span></>}
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AuthorPage() {
  const params = useParams();
  const slug = params?.slug;

  const [author, setAuthor]   = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/public/author/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Author not found (${res.status})`);
        return res.json();
      })
      .then(({ author: fetchedAuthor, articles: fetchedArticles }) => {
        setAuthor(fetchedAuthor);
        setArticles(fetchedArticles || []);
      })
      .catch((err) => {
        console.error("Failed to fetch author:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
        <SiteHeader />
        <AuthorSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
        <SiteHeader />
        <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-24 text-center">
          <h1 className="font-['Poppins',sans-serif] text-[28px] font-semibold text-black mb-4">Author Not Found</h1>
          <p className="text-black/50 mb-8">This author profile doesn't exist or has been removed.</p>
          {error && <p className="text-black/30 text-sm mb-8">{error}</p>}
          <Link href="/" className="text-[#F5C645] underline text-[14px]">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const authorInitials = author.name.split(" ").map((n) => n[0]).join("");
  const authorImg = resolveImg(author.profileImage);

  const socialLinks = [
    author.social?.twitter && { href: author.social.twitter, icon: <FaXTwitter size={14} />, label: "X / Twitter" },
    author.social?.medium  && { href: author.social.medium,  icon: <FaMedium size={14} />,   label: "Medium" },
    author.social?.quora   && { href: author.social.quora,   icon: <FaQuora size={14} />,    label: "Quora" },
    author.social?.reddit  && { href: author.social.reddit,  icon: <FaRedditAlien size={14} />, label: "Reddit" },
    author.websiteLink     && { href: author.websiteLink,    icon: <FaGlobe size={14} />,    label: "Website" },
  ].filter(Boolean);

  return (
    <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
      <AuthorSEOHead author={author} />
      <SiteHeader />
      <Breadcrumb name={author.name} />

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-black/70 z-0" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 lg:pt-20 pb-0">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">

            {/* Profile photo */}
            <div className="shrink-0">
              <div className="relative w-[128px] h-[128px] sm:w-[168px] sm:h-[168px] lg:w-[208px] lg:h-[208px] overflow-hidden border-[4px] border-[#F5C645]">
                {authorImg ? (
                  <Image src={authorImg} alt={`${author.name} — author photo`} fill sizes="208px" className="object-cover" priority />
                ) : (
                  <div className="w-full h-full bg-[#2a3a4a] flex items-center justify-center text-[#F5C645] font-['Poppins',sans-serif] font-bold text-[48px]">
                    {authorInitials}
                  </div>
                )}
              </div>
            </div>

            {/* Name + meta */}
            <div className="flex flex-col pb-10 lg:pb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[3px] bg-[#F5C645]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/55">
                  {author.category?.name || "Journalist"} · {author.country}
                </span>
              </div>
              <h1
                className="font-['Poppins',sans-serif] font-semibold leading-[0.88] tracking-[-0.05em] text-[#F5C645]"
                style={{ fontSize: "clamp(38px, 6.5vw, 86px)", textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14)" }}
              >
                {author.name}
              </h1>

              {/* Category tag */}
              {author.category && (
                <div className="flex flex-wrap gap-2 mt-5">
                  <Link
                    href={`/${author.category.slug}`}
                    className="text-[9px] font-bold tracking-[0.18em] uppercase bg-white/10 border border-white/20 text-white/60 px-3 py-1.5 hover:bg-[#F5C645] hover:text-black hover:border-[#F5C645] transition-all no-underline"
                  >
                    {capitalize(author.category.name)}
                  </Link>
                </div>
              )}

              {/* Social icons */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 mt-5">
                  {socialLinks.map(({ href, icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/45 hover:border-[#F5C645] hover:text-[#F5C645] transition-all">
                      {icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BIO ── */}
      <section className="w-full bg-black">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
            <div className="flex-1">
              <div className="w-[60px] h-[4px] bg-[#F5C645] mb-6" />
              <p className="text-[15px] sm:text-[16px] text-white/65 leading-[1.85] max-w-[680px]">{author.bio}</p>
            </div>
            <div className="shrink-0 flex flex-row lg:flex-col gap-8 lg:gap-8 items-start lg:items-end">
              <div className="lg:text-right">
                <p className="font-['Poppins',sans-serif] font-semibold leading-none tracking-[-0.04em] text-[#F5C645]"
                  style={{ fontSize: "clamp(48px, 5vw, 72px)" }}>
                  {articles.length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Published</p>
              </div>
              <div className="lg:text-right">
                <p className="font-['Poppins',sans-serif] font-semibold text-[20px] text-white leading-none">{author.country}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Based In</p>
              </div>
              {author.websiteLink && (
                <a href={author.websiteLink} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5C645] border border-[#F5C645]/30 px-4 py-2.5 hover:border-[#F5C645] hover:bg-[#F5C645]/5 transition-all no-underline whitespace-nowrap">
                  Visit Website ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-20 w-full">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-[60px] h-[3px] bg-[#F5C645]" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
            Stories by {author.name.split(" ")[0]}
          </span>
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[10px] text-black/25 uppercase tracking-wide shrink-0">
            {articles.length} {articles.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-black/35">No published articles yet.</p>
        )}
      </section>

      {/* ── FOLLOW STRIP ── */}
      {socialLinks.length > 0 && (
        <section className="w-full bg-black border-t border-white/5 py-10 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[13px] font-bold uppercase text-[#F5C645] tracking-wide">Follow {author.name}</p>
              <p className="text-[11px] uppercase text-white/30 tracking-[0.12em] mt-1">Stay connected across platforms</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/15 text-white/45 hover:border-[#F5C645] hover:text-[#F5C645] transition-all text-[11px] uppercase tracking-[0.14em] no-underline">
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MOOD STRIP ── */}
      <section className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12">
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