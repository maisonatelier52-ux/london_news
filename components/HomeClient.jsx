
// // components/HomeClient.jsx

// "use client";

// import { useEffect, useState } from "react";
// import {
//   WiDaySunny, WiCloudy, WiDayCloudy, WiDayRain, WiThunderstorm, WiSnow,
// } from "react-icons/wi";
// import SocialIcons from "@/components/SocialIcons";
// import Link from "next/link";
// import Image from "next/image";
// import MoodSurveyWidget from "@/components/MoodSurveyWidget";
// import HeroMoodDisplay from "@/components/HeroMoodDisplay";
// import MoodUpdatedTime from "@/components/MoodUpdatedTime";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import SplashScreen from "@/components/SplashScreen";
// import PreferredSourcePrompt from "@/components/PreferredSourcePrompt";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
// const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

// // ─── JSON-LD Schemas ──────────────────────────────────────────────────────────
// // SEO Strategy: NewsMediaOrganization + WebSite with SearchAction + BreadcrumbList

// const newsMediaOrgJsonLd = {
//   "@context": "https://schema.org",
//   "@type": "NewsMediaOrganization",
//   "@id": `${SITE_URL}/#organization`,
//   name: SITE_NAME,
//   url: SITE_URL,
//   logo: {
//     "@type": "ImageObject",
//     url: `${SITE_URL}/images/logo-img.webp`,
//     width: 168,
//     height: 87,
//   },
//   description:
//     "Independent coverage of London politics, business, culture, lifestyle, technology and sport.",
//   foundingDate: "2024",
//   inLanguage: "en-GB",
//   // E-E-A-T trust signals — link to your published policy pages
//   actionableFeedbackPolicy: `${SITE_URL}/page/corrections-policy`,
//   correctionsPolicy: `${SITE_URL}/page/corrections-policy`,
//   diversityPolicy: `${SITE_URL}/page/editorial-policy`,
//   ethicsPolicy: `${SITE_URL}/page/editorial-policy`,
//   masthead: `${SITE_URL}/page/about`,
//   missionCoveragePrioritiesPolicy: `${SITE_URL}/page/editorial-policy`,
//   ownershipFundingInfo: `${SITE_URL}/page/ownership-and-funding`,
//   verificationFactCheckingPolicy: `${SITE_URL}/page/source-methodology`,
//   sameAs: [
//     // Add your actual social profile URLs here when live
//     // "https://twitter.com/londonnews",
//     // "https://www.facebook.com/londonnews",
//   ],
//   contactPoint: {
//     "@type": "ContactPoint",
//     contactType: "editorial",
//     url: `${SITE_URL}/page/contact`,
//   },
// };

// // WebSite schema with SearchAction — enables Google Sitelinks Search Box
// const websiteJsonLd = {
//   "@context": "https://schema.org",
//   "@type": "WebSite",
//   "@id": `${SITE_URL}/#website`,
//   name: SITE_NAME,
//   url: SITE_URL,
//   inLanguage: "en-GB",
//   publisher: { "@id": `${SITE_URL}/#organization` },
//   potentialAction: {
//     "@type": "SearchAction",
//     target: {
//       "@type": "EntryPoint",
//       urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
//     },
//     "query-input": "required name=search_term_string",
//   },
// };

// // ─── Weather helpers ──────────────────────────────────────────────────────────
// const weatherData = {
//   forecast: { temp: 13, realFeel: 13, condition: "Mostly cloudy", icon: "cloudy" },
//   today:    { temp: 13, realFeel: 13, condition: "Mostly cloudy", icon: "cloudy" },
//   tomorrow: { temp: 16, realFeel: 15, condition: "Partly sunny",  icon: "partly" },
//   weekend:  { temp: 14, realFeel: 13, condition: "Light rain",    icon: "rain"   },
// };

// function mapWeatherCodeToText(code) {
//   if (code === 0)  return "Clear sky";
//   if (code <= 3)   return "Partly cloudy";
//   if (code <= 48)  return "Foggy";
//   if (code <= 67)  return "Rain";
//   if (code <= 77)  return "Snow";
//   if (code <= 99)  return "Storm";
//   return "Cloudy";
// }

// function mapWeatherCodeToIcon(code) {
//   if (code === 0)  return "sunny";
//   if (code <= 3)   return "partly";
//   if (code <= 48)  return "cloudy";
//   if (code <= 67)  return "rain";
//   if (code <= 77)  return "snow";
//   if (code <= 99)  return "storm";
//   return "cloudy";
// }

// function WeatherIcon({ type, size = 150 }) {
//   const style = { fontSize: size, color: "#5a6a7a", lineHeight: 1, display: "block" };
//   switch (type) {
//     case "sunny":  return <WiDaySunny style={style} />;
//     case "partly": return <WiDayCloudy style={style} />;
//     case "rain":   return <WiDayRain style={style} />;
//     case "storm":  return <WiThunderstorm style={style} />;
//     case "snow":   return <WiSnow style={style} />;
//     default:       return <WiCloudy style={style} />;
//   }
// }

// const tabs = [
//   { key: "forecast", label: "Forecast" },
//   { key: "today",    label: "Today" },
//   { key: "tomorrow", label: "Tomorrow" },
//   { key: "weekend",  label: "This Weekend" },
// ];

// // ─── Section renderers ────────────────────────────────────────────────────────
// // (All section renderers preserved from original — FeaturedSection, HeadlineSection,
// // OverlaySection, OverlayTallSection, ListSection, FallbackLayout, DynamicLayout)

// function FeaturedSection({ section }) {
//   const slot = section.slots?.[0];
//   const article = slot?.article;
//   if (!article) return null;

//   const title   = slot.titleOverride   || article.title;
//   const excerpt = slot.excerptOverride || article.excerpt;
//   const kicker  = slot.kickerOverride  || article.categoryName || article.category;
//   const image   = article.image;

