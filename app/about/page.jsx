

// // app/about/page.jsx
// import Link from "next/link";
// import Image from "next/image";
// import Header from "@/components/Header";
// import MoodSurveyWidget from "@/components/MoodSurveyWidget";
// import Footer from "@/components/Footer";

// export const metadata = {
//   title: "About London News — Our Story, Mission & Values | London News",
//   description:
//     "Discover the story behind London News, our mission to deliver balanced, thoughtful journalism, and the values that guide our independent reporting.",
//   alternates: {
//     canonical: "https://london-news.com/about",
//   },
//   openGraph: {
//     title: "About London News — Our Story, Mission & Values",
//     description:
//       "Discover the story behind London News, our mission to deliver balanced, thoughtful journalism, and the values that guide our independent reporting.",
//     url: "https://london-news.com/about",
//     siteName: "London News",
//     images: [
//       {
//         url: "/images/about-og.webp",
//         width: 1200,
//         height: 630,
//         alt: "London News About Page",
//       },
//     ],
//     type: "website",
//     locale: "en_GB",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "About London News — Our Story, Mission & Values",
//     description:
//       "Discover the story behind London News, our mission to deliver balanced, thoughtful journalism, and the values that guide our independent reporting.",
//     images: ["/images/about-og.webp"],
//     creator: "@londonnews",
//     site: "@londonnews",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

// // Values data
// const values = [
//   {
//     title: "Independence",
//     description:
//       "We answer to no one but our readers. No corporate interests, no political allegiances — just a fierce commitment to the truth.",
//     icon: "⚖️",
//   },
//   {
//     title: "Clarity",
//     description:
//       "In an age of noise and spin, we prize clear thinking and precise language. Our stories inform without overwhelming.",
//     icon: "💡",
//   },
//   {
//     title: "Community",
//     description:
//       "London is a city of millions of stories. We strive to reflect its diversity, listen carefully, and serve all its citizens.",
//     icon: "🏙️",
//   },
//   {
//     title: "Integrity",
//     description:
//       "We correct our mistakes openly, challenge our own assumptions, and never let speed compromise accuracy.",
//     icon: "🎯",
//   },
// ];

// // Stats data
// const stats = [
//   { value: "2018", label: "Year Founded" },
//   { value: "45+", label: "Journalists & Contributors" },
//   { value: "2,500+", label: "Articles Published" },
//   { value: "1.2M", label: "Monthly Readers" },
// ];

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
//       <Header siteName="London News" />

//       {/* Hero Section */}
//       <section className="relative w-full overflow-hidden bg-black">
//         {/* Background pattern / subtle texture */}
//         <div 
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//             backgroundRepeat: "repeat"
//           }}
//         />
//         <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 py-20 lg:py-32 text-center">
//           <div className="inline-flex items-center gap-2 mb-6">
//             <div className="w-8 h-px bg-[#F5C645]" />
//             <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F5C645]">Our Story</span>
//             <div className="w-8 h-px bg-[#F5C645]" />
//           </div>
//           <h1 className="font-['Poppins',sans-serif] font-semibold text-[clamp(48px,8vw,88px)] leading-[1.05] tracking-[-0.03em] text-white">
//             Journalism with<br />
//             <span className="text-[#F5C645]">clarity & conviction</span>
//           </h1>
//           <p className="mt-6 text-[16px] sm:text-[18px] text-white/70 max-w-[700px] mx-auto leading-relaxed">
//             London News launched in 2018 with a simple belief: that thoughtful,
//             independent journalism can help make sense of a complicated city.
//           </p>
//         </div>
//       </section>