//   return (
//     <section className="relative w-full min-h-[700px] lg:h-[1050px] overflow-hidden flex items-center">
//       {image ? (
//         <>
//           <div className="absolute inset-0">
//             <Image src={image} alt={article.imageAlt || title} fill sizes="100vw" className="object-cover" priority />
//           </div>
//           <div className="absolute inset-0 bg-black/30" />
//         </>
//       ) : (
//         <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image2.webp')" }} />
//       )}
//       <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1100px] mx-auto w-full py-10 lg:py-0">
//         <div className="text-left max-w-[700px] lg:ml-[-80px] mt-[-220px]">
//           <h2 className={`text-[26px] sm:text-[38px] lg:text-[50px] font-semibold leading-tight tracking-[-0.02em] ${image ? "text-white" : "text-black"}`}>
//             London is <span className="italic">okay</span> right now
//           </h2>
//           <div className={`w-[120px] lg:w-[160px] h-[1px] mt-1 mb-4 lg:mb-6 sm:ml-[200px] lg:ml-[270px] ${image ? "bg-white/60" : "bg-black/60"}`} />
//           <HeroMoodDisplay />
//         </div>
//         <div className="text-start mt-10 lg:mt-70">
//           <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block ml-0 lg:ml-30">
//             {kicker}
//           </span>
//           <h1 className="text-[32px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.05] lg:leading-[1] text-white tracking-[-0.02em] lg:ml-30 max-w-[750px]">
//             {title}
//           </h1>
//           <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-white/80 leading-relaxed max-w-[750px] lg:mx-auto">
//             {excerpt}
//           </p>
//           <Link
//             href={`/${article.category}/${article.slug}`}
//             className="mt-5 lg:mt-6 inline-block text-[14px] text-white uppercase tracking-wide font-semibold underline pb-1 lg:ml-33 cursor-pointer"
//             aria-label={`Read more: ${title}`}
//           >
//             Read more
//             <span className="sr-only"> about {title}</span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// function HeadlineSection({ section }) {
//   const slot    = section.slots?.[0];
//   const article = slot?.article;
//   const title   = slot?.titleOverride   || article?.title   || "Top Headline of the Day";
//   const excerpt = slot?.excerptOverride || article?.excerpt || "";
//   const href    = article ? `/${article.category}/${article.slug}` : "#";

//   return (
//     <section className="w-full bg-black flex items-center relative z-10">
//       <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 py-20 lg:py-32 mt-20">
//         <div className="w-[350px] h-[30px] bg-blue-600 mb-6" />
//         <Link href={href} className="block no-underline">
//           <h2 className="text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.05] max-w-[900px] hover:text-white/80 transition-colors cursor-pointer">
//             {title}
//           </h2>
//           {excerpt && (
//             <p className="mt-6 text-white/90 text-[14px] leading-normal max-w-[900px]">{excerpt}</p>
//           )}
//         </Link>
//       </div>
//     </section>
//   );
// }

// function OverlaySection({ section, height = "h-[500px] sm:h-[600px] lg:h-[700px]" }) {
//   const slot    = section.slots?.[0];
//   const article = slot?.article;
//   if (!article) return null;

//   const title   = slot?.titleOverride   || article.title;
//   const excerpt = slot?.excerptOverride || article.excerpt;
//   const kicker  = slot?.kickerOverride  || article.categoryName || article.category;

//   return (
//     <section className={`relative w-full ${height} flex items-center justify-center overflow-hidden`}>
//       {article.image ? (
//         <>
//           <div className="absolute inset-0">
//             <Image src={article.image} alt={article.imageAlt || title} fill sizes="100vw" className="object-cover" />
//           </div>
//           <div className="absolute inset-0 bg-black/40" />
//         </>
//       ) : (
//         <div className="absolute inset-0 bg-gray-900" />
//       )}
//       <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-100">
//         <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6"><SocialIcons /></div>
//         {kicker && (
//           <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">{kicker}</span>
//         )}
//         <Link href={`/${article.category}/${article.slug}`} className="no-underline">
//           <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[65px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px] hover:text-white/80 transition-colors">
//             {title}
//           </h2>
//         </Link>
//         {excerpt && (
//           <p className="mt-4 lg:mt-6 text-white/70 text-[13px] sm:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">{excerpt}</p>
//         )}
//       </div>
//     </section>
//   );
// }

// function OverlayTallSection({ section }) {
//   return <OverlaySection section={section} height="h-[500px] sm:h-[600px] lg:h-[1000px]" />;
// }

// function ListSection({ section }) {
//   const articles = (section.slots || []).map(s => s.article).filter(Boolean);
//   if (articles.length === 0) return null;

//   return (
//     <section className="w-full bg-black py-16 lg:py-24 relative z-10">
//       <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12">
//         {articles.map((article) => (
//           <Link
//             key={article.id}
//             href={`/${article.category}/${article.slug}`}
//             className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 no-underline group"
//             aria-label={`Read article: ${article.title}`}
//           >
//             <div className="w-full lg:w-[45%] h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden relative">
//               {article.image ? (
//                 <Image
//                   src={article.image}
//                   alt={article.imageAlt || article.title}
//                   fill
//                   sizes="(max-width: 1024px) 100vw, 45vw"
//                   className="object-cover rounded-md transition-transform duration-700 group-hover:scale-105"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-white/10 rounded-md" />
//               )}
//             </div>
//             <div className="w-full lg:w-[55%] text-white pr-0 lg:pr-10">
//               <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-2 block">
//                 {article.categoryName || article.category}
//               </span>
//               <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold leading-[1.1] mb-4 group-hover:text-white/80 transition-colors">
//                 {article.title}
//               </h3>
//               <p className="text-white/90 text-[14px] md:text-[13px] leading-relaxed mt-5 max-w-[600px]">
//                 {article.excerpt}
//               </p>
//               <div className="mt-4 flex items-center gap-3 text-[11px] text-white/60 uppercase tracking-wide">
//                 <span>{article.author?.name || "Staff Writer"}</span>
//                 <span>·</span>
//                 <span>{article.readTime}</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

// function FallbackLayout({ articles }) {
//   const getArticle  = (i) => articles[i] || null;
//   const listArticles = articles.slice(7, 10);

//   return (
//     <>
//       <section className="relative w-full min-h-[700px] lg:h-[1050px] overflow-hidden flex items-center">
//         {getArticle(0)?.image ? (
//           <>
//             <div className="absolute inset-0">
//               <Image src={getArticle(0).image} alt={getArticle(0).imageAlt || getArticle(0).title} fill sizes="100vw" className="object-cover" priority />
//             </div>
//             <div className="absolute inset-0 bg-black/30" />
//           </>
//         ) : (
//           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image2.webp')" }} />
//         )}
//         <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1100px] mx-auto w-full py-10 lg:py-0">
//           <div className="text-left max-w-[700px] lg:ml-[-80px]">
//             <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-semibold leading-tight tracking-[-0.02em] text-white">
//               London is <span className="italic">okay</span> right now
//             </h2>
//           </div>
//           {getArticle(0) && (
//             <div className="text-start mt-10 lg:mt-70">
//               <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block ml-0 lg:ml-30">
//                 {getArticle(0).categoryName || getArticle(0).category}
//               </span>
//               <h1 className="text-[32px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.05] lg:leading-[1] text-white tracking-[-0.02em] lg:ml-30 max-w-[750px]">
//                 {getArticle(0).title}
//               </h1>
//               <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-white/80 leading-relaxed max-w-[750px] lg:mx-auto">
//                 {getArticle(0).excerpt}
//               </p>
//               <Link
//                 href={`/${getArticle(0).category}/${getArticle(0).slug}`}
//                 className="mt-5 lg:mt-6 inline-block text-[14px] text-white uppercase tracking-wide font-semibold underline pb-1 lg:ml-33 cursor-pointer"
//                 aria-label={`Read more: ${getArticle(0).title}`}
//               >
//                 Read more
//                 <span className="sr-only"> about {getArticle(0).title}</span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       {getArticle(1) && (
//         <section className="w-full bg-black flex items-center relative z-10">
//           <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 py-20 lg:py-32 mt-20">
//             <div className="w-[350px] h-[30px] bg-blue-600 mb-6" />
//             <Link href={`/${getArticle(1).category}/${getArticle(1).slug}`} className="block no-underline">
//               <h2 className="text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.05] max-w-[900px] hover:text-white/80 transition-colors cursor-pointer">
//                 {getArticle(1).title}
//               </h2>
//               <p className="mt-6 text-white/90 text-[14px] leading-normal max-w-[900px]">{getArticle(1).excerpt}</p>
//             </Link>
//           </div>
//         </section>
//       )}

//       {[2, 3, 4].map((idx) => {
//         const article = getArticle(idx);
//         if (!article) return null;
//         return (
//           <section key={idx} className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
//             {article.image ? (
//               <>
//                 <div className="absolute inset-0">
//                   <Image src={article.image} alt={article.imageAlt || article.title} fill sizes="100vw" className="object-cover" />
//                 </div>
//                 <div className="absolute inset-0 bg-black/40" />
//               </>
//             ) : (
//               <div className="absolute inset-0 bg-gray-900" />
//             )}
//             <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-100">
//               <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6"><SocialIcons /></div>
//               <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">
//                 {article.categoryName || article.category}
//               </span>
//               <Link href={`/${article.category}/${article.slug}`} className="no-underline">
//                 <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[65px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px] hover:text-white/80 transition-colors">
//                   {article.title}
//                 </h2>
//               </Link>
//             </div>
//           </section>
//         );
//       })}

//       {listArticles.length > 0 && (
//         <section className="w-full bg-black py-16 lg:py-24 relative z-10">
//           <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12">
//             {listArticles.map((article) => (
//               <Link
//                 key={article.id}
//                 href={`/${article.category}/${article.slug}`}
//                 className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 no-underline group"
//                 aria-label={`Read article: ${article.title}`}
//               >
//                 <div className="w-full lg:w-[45%] h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden relative">
//                   {article.image ? (
//                     <Image
//                       src={article.image}
//                       alt={article.imageAlt || article.title}
//                       fill
//                       sizes="(max-width: 1024px) 100vw, 45vw"
//                       className="object-cover rounded-md transition-transform duration-700 group-hover:scale-105"
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-white/10 rounded-md" />
//                   )}
//                 </div>
//                 <div className="w-full lg:w-[55%] text-white pr-0 lg:pr-10">
//                   <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-2 block">
//                     {article.categoryName || article.category}
//                   </span>
//                   <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold leading-[1.1] mb-4 group-hover:text-white/80 transition-colors">
//                     {article.title}
//                   </h3>
//                   <p className="text-white/90 text-[14px] leading-relaxed mt-5 max-w-[600px]">
//                     {article.excerpt}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}
//     </>
//   );
// }

// function DynamicLayout({ homepageData }) {
//   if (!homepageData?.sections?.length) return null;
//   return (
//     <>
//       {homepageData.sections.map((section, i) => {
//         switch (section.type) {
//           case "featured":     return <FeaturedSection    key={i} section={section} />;
//           case "headline":     return <HeadlineSection    key={i} section={section} />;
//           case "overlay":      return <OverlaySection     key={i} section={section} />;
//           case "overlay_tall": return <OverlayTallSection key={i} section={section} />;
//           case "list":         return <ListSection        key={i} section={section} />;
//           default:             return null;
//         }
//       })}
//     </>
//   );
// }

// // ─── MAIN CLIENT COMPONENT ────────────────────────────────────────────────────
// export default function HomeClient() {
//   const [time, setTime]                 = useState("");
//   const [activeTab, setActiveTab]       = useState("forecast");
//   const [weather, setWeather]           = useState(null);
//   const [articles, setArticles]         = useState([]);
//   const [homepageData, setHomepageData] = useState(null);
//   const [dataReady, setDataReady]       = useState(false);
//   const [splashDone, setSplashDone]     = useState(false);

//   useEffect(() => {
//     const update = () => {
//       setTime(
//         new Date().toLocaleTimeString("en-GB", {
//           timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: true,
//         })
//       );
//     };
//     update();
//     const iv = setInterval(update, 1000);
//     return () => clearInterval(iv);
//   }, []);

//   useEffect(() => {
//     const fetchWeather = fetch(
//       "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true&daily=temperature_2m_max,weathercode&timezone=Europe/London"
//     )
//       .then(r => r.json())
//       .then(data => {
//         const temp  = Math.round(data.current_weather.temperature);
//         const code  = data.current_weather.weathercode;
//         const daily = data.daily;
//         setWeather({
//           forecast: { temp, realFeel: temp, condition: mapWeatherCodeToText(code), icon: mapWeatherCodeToIcon(code) },
//           today:    { temp: Math.round(daily.temperature_2m_max[0]), realFeel: Math.round(daily.temperature_2m_max[0]), condition: mapWeatherCodeToText(daily.weathercode[0]), icon: mapWeatherCodeToIcon(daily.weathercode[0]) },
//           tomorrow: { temp: Math.round(daily.temperature_2m_max[1]), realFeel: Math.round(daily.temperature_2m_max[1]), condition: mapWeatherCodeToText(daily.weathercode[1]), icon: mapWeatherCodeToIcon(daily.weathercode[1]) },
//           weekend:  { temp: Math.round(daily.temperature_2m_max[2]), realFeel: Math.round(daily.temperature_2m_max[2]), condition: mapWeatherCodeToText(daily.weathercode[2]), icon: mapWeatherCodeToIcon(daily.weathercode[2]) },
//         });
//       })
//       .catch(() => null);

//     const fetchHomepage = fetch(`${API_BASE}/public/homepage`)
//       .then(r => r.ok ? r.json() : null)
//       .then(data => setHomepageData(data))
//       .catch(() => null);

//     const fetchArticles = fetch(`${API_BASE}/public/latest?limit=20`)
//       .then(r => r.ok ? r.json() : [])
//       .then(data => {
//         const seen = new Set();
//         setArticles(
//           data.filter(a => {
//             if (seen.has(a.id)) return false;
//             seen.add(a.id);
//             return true;
//           })
//         );
//       })
//       .catch(() => null);

//     Promise.all([fetchWeather, fetchHomepage, fetchArticles])
//       .finally(() => setDataReady(true));
//   }, []);