//       {/* Mission Statement — Two Column with Image */}
//       <section className="w-full py-20 lg:py-28 bg-white">
//         <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-[32px] h-[3px] bg-[#F5C645]" />
//                 <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">Why we exist</span>
//               </div>
//               <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-black">
//                 A different kind of newsroom
//               </h2>
//               <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] text-black/70 leading-relaxed">
//                 <p>
//                   London moves fast. News cycles are relentless. In the rush to break stories first,
//                   nuance is lost and context is sacrificed. We believe there&apos;s a better way.
//                 </p>
//                 <p>
//                   London News was founded to deliver journalism that values depth over speed,
//                   understanding over outrage. We&apos;re not chasing clicks — we&apos;re building trust.
//                 </p>
//                 <p>
//                   Every story we publish is guided by a single question: does this help our readers
//                   understand London and their place in it? If the answer is no, we don&apos;t run it.
//                 </p>
//               </div>
//             </div>
//             <div className="relative h-[320px] sm:h-[400px] lg:h-[480px] rounded-lg overflow-hidden bg-black/5">
//               <Image
//                 src="/images/about-mission.webp"
//                 alt="London News newsroom"
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//                 className="object-cover"
//                 priority
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Strip — Light Background */}
//       <section className="w-full bg-[#f7f6f2] py-12 border-y border-black/5">
//         <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, index) => (
//               <div key={index}>
//                 <div className="text-[32px] sm:text-[44px] font-semibold text-black tracking-[-0.02em]">
//                   {stat.value}
//                 </div>
//                 <div className="text-[11px] uppercase tracking-[0.12em] text-black/50 mt-2">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Values — Grid */}
//       <section className="w-full py-20 lg:py-28 bg-white">
//         <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
//           <div className="text-center max-w-[700px] mx-auto mb-16">
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <div className="w-[32px] h-[3px] bg-[#F5C645]" />
//               <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">What guides us</span>
//               <div className="w-[32px] h-[3px] bg-[#F5C645]" />
//             </div>
//             <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.1] tracking-[-0.02em] text-black">
//               Four principles, one commitment
//             </h2>
//             <p className="mt-4 text-[14px] sm:text-[15px] text-black/60">
//               These values shape every editorial decision, from story selection to final edit.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="text-center group cursor-default"
//               >
//                 <div className="text-[48px] mb-4 inline-block transform transition-transform duration-300 group-hover:scale-110">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-[18px] font-semibold text-black mb-3 tracking-[-0.01em]">
//                   {value.title}
//                 </h3>
//                 <p className="text-[13px] text-black/60 leading-relaxed">
//                   {value.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Editorial Process / Promise */}
//       <section className="w-full bg-white py-20 lg:py-28 border-t border-black/5">
//         <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-[32px] h-[3px] bg-[#F5C645]" />
//                 <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">Our promise</span>
//               </div>
//               <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em] text-black">
//                 Transparent, accountable, independent
//               </h2>
//               <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] text-black/70 leading-relaxed">
//                 <p>
//                   London News operates under a strict editorial charter that guarantees our independence.
//                   We are not owned by a media conglomerate or a political interest. Our only shareholders
//                   are our readers.
//                 </p>
//                 <p>
//                   We correct errors openly. We label opinion clearly. We disclose conflicts of interest.
//                   And we never — ever — run sponsored content disguised as journalism.
//                 </p>
//                 <p>
//                   If you spot something that doesn&apos;t meet our standards, we want to hear about it.
//                   Write to our readers&apos; editor at{" "}
//                   <a 
//                     href="mailto:feedback@londonnews.com" 
//                     className="text-black underline decoration-[#F5C645] hover:decoration-2"
//                   >
//                     feedback@londonnews.com
//                   </a>.
//                 </p>
//               </div>
//             </div>
//             <div className="bg-[#f7f6f2] p-8 rounded-lg">
//               <blockquote className="text-[18px] sm:text-[22px] font-medium leading-[1.4] text-black/80 italic">
//                 &ldquo;Journalism&apos;s first obligation is to the truth. Its first loyalty is to citizens.&rdquo;
//               </blockquote>
//               <div className="mt-6 pt-4 border-t border-black/10 flex items-center gap-4">
//                 <div className="w-10 h-px bg-[#F5C645]" />
//                 <cite className="text-[11px] uppercase tracking-[0.12em] text-black/50 not-italic">
//                   &mdash; Bill Kovach, The Elements of Journalism
//                 </cite>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mood Survey Widget (compact) */}
//       <section className="w-full bg-black border-t border-white/5 py-8 px-4 sm:px-8 lg:px-12">
//         <div className="max-w-[1100px] mx-auto">
//           <MoodSurveyWidget variant="compact" />
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }

// app/about/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiShield,
  FiUsers,
  FiFileText,
  FiSend,
  FiRefreshCcw,
  FiUser,
  FiEdit,
  FiPenTool,
  FiFlag,
  FiAlertTriangle,
  FiTruck,
  FiBriefcase,
  FiCpu,
  FiFilm,
  FiMapPin,
  FiCheckCircle,
  FiMail,
} from "react-icons/fi";

/* ─── tiny hook: animate counter ─── */
function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const isNum = /^\d+/.test(target);
    const num = parseInt(target);
    const suffix = target.replace(/[\d]/g, "");
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * num) + suffix);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start]);
  return val || "0";
}

/* ─── intersection observer helper ─── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── STAT ITEM ─── */
function StatItem({ value, label }) {
  const [ref, inView] = useInView(0.3);
  const displayed = useCountUp(value, 1600, inView);
  return (
    <div ref={ref} className="stat-item">
      <span className="stat-number">{displayed}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ─── TIMELINE STEP ─── */
function TimelineStep({ number, icon: Icon, title, desc, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="timeline-step"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="step-number">{number}</div>
      <div className="step-line" />
      <div className="step-icon">
        <Icon size={22} />
      </div>
      <h4 className="step-title">{title}</h4>
      <p className="step-desc">{desc}</p>
    </div>
  );
}

/* ─── COVERAGE CARD ─── */
function CoverageCard({ icon: Icon, label, gradient, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="coverage-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        background: gradient,
      }}
    >
      <div className="coverage-overlay" />
      <div className="coverage-content">
        <div className="coverage-icon">
          <Icon size={20} />
        </div>
        <span className="coverage-label">{label}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN ABOUT PAGE
══════════════════════════════════════ */
export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [heroRef, heroInView] = useInView(0.1);

  const coverageItems = [
    { icon: FiFlag, label: "Politics", gradient: "linear-gradient(135deg,#1a1a2e,#16213e)" },
    { icon: FiAlertTriangle, label: "Crime", gradient: "linear-gradient(135deg,#1a0a0a,#2d1010)" },
    { icon: FiTruck, label: "Transport", gradient: "linear-gradient(135deg,#0a1a1a,#103028)" },
    { icon: FiBriefcase, label: "Business", gradient: "linear-gradient(135deg,#0f1a0a,#1a2d10)" },
    { icon: FiCpu, label: "Technology", gradient: "linear-gradient(135deg,#0a0a1a,#10102d)" },
    { icon: FiFilm, label: "Entertainment", gradient: "linear-gradient(135deg,#1a0a14,#2d1020)" },
    { icon: FiMapPin, label: "Local News", gradient: "linear-gradient(135deg,#1a140a,#2d2010)" },
  ];

  const timelineSteps = [
    { icon: FiSearch, title: "Story Discovery", desc: "Journalists monitor leads, events, and community tips to uncover important stories." },
    { icon: FiFileText, title: "Verification", desc: "We verify facts, documents, and sources are checked for accuracy and context." },
    { icon: FiUsers, title: "Editorial Review", desc: "Editors review reporting for fairness, clarity, and compliance with our standards." },
    { icon: FiSend, title: "Publication", desc: "Stories are published with care and presented with transparency and accountability." },
    { icon: FiRefreshCcw, title: "Corrections & Updates", desc: "We correct errors promptly and update stories as new information becomes available." },
  ];

  const standards = [
    "Fact-checked reporting",
    "Source verification and transparency",
    "Corrections policy and accountability",
    "Editorial independence",
    "No sponsored influence",
    "Respect for our community",
  ];

  return (
    <>
      <style>{`
        /* ── RESET & BASE (scoped — does NOT affect header/footer in layout) ── */
        .about-page *, .about-page *::before, .about-page *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .about-page {
          font-family: 'Montserrat', 'Geist', system-ui, sans-serif;
          background: #ffffff;
          color: #111111;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 700px;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding-bottom: 80px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%),
            url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80') center/cover no-repeat;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeUp 0.9s ease 0.2s forwards;
        }
        .hero-label {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .hero-title {
          font-size: clamp(64px, 8vw, 120px);
          font-weight: 800;
          color: #f4c542;
          line-height: 0.92;
          letter-spacing: -0.04em;
        }
        .hero-tagline {
          margin-top: 20px;
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ── INTRO SECTION ── */
        .intro-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 100px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .intro-heading {
          font-size: clamp(32px, 4vw, 58px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .intro-heading-accent {
          display: block;
          width: 48px;
          height: 4px;
          background: #f4c542;
          margin-top: 24px;
        }
        .intro-right {
          padding-top: 8px;
        }
        .intro-right p {
          font-size: 16px;
          line-height: 1.85;
          color: #555;
          margin-bottom: 20px;
        }
        .intro-right p:last-child { margin-bottom: 0; }

        /* ── MISSION SECTION ── */
        .mission-section {
          background: #0a0a0a;
          padding: 80px 48px;
        }
        .mission-inner {
          max-width: 1400px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 600;
          color: #f4c542;
          margin-bottom: 48px;
        }
        .mission-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .mission-card {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 36px 32px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .mission-card:hover {
          border-color: rgba(244,197,66,0.4);
          background: rgba(244,197,66,0.04);
        }
        .mission-card-icon {
          color: #f4c542;
          margin-bottom: 20px;
        }
        .mission-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .mission-card p {
          font-size: 14px;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
        }

        /* ── STATS SECTION ── */
        .stats-section {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 72px 48px;
        }
        .stats-inner {
          max-width: 1400px;
          margin: 0 auto;
        }
        .stats-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 48px;
          font-weight: 500;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 40px 0 0;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .stat-item:last-child { border-right: none; }
        .stat-number {
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ── EDITORIAL PROCESS ── */
        .process-section {
          padding: 100px 48px;
          background: #f8f8f8;
        }
        .process-inner {
          max-width: 1400px;
          margin: 0 auto;
        }
        .process-section .section-label { color: #111; }
        .timeline {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          margin-top: 16px;
        }
        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 16px;
          position: relative;
        }
        .step-number {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .step-line {
          position: absolute;
          top: 68px;
          left: 50%;
          right: -50%;
          height: 1px;
          background: #ddd;
          z-index: 0;
        }
        .timeline-step:last-child .step-line { display: none; }
        .step-icon {
          width: 52px;
          height: 52px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111;
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }
        .timeline-step:hover .step-icon {
          background: #f4c542;
          border-color: #f4c542;
          color: #111;
        }
        .step-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
          color: #111;
        }
        .step-desc {
          font-size: 12px;
          line-height: 1.7;
          color: #888;
        }

        /* ── NEWSROOM ── */
        .newsroom-section {
          display: grid;
          grid-template-columns: 60% 40%;
          min-height: 520px;
          overflow: hidden;
        }
        .newsroom-image {
          background:
            linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.5)),
            url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80') center/cover no-repeat;
          min-height: 520px;
        }
        .newsroom-content {
          background: #111;
          padding: 64px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .newsroom-content .section-label { margin-bottom: 24px; }
        .newsroom-content h2 {
          font-size: clamp(32px, 3vw, 48px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          line-height: 1.05;
        }
        .newsroom-desc {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          margin-bottom: 40px;
        }
        .newsroom-roles {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .role-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
        }
        .role-icon {
          color: #f4c542;
        }
        .role-title {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .role-count {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
        }

        /* ── COVERAGE ── */
        .coverage-section {
          padding: 80px 48px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .coverage-section .section-label { color: #111; }
        .coverage-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
          margin-top: 32px;
        }
        .coverage-card {
          border-radius: 4px;
          overflow: hidden;
          height: 200px;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .coverage-card:hover { transform: translateY(-4px); }
        .coverage-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
        }
        .coverage-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 20px 12px;
          gap: 8px;
        }
        .coverage-icon {
          color: #f4c542;
        }
        .coverage-label {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
        }

        /* ── STANDARDS + NEWSLETTER ── */
        .standards-newsletter {
          display: grid;
          grid-template-columns: 50% 50%;
          min-height: 320px;
        }
        .standards-side {
          background: #fafafa;
          padding: 72px 64px;
        }
        .standards-side .section-label { color: #111; margin-bottom: 32px; }
        .standards-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 32px;
          list-style: none;
        }
        .standards-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #333;
          font-weight: 500;
          line-height: 1.5;
        }
        .standards-list li svg {
          flex-shrink: 0;
          color: #f4c542;
          margin-top: 2px;
        }
        .newsletter-side {
          background: #111;
          padding: 72px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .newsletter-side .section-label { color: #f4c542; margin-bottom: 20px; }
        .newsletter-side h3 {
          font-size: clamp(24px, 2.5vw, 36px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }
        .newsletter-side p {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .newsletter-form {
          display: flex;
          gap: 0;
        }
        .newsletter-input {
          flex: 1;
          height: 56px;
          padding: 0 20px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-right: none;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
          font-family: inherit;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus { border-color: #f4c542; }
        .newsletter-btn {
          height: 56px;
          padding: 0 28px;
          background: #f4c542;
          color: #111;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
          font-family: inherit;
          white-space: nowrap;
        }
        .newsletter-btn:hover { background: #d9ab24; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .intro-section { grid-template-columns: 1fr; gap: 40px; padding: 72px 32px; }
          .mission-cards { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2,1fr); gap: 40px; }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0 0 32px 0; }
          .stat-item:last-child { border-bottom: none; }
          .timeline { grid-template-columns: 1fr; gap: 32px; }
          .step-line { display: none; }
          .timeline-step { flex-direction: row; text-align: left; align-items: flex-start; gap: 20px; }
          .step-icon { flex-shrink: 0; margin-bottom: 0; }
          .newsroom-section { grid-template-columns: 1fr; }
          .newsroom-image { min-height: 300px; }
          .coverage-grid { grid-template-columns: repeat(4,1fr); }
          .standards-newsletter { grid-template-columns: 1fr; }
          .standards-side, .newsletter-side { padding: 56px 32px; }
          .hero-content { padding: 0 32px; }
          .mission-section, .stats-section { padding: 64px 32px; }
          .process-section { padding: 72px 32px; }
          .coverage-section { padding: 64px 32px; }
        }
        @media (max-width: 640px) {
          .hero { height: 500px; padding-bottom: 56px; }
          .hero-title { font-size: 52px; }
          .coverage-grid { grid-template-columns: repeat(2,1fr); }
          .newsroom-roles { grid-template-columns: repeat(2,1fr); }
          .standards-list { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
          .newsletter-form { flex-direction: column; }
          .newsletter-input { border-right: 1px solid rgba(255,255,255,0.12); }
          .newsletter-btn { width: 100%; }
        }
      `}</style>

      <div className="about-page">

        {/* ── SECTION 1: HERO ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content" ref={heroRef}>
            <p className="hero-label">Independent Journalism</p>
            <h1 className="hero-title">
              About<br />London News
            </h1>
            <p className="hero-tagline">Truth. London. Accountability.</p>
          </div>
        </section>

        {/* ── SECTION 2: INTRODUCTION ── */}
        <section className="intro-section">
          <div>
            <h2 className="intro-heading">
              London News is an independent digital newsroom covering politics, business, transport, crime, culture, and life across London.
            </h2>
            <span className="intro-heading-accent" />
          </div>
          <div className="intro-right">
            <p>
              We are dedicated to delivering accurate, fair, and timely journalism that informs and empowers our readers.
            </p>
            <p>
              Our reporters and editors work around the clock to bring you stories that matter to communities across the capital.
            </p>
            <p>
              We believe a well-informed London is a stronger London. That's why we hold power to account, amplify unheard voices, and shine a light on the issues that shape our city every day.
            </p>
          </div>
        </section>

        {/* ── SECTION 3: MISSION ── */}
        <section className="mission-section">
          <div className="mission-inner">
            <p className="section-label">Our Mission</p>
            <div className="mission-cards">
              {[
                {
                  icon: FiSearch,
                  title: "Accuracy",
                  desc: "We are committed to fact-based reporting and rigorous verification before publication. We report the news, not the agenda.",
                },
                {
                  icon: FiShield,
                  title: "Independence",
                  desc: "Our journalism is free from political, corporate, or government influence. We remain editorially independent at all times.",
                },
                {
                  icon: FiUsers,
                  title: "Accountability",
                  desc: "We hold those in power accountable and own our mistakes through transparent corrections.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div className="mission-card" key={title}>
                  <div className="mission-card-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: STATS ── */}
        <section className="stats-section">
          <div className="stats-inner">
            <p className="stats-eyebrow">London News by the numbers</p>
            <div className="stats-grid">
              <StatItem value="12M+" label="Monthly Readers" />
              <StatItem value="450+" label="Stories Published" />
              <StatItem value="24" label="7 Coverage" />
              <StatItem value="18" label="Editorial Contributors" />
            </div>
          </div>
        </section>

        {/* ── SECTION 5: EDITORIAL PROCESS ── */}
        <section className="process-section">
          <div className="process-inner">
            <p className="section-label">Our Editorial Process</p>
            <div className="timeline">
              {timelineSteps.map((step, i) => (
                <TimelineStep
                  key={step.title}
                  number={String(i + 1).padStart(2, "0")}
                  icon={step.icon}
                  title={step.title}
                  desc={step.desc}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: NEWSROOM ── */}
        <section className="newsroom-section">
          <div className="newsroom-image" />
          <div className="newsroom-content">
            <p className="section-label">Our Newsroom</p>
            <h2>Our Newsroom</h2>
            <p className="newsroom-desc">
              Our newsroom is made up of experienced journalists, editors, researchers, and multimedia storytellers passionate about London.
              <br /><br />
              We work collaboratively to deliver journalism that is rigorous, inclusive, and impactful.
            </p>
            <div className="newsroom-roles">
              {[
                { icon: FiUser, title: "Editor in Chief", count: "1" },
                { icon: FiUsers, title: "Senior Reporters", count: "7" },
                { icon: FiEdit, title: "Research Team", count: "5" },
                { icon: FiPenTool, title: "Contributors", count: "10+" },
              ].map(({ icon: Icon, title, count }) => (
                <div className="role-item" key={title}>
                  <div className="role-icon"><Icon size={22} /></div>
                  <span className="role-count">{count}</span>
                  <span className="role-title">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: COVERAGE ── */}
        <section className="coverage-section">
          <p className="section-label">What We Cover</p>
          <div className="coverage-grid">
            {coverageItems.map(({ icon, label, gradient }, i) => (
              <CoverageCard key={label} icon={icon} label={label} gradient={gradient} delay={i * 60} />
            ))}
          </div>
        </section>

        {/* ── SECTION 8+9: STANDARDS + NEWSLETTER ── */}
        <section className="standards-newsletter">
          <div className="standards-side">
            <p className="section-label">Our Standards</p>
            <ul className="standards-list">
              {standards.map((s) => (
                <li key={s}>
                  <FiCheckCircle size={16} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="newsletter-side">
            <p className="section-label">Newsletter</p>
            <h3>Stay Ahead of London</h3>
            <p>Get the latest news, analysis, and stories delivered straight to your inbox.</p>
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Email address"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}