//   const w               = weather ? weather[activeTab] : weatherData[activeTab];
//   const useStaticLayout = !homepageData || !homepageData.sections?.length;

//   return (
//     <>
//       {/* JSON-LD — NewsMediaOrganization + WebSite schemas */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(newsMediaOrgJsonLd) }}
//       />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
//       />

//       {/* Splash */}
//       {!splashDone && (
//         <SplashScreen
//           ready={dataReady}
//           onComplete={() => setSplashDone(true)}
//         />
//       )}

//       {/* Main page */}
//       <div
//         className="min-h-screen w-full font-['Barlow',sans-serif] relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
//           visibility: splashDone ? "visible" : "hidden",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 z-[1]" />
//         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />

//         {/* SEO: real H1 for crawlers */}
//         <h1 className="sr-only">
//           London News — Independent News for London | Politics, Culture, Business &amp; Sport
//         </h1>

//         <Header />

//         {/* ── HERO ── */}
//         <div className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-6 lg:pt-10 pb-0">

//           {/* Desktop */}
//           <div className="hidden lg:flex items-start justify-between w-full mt-30">
//             <div className="max-w-[58%]">
//               <p className="text-[10.5px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-5">
//                 Keep Calm. Here&rsquo;s the Good News.
//               </p>
//               <div
//                 className="font-['Poppins',var(--font-poppins)] font-semibold text-[clamp(88px,12.5vw,175px)] leading-[0.85] tracking-[-0.10em] text-[#F5C645] select-none"
//                 style={{ textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)" }}
//               >
//                 London<br />News
//               </div>
//             </div>
//             <div className="flex flex-col items-start min-w-[280px] pt-1.5 pr-20">
//               <p className="text-[20px] font-medium uppercase text-gray-500 mb-1.5">Current Weather</p>
//               <p className="text-base font-light text-gray-500 mb-5">{time}</p>
//               <div className="flex items-center gap-2 mb-1 pl-10">
//                 <WeatherIcon type={w.icon} />
//                 <div className="flex flex-col">
//                   <div className="flex items-start text-[94px] font-light text-[#4a5a6a] leading-none tracking-[-0.04em]">
//                     {w.temp}
//                     <span className="flex items-start text-[28px] leading-none ml-1">
//                       <span className="text-[90px]">°</span>
//                       <span className="font-['Poppins',var(--font-poppins)] text-[30px] mt-[50px] ml-[-25] text-gray-500">C</span>
//                     </span>
//                   </div>
//                   <div className="text-[18px] text-[#4a5a6a]/80 leading-none mt-1 tracking-[-0.01em]">
//                     RealFeel® {w.realFeel}°
//                   </div>
//                 </div>
//               </div>
//               <p className="text-[22px] font-light text-[#4a5a6a] mb-6">{w.condition}</p>
//               <div className="flex items-center gap-6 mt-7">
//                 {tabs.map(({ key, label }) => (
//                   <button
//                     key={key}
//                     onClick={() => setActiveTab(key)}
//                     className={`font-['Barlow',sans-serif] text-[11px] font-normal tracking-[0.10em] uppercase bg-none border-none cursor-pointer transition-colors ${
//                       activeTab === key ? "text-black font-bold" : "text-gray-500 hover:text-[#4a5a6a]"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile */}
//           <div className="flex lg:hidden flex-col w-full gap-6 mt-4">
//             <div>
//               <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-3">
//                 Keep Calm. Here&rsquo;s the Good News.
//               </p>
//               <div
//                 className="font-['Poppins',var(--font-poppins)] font-semibold leading-[0.85] tracking-[-0.07em] text-[#F5C645] select-none text-[clamp(64px,18vw,110px)]"
//                 style={{ textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)" }}
//               >
//                 London<br />News
//               </div>
//             </div>
//             <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 flex flex-col">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-[13px] sm:text-[15px] font-medium uppercase text-gray-500">Current Weather</p>
//                 <p className="text-[13px] font-light text-gray-500">{time}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <WeatherIcon type={w.icon} size={80} />
//                 <div className="flex flex-col">
//                   <div className="flex items-start text-[64px] sm:text-[72px] font-light text-[#4a5a6a] leading-none tracking-[-0.04em]">
//                     {w.temp}
//                     <span className="flex items-start text-[20px] leading-none ml-1">
//                       <span className="text-[58px]">°</span>
//                       <span className="font-['Poppins',var(--font-poppins)] text-[22px] mt-[34px] text-gray-500">C</span>
//                     </span>
//                   </div>
//                   <div className="text-[13px] text-[#4a5a6a]/80 leading-none mt-1">RealFeel® {w.realFeel}°</div>
//                 </div>
//               </div>
//               <p className="text-[16px] font-light text-[#4a5a6a] mt-1 mb-3">{w.condition}</p>
//               <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1">
//                 {tabs.map(({ key, label }) => (
//                   <button
//                     key={key}
//                     onClick={() => setActiveTab(key)}
//                     className={`font-['Barlow',sans-serif] text-[10px] sm:text-[11px] tracking-[0.10em] uppercase bg-none border-none cursor-pointer transition-colors whitespace-nowrap ${
//                       activeTab === key ? "text-[#2a3a4a] font-bold" : "text-gray-500"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div className="flex items-center px-4 sm:px-8 lg:px-12 pb-6 pt-8 lg:pb-7 lg:pt-9 -mx-4 sm:-mx-8 lg:-mx-12">
//             <MoodUpdatedTime />
//             <div className="hidden sm:block w-[80px] md:w-[360px] lg:w-[560px] h-px bg-[rgba(90,106,122,0.32)] mx-6 lg:mx-8" />
//           </div>
//         </div>

//         {/* ── CONTENT ── */}
//         {!useStaticLayout ? (
//           <DynamicLayout homepageData={homepageData} />
//         ) : (
//           <FallbackLayout articles={articles} />
//         )}

//         <MoodSurveyWidget />

//         {/* ── Preferred Source Prompt — new May 2026 Google feature ── */}
//         <PreferredSourcePrompt />

//         <Footer />
//       </div>
//     </>
//   );
// }


// components/HomeClient.jsx

"use client";

import { useEffect, useState } from "react";
import {
  WiDaySunny, WiCloudy, WiDayCloudy, WiDayRain, WiThunderstorm, WiSnow,
} from "react-icons/wi";
import SocialIcons from "@/components/SocialIcons";
import Link from "next/link";
import Image from "next/image";
import MoodSurveyWidget from "@/components/MoodSurveyWidget";
import HeroMoodDisplay from "@/components/HeroMoodDisplay";
import MoodUpdatedTime from "@/components/MoodUpdatedTime";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SplashScreen from "@/components/SplashScreen";
import PreferredSourcePrompt from "@/components/PreferredSourcePrompt";
import MobileMoodCard from "./Mobilemoodcard";


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────
// SEO Strategy: NewsMediaOrganization + WebSite with SearchAction + BreadcrumbList

const newsMediaOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo-img.webp`,
    width: 168,
    height: 87,
  },
  description:
    "Independent coverage of London politics, business, culture, lifestyle, technology and sport.",
  foundingDate: "2024",
  inLanguage: "en-GB",
  // E-E-A-T trust signals — link to your published policy pages
  actionableFeedbackPolicy: `${SITE_URL}/page/corrections-policy`,
  correctionsPolicy: `${SITE_URL}/page/corrections-policy`,
  diversityPolicy: `${SITE_URL}/page/editorial-policy`,
  ethicsPolicy: `${SITE_URL}/page/editorial-policy`,
  masthead: `${SITE_URL}/page/about`,
  missionCoveragePrioritiesPolicy: `${SITE_URL}/page/editorial-policy`,
  ownershipFundingInfo: `${SITE_URL}/page/ownership-and-funding`,
  verificationFactCheckingPolicy: `${SITE_URL}/page/source-methodology`,
  sameAs: [
    // Add your actual social profile URLs here when live
    // "https://twitter.com/londonnews",
    // "https://www.facebook.com/londonnews",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "editorial",
    url: `${SITE_URL}/page/contact`,
  },
};

// WebSite schema with SearchAction — enables Google Sitelinks Search Box
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-GB",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Weather helpers ──────────────────────────────────────────────────────────
const weatherData = {
  forecast: { temp: 13, realFeel: 13, condition: "Mostly cloudy", icon: "cloudy" },
  today:    { temp: 13, realFeel: 13, condition: "Mostly cloudy", icon: "cloudy" },
  tomorrow: { temp: 16, realFeel: 15, condition: "Partly sunny",  icon: "partly" },
  weekend:  { temp: 14, realFeel: 13, condition: "Light rain",    icon: "rain"   },
};

function mapWeatherCodeToText(code) {
  if (code === 0)  return "Clear sky";
  if (code <= 3)   return "Partly cloudy";
  if (code <= 48)  return "Foggy";
  if (code <= 67)  return "Rain";
  if (code <= 77)  return "Snow";
  if (code <= 99)  return "Storm";
  return "Cloudy";
}

function mapWeatherCodeToIcon(code) {
  if (code === 0)  return "sunny";
  if (code <= 3)   return "partly";
  if (code <= 48)  return "cloudy";
  if (code <= 67)  return "rain";
  if (code <= 77)  return "snow";
  if (code <= 99)  return "storm";
  return "cloudy";
}

function WeatherIcon({ type, size = 150 }) {
  const style = { fontSize: size, color: "#5a6a7a", lineHeight: 1, display: "block" };
  switch (type) {
    case "sunny":  return <WiDaySunny style={style} />;
    case "partly": return <WiDayCloudy style={style} />;
    case "rain":   return <WiDayRain style={style} />;
    case "storm":  return <WiThunderstorm style={style} />;
    case "snow":   return <WiSnow style={style} />;
    default:       return <WiCloudy style={style} />;
  }
}

const tabs = [
  { key: "forecast", label: "Forecast" },
  { key: "today",    label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "weekend",  label: "This Weekend" },
];

// ─── Section renderers ────────────────────────────────────────────────────────
// (All section renderers preserved from original — FeaturedSection, HeadlineSection,
// OverlaySection, OverlayTallSection, ListSection, FallbackLayout, DynamicLayout)

function FeaturedSection({ section }) {
  const slot = section.slots?.[0];
  const article = slot?.article;
  if (!article) return null;

  const title   = slot.titleOverride   || article.title;
  const excerpt = slot.excerptOverride || article.excerpt;
  const kicker  = slot.kickerOverride  || article.categoryName || article.category;
  const image   = article.image;

  return (
    <section className="relative w-full min-h-[600px] lg:h-[1050px] overflow-hidden flex items-center">
      {image ? (
        <>
          <div className="absolute inset-0">
            <Image src={image} alt={article.imageAlt || title} fill sizes="100vw" className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-black/30" />
        </>
      ) : (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image2.webp')" }} />
      )}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1100px] mx-auto w-full py-10 lg:py-0">
        {/* Desktop-only — on mobile/tablet this is replaced by MobileMoodCard */}
        <div className="hidden lg:block text-left max-w-[700px] lg:ml-[-80px] mt-[-220px]">
          <h2 className={`text-[26px] sm:text-[38px] lg:text-[50px] font-semibold leading-tight tracking-[-0.02em] ${image ? "text-white" : "text-black"}`}>
            London is <span className="italic">okay</span> right now
          </h2>
          <div className={`w-[120px] lg:w-[160px] h-[1px] mt-1 mb-4 lg:mb-6 sm:ml-[200px] lg:ml-[270px] ${image ? "bg-white/60" : "bg-black/60"}`} />
          <HeroMoodDisplay />
        </div>
        <div className="text-start mt-10 lg:mt-70">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block ml-0 lg:ml-30">
            {kicker}
          </span>
          <h1 className="text-[32px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.05] lg:leading-[1] text-white tracking-[-0.02em] lg:ml-30 max-w-[750px]">
            {title}
          </h1>
          <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-white/80 leading-relaxed max-w-[750px] lg:mx-auto">
            {excerpt}
          </p>
          <Link
            href={`/${article.category}/${article.slug}`}
            className="mt-5 lg:mt-6 inline-block text-[14px] text-white uppercase tracking-wide font-semibold underline pb-1 lg:ml-33 cursor-pointer"
            aria-label={`Read more: ${title}`}
          >
            Read more
            <span className="sr-only"> about {title}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeadlineSection({ section }) {
  const slot    = section.slots?.[0];
  const article = slot?.article;
  const title   = slot?.titleOverride   || article?.title   || "Top Headline of the Day";
  const excerpt = slot?.excerptOverride || article?.excerpt || "";
  const href    = article ? `/${article.category}/${article.slug}` : "#";

  return (
    <section className="w-full bg-black flex items-center relative z-10">
      <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 py-20 lg:py-32 mt-0 lg:mt-20">
        <div className="w-[350px] h-[30px] bg-blue-600 mb-6" />
        <Link href={href} className="block no-underline">
          <h2 className="text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.05] max-w-[900px] hover:text-white/80 transition-colors cursor-pointer">
            {title}
          </h2>
          {excerpt && (
            <p className="mt-6 text-white/90 text-[14px] leading-normal max-w-[900px]">{excerpt}</p>
          )}
        </Link>
      </div>
    </section>
  );
}

function OverlaySection({ section, height = "h-[500px] sm:h-[600px] lg:h-[700px]" }) {
  const slot    = section.slots?.[0];
  const article = slot?.article;
  if (!article) return null;

  const title   = slot?.titleOverride   || article.title;
  const excerpt = slot?.excerptOverride || article.excerpt;
  const kicker  = slot?.kickerOverride  || article.categoryName || article.category;

  return (
    <section className={`relative w-full ${height} flex items-center justify-center overflow-hidden`}>
      {article.image ? (
        <>
          <div className="absolute inset-0">
            <Image src={article.image} alt={article.imageAlt || title} fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-900" />
      )}
      <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-100">
        <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6"><SocialIcons /></div>
        {kicker && (
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">{kicker}</span>
        )}
        <Link href={`/${article.category}/${article.slug}`} className="no-underline">
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[65px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px] hover:text-white/80 transition-colors">
            {title}
          </h2>
        </Link>
        {excerpt && (
          <p className="mt-4 lg:mt-6 text-white/70 text-[13px] sm:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">{excerpt}</p>
        )}
      </div>
    </section>
  );
}

function OverlayTallSection({ section }) {
  return <OverlaySection section={section} height="h-[500px] sm:h-[600px] lg:h-[1000px]" />;
}

function ListSection({ section }) {
  const articles = (section.slots || []).map(s => s.article).filter(Boolean);
  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-black py-16 lg:py-24 relative z-10">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/${article.category}/${article.slug}`}
            className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 no-underline group"
            aria-label={`Read article: ${article.title}`}
          >
            <div className="w-full lg:w-[45%] h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden relative">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover rounded-md transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-white/10 rounded-md" />
              )}
            </div>
            <div className="w-full lg:w-[55%] text-white pr-0 lg:pr-10">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-2 block">
                {article.categoryName || article.category}
              </span>
              <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold leading-[1.1] mb-4 group-hover:text-white/80 transition-colors">
                {article.title}
              </h3>
              <p className="text-white/90 text-[14px] md:text-[13px] leading-relaxed mt-5 max-w-[600px]">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-[11px] text-white/60 uppercase tracking-wide">
                <span>{article.author?.name || "Staff Writer"}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FallbackLayout({ articles }) {
  const getArticle  = (i) => articles[i] || null;
  const listArticles = articles.slice(7, 10);

  return (
    <>
      <section className="relative w-full min-h-[700px] lg:h-[1050px] overflow-hidden flex items-center">
        {getArticle(0)?.image ? (
          <>
            <div className="absolute inset-0">
              <Image src={getArticle(0).image} alt={getArticle(0).imageAlt || getArticle(0).title} fill sizes="100vw" className="object-cover" priority />
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image2.webp')" }} />
        )}
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1100px] mx-auto w-full py-10 lg:py-0">
          <div className="text-left max-w-[700px] lg:ml-[-80px]">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-semibold leading-tight tracking-[-0.02em] text-white">
              London is <span className="italic">okay</span> right now
            </h2>
          </div>
          {getArticle(0) && (
            <div className="text-start mt-10 lg:mt-70">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block ml-0 lg:ml-30">
                {getArticle(0).categoryName || getArticle(0).category}
              </span>
              <h1 className="text-[32px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.05] lg:leading-[1] text-white tracking-[-0.02em] lg:ml-30 max-w-[750px]">
                {getArticle(0).title}
              </h1>
              <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-white/80 leading-relaxed max-w-[750px] lg:mx-auto">
                {getArticle(0).excerpt}
              </p>
              <Link
                href={`/${getArticle(0).category}/${getArticle(0).slug}`}
                className="mt-5 lg:mt-6 inline-block text-[14px] text-white uppercase tracking-wide font-semibold underline pb-1 lg:ml-33 cursor-pointer"
                aria-label={`Read more: ${getArticle(0).title}`}
              >
                Read more
                <span className="sr-only"> about {getArticle(0).title}</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {getArticle(1) && (
        <section className="w-full bg-black flex items-center relative z-10">
          <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 py-20 lg:py-32 mt-20">
            <div className="w-[350px] h-[30px] bg-blue-600 mb-6" />
            <Link href={`/${getArticle(1).category}/${getArticle(1).slug}`} className="block no-underline">
              <h2 className="text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.05] max-w-[900px] hover:text-white/80 transition-colors cursor-pointer">
                {getArticle(1).title}
              </h2>
              <p className="mt-6 text-white/90 text-[14px] leading-normal max-w-[900px]">{getArticle(1).excerpt}</p>
            </Link>
          </div>
        </section>
      )}

      {[2, 3, 4].map((idx) => {
        const article = getArticle(idx);
        if (!article) return null;
        return (
          <section key={idx} className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
            {article.image ? (
              <>
                <div className="absolute inset-0">
                  <Image src={article.image} alt={article.imageAlt || article.title} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gray-900" />
            )}
            <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-100">
              <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6"><SocialIcons /></div>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">
                {article.categoryName || article.category}
              </span>
              <Link href={`/${article.category}/${article.slug}`} className="no-underline">
                <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[65px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px] hover:text-white/80 transition-colors">
                  {article.title}
                </h2>
              </Link>
            </div>
          </section>
        );
      })}

      {listArticles.length > 0 && (
        <section className="w-full bg-black py-16 lg:py-24 relative z-10">
          <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12">
            {listArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${article.category}/${article.slug}`}
                className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 no-underline group"
                aria-label={`Read article: ${article.title}`}
              >
                <div className="w-full lg:w-[45%] h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden relative">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.imageAlt || article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover rounded-md transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 rounded-md" />
                  )}
                </div>
                <div className="w-full lg:w-[55%] text-white pr-0 lg:pr-10">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-2 block">
                    {article.categoryName || article.category}
                  </span>
                  <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold leading-[1.1] mb-4 group-hover:text-white/80 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/90 text-[14px] leading-relaxed mt-5 max-w-[600px]">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// "First, the good news" — 1 CMS-controlled lead item followed by exactly 5
// secondary items, all in the order the CMS defines (task 6.1). The lead is
// always slots[0]; secondaries are slots[1..5] — never more, never fewer,
// and never a hardcoded article-array slice like the old fallback layout used.
function GoodNewsSection({ section }) {
  const slots      = section.slots || [];
  const leadArticle = slots[0]?.article;
  const secondarySlots = slots.slice(1, 6).filter(s => s?.article);
  if (!leadArticle && secondarySlots.length === 0) return null;

  return (
    <section className="w-full bg-black py-16 lg:py-24 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        <p className="text-[#F5C645] text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
          First, the good news
        </p>

        {leadArticle && (
          <Link
            href={`/${leadArticle.category}/${leadArticle.slug}`}
            className="flex flex-col lg:flex-row gap-6 lg:gap-10 no-underline group mb-14"
            aria-label={`Read article: ${slots[0].titleOverride || leadArticle.title}`}
          >
            <div className="w-full lg:w-[55%] h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden relative rounded-md">
              {leadArticle.image ? (
                <Image
                  src={leadArticle.image}
                  alt={leadArticle.imageAlt || leadArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white/10" />
              )}
            </div>
            <div className="w-full lg:w-[45%] flex flex-col justify-center text-white">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">
                {slots[0].kickerOverride || leadArticle.categoryName || leadArticle.category}
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.08] mb-4 group-hover:text-white/80 transition-colors">
                {slots[0].titleOverride || leadArticle.title}
              </h2>
              <p className="text-white/80 text-[14px] leading-relaxed max-w-[520px]">
                {slots[0].excerptOverride || leadArticle.excerpt}
              </p>
            </div>
          </Link>
        )}

        {secondarySlots.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {secondarySlots.map((slot, i) => {
              const article = slot.article;
              return (
                <Link
                  key={article.id || i}
                  href={`/${article.category}/${article.slug}`}
                  className="flex flex-col no-underline group"
                  aria-label={`Read article: ${slot.titleOverride || article.title}`}
                >
                  <div className="w-full h-[180px] overflow-hidden relative rounded-md mb-4">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-2 block">
                    {slot.kickerOverride || article.categoryName || article.category}
                  </span>
                  <h3 className="text-white text-[18px] font-semibold leading-[1.2] group-hover:text-white/80 transition-colors">
                    {slot.titleOverride || article.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// Classifieds promo + subscribe CTA (task 6.2) — sits between the CMS content
// and the mood widget/footer, on every homepage load regardless of which
// homepage layout (CMS-driven or fallback) is active above it.
function ClassifiedsAndSubscribePromo() {
  return (
    <section className="w-full bg-[#0d0d0d] border-t border-white/10 py-14 lg:py-20 relative z-10">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 grid sm:grid-cols-2 gap-8">
        <div className="border border-white/15 rounded-lg p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">
              Classifieds
            </span>
            <h3 className="text-white text-[22px] sm:text-[26px] font-semibold leading-tight mb-3">
              Property, jobs, services and for-sale listings from London
            </h3>
            <p className="text-white/60 text-[14px] leading-relaxed mb-6">
              Browse the marketplace, or post your own listing for other Londoners to see.
            </p>
          </div>
          <Link
            href="/classifieds"
            className="inline-block self-start px-6 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] transition-colors duration-300 no-underline"
          >
            Browse Classifieds
          </Link>
        </div>

        <div className="border border-white/15 rounded-lg p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645] mb-3 block">
              Stay Ahead of London
            </span>
            <h3 className="text-white text-[22px] sm:text-[26px] font-semibold leading-tight mb-3">
              Get the latest London news delivered to your inbox
            </h3>
            <p className="text-white/60 text-[14px] leading-relaxed mb-6">
              A free roundup of the stories that matter, straight from our newsroom.
            </p>
          </div>
          <Link
            href="/subscribe"
            className="inline-block self-start px-6 py-3 bg-[#F5C645] text-black text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-white transition-colors duration-300 no-underline"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </section>
  );
}

function DynamicLayout({ homepageData }) {
  if (!homepageData?.sections?.length) return null;

  const renderedSections = homepageData.sections
    .map((section, i) => {
      switch (section.type) {
        case "featured":     return <FeaturedSection    key={`section-${i}`} section={section} />;
        case "headline":     return <HeadlineSection    key={`section-${i}`} section={section} />;
        case "overlay":      return <OverlaySection     key={`section-${i}`} section={section} />;
        case "overlay_tall": return <OverlayTallSection key={`section-${i}`} section={section} />;
        case "list":         return <ListSection        key={`section-${i}`} section={section} />;
        case "good_news":    return <GoodNewsSection    key={`section-${i}`} section={section} />;
        default:             return null;
      }
    })
    .filter(Boolean);

  // ── Mobile/tablet-only "London's Mood" card ──────────────────────────
  // Inserted right after the 2nd article section. Hidden on lg+ (laptop
  // and up) via MobileMoodCard's own "lg:hidden" class, so desktop is
  // completely unaffected — this block only ever renders on small screens.
  const mobileMoodBlock = (
    <section key="mobile-mood-card" className="block lg:hidden w-full bg-black py-8 px-4 sm:px-8 relative z-10">
      <MobileMoodCard />
    </section>
  );

  const output = [];
  renderedSections.forEach((el, i) => {
    output.push(el);
    if (i === 1) output.push(mobileMoodBlock);
  });
  // Safety net: if there were fewer than 2 sections to begin with, still
  // show the card at the end rather than dropping it silently.
  if (renderedSections.length < 2) output.push(mobileMoodBlock);

  return <>{output}</>;
}

// ─── MAIN CLIENT COMPONENT ────────────────────────────────────────────────────
// `previewData`, when provided, is a draft/scheduled Homepage document
// (same populated shape as GET /api/public/homepage) fetched server-side by
// app/preview/homepage/[token]/page.jsx. When present, HomeClient renders it
// directly instead of fetching the live active homepage — so a preview shows
// exactly the same layout editors will see once they publish, rather than a
// separate simplified preview template.
export default function HomeClient({ previewData = null, isPreview = false } = {}) {
  const [time, setTime]                 = useState("");
  const [activeTab, setActiveTab]       = useState("forecast");
  const [weather, setWeather]           = useState(null);
  const [articles, setArticles]         = useState([]);
  const [homepageData, setHomepageData] = useState(previewData);
  const [dataReady, setDataReady]       = useState(isPreview);
  const [splashDone, setSplashDone]     = useState(isPreview);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: true,
        })
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (isPreview) return; // previewData was already supplied by the caller

    const fetchWeather = fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true&daily=temperature_2m_max,weathercode&timezone=Europe/London"
    )
      .then(r => r.json())
      .then(data => {
        const temp  = Math.round(data.current_weather.temperature);
        const code  = data.current_weather.weathercode;
        const daily = data.daily;
        setWeather({
          forecast: { temp, realFeel: temp, condition: mapWeatherCodeToText(code), icon: mapWeatherCodeToIcon(code) },
          today:    { temp: Math.round(daily.temperature_2m_max[0]), realFeel: Math.round(daily.temperature_2m_max[0]), condition: mapWeatherCodeToText(daily.weathercode[0]), icon: mapWeatherCodeToIcon(daily.weathercode[0]) },
          tomorrow: { temp: Math.round(daily.temperature_2m_max[1]), realFeel: Math.round(daily.temperature_2m_max[1]), condition: mapWeatherCodeToText(daily.weathercode[1]), icon: mapWeatherCodeToIcon(daily.weathercode[1]) },
          weekend:  { temp: Math.round(daily.temperature_2m_max[2]), realFeel: Math.round(daily.temperature_2m_max[2]), condition: mapWeatherCodeToText(daily.weathercode[2]), icon: mapWeatherCodeToIcon(daily.weathercode[2]) },
        });
      })
      .catch(() => null);

    const fetchHomepage = fetch(`${API_BASE}/public/homepage`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setHomepageData(data))
      .catch(() => null);

    const fetchArticles = fetch(`${API_BASE}/public/latest?limit=20`)
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        const seen = new Set();
        setArticles(
          data.filter(a => {
            if (seen.has(a.id)) return false;
            seen.add(a.id);
            return true;
          })
        );
      })
      .catch(() => null);

    Promise.all([fetchWeather, fetchHomepage, fetchArticles])
      .finally(() => setDataReady(true));
  }, []);

  const w               = weather ? weather[activeTab] : weatherData[activeTab];
  const useStaticLayout = !homepageData || !homepageData.sections?.length;

  return (
    <>
      {isPreview && previewData && (
        <div className="sticky top-0 z-[300] w-full bg-[#1B2435] text-white text-center py-2 text-[12px] font-semibold uppercase tracking-wide">
          Homepage Preview — {previewData.status} · v{previewData.version}
          {previewData.scheduledPublishAt && (
            <span className="font-normal normal-case">
              {" "}
              · scheduled for {new Date(previewData.scheduledPublishAt).toLocaleString("en-GB")}
            </span>
          )}
        </div>
      )}

      {/* JSON-LD — NewsMediaOrganization + WebSite schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsMediaOrgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Splash */}
      {!splashDone && (
        <SplashScreen
          ready={dataReady}
          onComplete={() => setSplashDone(true)}
        />
      )}

      {/* Main page */}
      <div
        className="min-h-screen w-full font-['Barlow',sans-serif] relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')",
          visibility: splashDone ? "visible" : "hidden",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 z-[1]" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />

        {/* SEO: real H1 for crawlers */}
        <h1 className="sr-only">
          London News — Independent News for London | Politics, Culture, Business &amp; Sport
        </h1>

        <Header />

        {/* ── HERO ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-0 lg:pt-10 pb-0">

          {/* Desktop */}
          <div className="hidden lg:flex items-start justify-between w-full mt-30">
            <div className="max-w-[58%]">
              <p className="text-[10.5px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-5">
                Keep Calm. Here&rsquo;s the Good News.
              </p>
              <div
                className="font-['Poppins',var(--font-poppins)] font-semibold text-[clamp(88px,12.5vw,175px)] leading-[0.85] tracking-[-0.10em] text-[#F5C645] select-none"
                style={{ textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)" }}
              >
                London<br />News
              </div>
            </div>
            <div className="flex flex-col items-start min-w-[280px] pt-1.5 pr-20">
              <p className="text-[20px] font-medium uppercase text-gray-500 mb-1.5">Current Weather</p>
              <p className="text-base font-light text-gray-500 mb-5">{time}</p>
              <div className="flex items-center gap-2 mb-1 pl-10">
                <WeatherIcon type={w.icon} />
                <div className="flex flex-col">
                  <div className="flex items-start text-[94px] font-light text-[#4a5a6a] leading-none tracking-[-0.04em]">
                    {w.temp}
                    <span className="flex items-start text-[28px] leading-none ml-1">
                      <span className="text-[90px]">°</span>
                      <span className="font-['Poppins',var(--font-poppins)] text-[30px] mt-[50px] ml-[-25] text-gray-500">C</span>
                    </span>
                  </div>
                  <div className="text-[18px] text-[#4a5a6a]/80 leading-none mt-1 tracking-[-0.01em]">
                    RealFeel® {w.realFeel}°
                  </div>
                </div>
              </div>
              <p className="text-[22px] font-light text-[#4a5a6a] mb-6">{w.condition}</p>
              <div className="flex items-center gap-6 mt-7">
                {tabs.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`font-['Barlow',sans-serif] text-[11px] font-normal tracking-[0.10em] uppercase bg-none border-none cursor-pointer transition-colors ${
                      activeTab === key ? "text-black font-bold" : "text-gray-500 hover:text-[#4a5a6a]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile */}
          {/* <div className="flex lg:hidden flex-col w-full gap-6 mt-4">
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-3">
                Keep Calm. Here&rsquo;s the Good News.
              </p>
              <div
                className="font-['Poppins',var(--font-poppins)] font-semibold leading-[0.85] tracking-[-0.07em] text-[#F5C645] select-none text-[clamp(64px,18vw,110px)]"
                style={{ textShadow: "0 3px 0 rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.14), 0 18px 28px rgba(0,0,0,0.12)" }}
              >
                London<br />News
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13px] sm:text-[15px] font-medium uppercase text-gray-500">Current Weather</p>
                <p className="text-[13px] font-light text-gray-500">{time}</p>
              </div>
              <div className="flex items-center gap-3">
                <WeatherIcon type={w.icon} size={80} />
                <div className="flex flex-col">
                  <div className="flex items-start text-[64px] sm:text-[72px] font-light text-[#4a5a6a] leading-none tracking-[-0.04em]">
                    {w.temp}
                    <span className="flex items-start text-[20px] leading-none ml-1">
                      <span className="text-[58px]">°</span>
                      <span className="font-['Poppins',var(--font-poppins)] text-[22px] mt-[34px] text-gray-500">C</span>
                    </span>
                  </div>
                  <div className="text-[13px] text-[#4a5a6a]/80 leading-none mt-1">RealFeel® {w.realFeel}°</div>
                </div>
              </div>
              <p className="text-[16px] font-light text-[#4a5a6a] mt-1 mb-3">{w.condition}</p>
              <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1">
                {tabs.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`font-['Barlow',sans-serif] text-[10px] sm:text-[11px] tracking-[0.10em] uppercase bg-none border-none cursor-pointer transition-colors whitespace-nowrap ${
                      activeTab === key ? "text-[#2a3a4a] font-bold" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          {/* Bottom bar */}
          <div className="hidden lg:flex items-center px-4 sm:px-8 lg:px-12 pb-6 pt-8 lg:pb-7 lg:pt-9 -mx-4 sm:-mx-8 lg:-mx-12">
            <MoodUpdatedTime />
            <div className="hidden sm:block w-[80px] md:w-[360px] lg:w-[560px] h-px bg-[rgba(90,106,122,0.32)] mx-6 lg:mx-8" />
          </div>
        </div>

        {/* ── CONTENT ── */}
        {!useStaticLayout ? (
          <DynamicLayout homepageData={homepageData} />
        ) : (
          <FallbackLayout articles={articles} />
        )}

        <MoodSurveyWidget />

        {/* ── Classifieds promo + subscribe CTA (task 6.2) ── */}
        <ClassifiedsAndSubscribePromo />

        {/* ── Preferred Source Prompt — new May 2026 Google feature ── */}
        <PreferredSourcePrompt />

        <Footer />
      </div>
    </>
  );
}