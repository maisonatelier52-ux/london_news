
// components/PageClient.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FiCheckCircle, FiXCircle, FiAlertCircle, FiSend, FiMail,
  FiRefreshCcw, FiBookOpen, FiLayers, FiUserCheck, FiFileText,
  FiLink, FiShield, FiInfo, FiCopy, FiList, FiMinusCircle,
  FiExternalLink, FiBell, FiBriefcase, FiDollarSign, FiBarChart2,
  FiFlag, FiDatabase, FiSettings, FiPieChart, FiLock, FiMessageCircle,
  FiPhoneCall, FiSliders, FiTag, FiPackage, FiRadio, FiMapPin,
  FiUsers, FiEye, FiAward, FiEdit, FiClock,
  FiMail as FiMailIcon,
  FiPhone as FiPhoneIcon,
  FiClock as FiTimeIcon,
  FiEdit3 as FiEdit3Icon
} from "react-icons/fi";

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return { ref, controls };
}

// ─── Animated Hero ─────────────────────────────────────────────────────────────
// SEO FIX: removed <h1> from here — each page template now owns its single H1.
// This component renders a decorative banner only (no heading tag).
function AnimatedHero({ title, subtitle, image, imageAlt }) {
  return (
    <section
      className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden"
      aria-label={`${title} hero banner`}
    >
      {image ? (
        <>
          <div className="absolute inset-0">
            <Image src={image} alt={imageAlt || title} fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      )}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/*
          SEO FIX: was <h1> — removed to prevent duplicate H1s.
          The page title is already rendered as <h1> inside each template
          component (AboutPage, TeamPage, etc.) and in the sr-only block below.
          This <p> is purely decorative and aria-hidden.
        */}
        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-['Poppins',sans-serif] font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight"
        >
          {title}
        </motion.p>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/80 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage({ page, siteName, siteUrl }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    // Microdata: marks the page as an AboutPage for schema.org parsers
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Hidden microdata fields */}
      <meta itemProp="name" content={page.heroTitle || "About London News"} />
      <meta itemProp="description" content={page.missionStatement || `About ${siteName}`} />
      <link itemProp="url" href={`${siteUrl}/page/about`} />

      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12">
        {/*
          SEO FIX: single H1 — the AnimatedHero banner no longer renders an H1,
          so this is the only H1 on the page.
        */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5C645] mb-2 sm:mb-3"
          itemProp="headline"
        >
          {page.heroTitle || "About London News"}
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm tracking-wider uppercase">
          {page.heroSubtitle || "TRUTH. LONDON. ACCOUNTABILITY."}
        </p>
        <div className="w-12 sm:w-16 h-px bg-gray-300 mx-auto mt-3 sm:mt-4" />
      </div>

      {/* Mission Statement */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed" itemProp="description">
          {page.missionStatement || "London News is an independent digital newsroom covering politics, business, transport, crime, culture, and life across London."}
        </p>
      </div>

      {/* Description Paragraphs */}
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-gray-600 leading-relaxed mb-8 sm:mb-12">
        <p className="text-sm sm:text-base">
          We are dedicated to delivering accurate, fair, and timely journalism that informs and empowers our readers.
        </p>
        <p className="text-sm sm:text-base">
          Our reporters and editors work around the clock to bring you stories that matter to communities across the capital.
        </p>
        <p className="text-sm sm:text-base">
          We believe a well-informed London is a stronger London. That's why we hold power to account, amplify unheard voices, and shine a light on the issues that shape our city every day.
        </p>
      </div>

      {/* Our Mission — 3 Cards */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-black">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-[#F5C645] mb-2">Accuracy</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              We are committed to fact-based reporting and rigorous verification before publication. We report the news, not the agenda.
            </p>
          </div>
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-[#F5C645] mb-2">Independence</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Our journalism is free from political, corporate, or government influence. We remain editorially independent at all times.
            </p>
          </div>
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-[#F5C645] mb-2">Accountability</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              We hold those in power accountable and own our mistakes through transparent corrections.
            </p>
          </div>
        </div>
      </div>

      {/* Our Editorial Process */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-black mb-6 sm:mb-10">Our Editorial Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            { number: "01", title: "Story Discovery", desc: "Journalists monitor leads, events, and community tips to uncover important stories." },
            { number: "02", title: "Verification", desc: "We verify facts, documents, and sources are checked for accuracy and context." },
            { number: "03", title: "Editorial Review", desc: "Editors review reporting for fairness, clarity, and compliance with our standards." },
            { number: "04", title: "Publication", desc: "Stories are published with care and presented with transparency and accountability." },
            { number: "05", title: "Corrections & Updates", desc: "We correct errors promptly and update stories as new information becomes available." }
          ].map((step, idx) => (
            <div key={idx} className="text-center p-3 sm:p-4">
              <div className="text-[#F5C645] text-xl sm:text-2xl font-bold mb-2">{step.number}</div>
              <h3 className="font-semibold text-gray-700 text-xs sm:text-sm mb-2">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[180px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Newsroom */}
      <div className="bg-gray-900 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Newsroom</h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
          Our newsroom is made up of experienced journalists, editors, researchers, and multimedia storytellers passionate about London.
        </p>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          We work collaboratively to deliver journalism that is rigorous, inclusive, and impactful.
        </p>
      </div>

      {/* What We Cover */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-center mb-6 sm:mb-8">What We Cover</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            "Fact-checked reporting",
            "Source verification and transparency",
            "Corrections policy and accountability",
            "Editorial independence",
            "No sponsored influence",
            "Respect for our community"
          ].map((item, idx) => (
            <span key={idx} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#F5C645]/10 border border-[#F5C645]/20 rounded-xl p-6 sm:p-8 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">Stay Ahead of London</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-4">Get the latest news, analysis, and stories delivered straight to your inbox.</p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 sm:gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:border-[#F5C645] text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 bg-[#F5C645] text-black font-semibold rounded-lg hover:bg-[#e8b800] transition-colors text-sm sm:text-base cursor-pointer"
          >
            Subscribe
          </button>
        </form>
        {subscribed && (
          <p className="text-green-600 text-xs sm:text-sm mt-3">Thanks for subscribing! Check your inbox.</p>
        )}
      </div>

      {page.foundingDate && (
        <p className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8">
          Founded {page.foundingDate}
        </p>
      )}
    </div>
  );
}

// ─── Team Page ────────────────────────────────────────────────────────────────
function TeamPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/public/authors`)
      .then(res => res.json())
      .then(setAuthors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg" />
              <div className="h-4 bg-gray-200 rounded mt-3 w-3/4" />
              <div className="h-3 bg-gray-200 rounded mt-2 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-8 py-12 lg:py-16"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {/* Single H1 for team page */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-3">Our Team</h1>
      <p className="text-gray-600 text-center mb-12">Meet the journalists and editors behind London News</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author, idx) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="p-6 text-center">
              {author.profileImage ? (
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={author.profileImage} alt={author.name} fill className="object-cover" itemProp="image" />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#F5C645]/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#F5C645]">{author.name.charAt(0)}</span>
                </div>
              )}
              <h2 className="text-xl font-semibold mb-1" itemProp="name">{author.name}</h2>
              <p className="text-[#F5C645] text-sm mb-3" itemProp="jobTitle">{author.category?.name || "Journalist"}</p>
              {author.bio && <p className="text-gray-600 text-sm" itemProp="description">{author.bio.substring(0, 100)}...</p>}
              {author.slug && (
                <Link href={`/authors/${author.slug}`} className="inline-block mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-[#F5C645] transition-colors" itemProp="url">
                  View Articles →
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage({ page, siteUrl }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const contactItems = [
    {
      Icon: FiMapPin,
      label: page.contactOfficeTitle || "Our Office",
      lines: (page.contactOfficeAddress || "London News\n1 London Bridge Street\nLondon, SE1 9GF\nUnited Kingdom").split('\n'),
    },
    {
      Icon: FiMailIcon,
      label: page.contactEmailTitle || "General Inquiries",
      lines: [page.contactEmail || "hello@londonnews.co.uk"],
    },
    {
      Icon: FiPhoneIcon,
      label: page.contactPhoneTitle || "Phone",
      lines: [page.contactPhone || "+44 20 7946 0958"],
    },
    {
      Icon: FiTimeIcon,
      label: page.contactHoursTitle || "Newsroom Hours",
      lines: (page.contactHoursText || "24/7 — Our newsroom never sleeps.\nTips and messages are monitored around the clock.").split('\n'),
    },
  ];

  const contactTypes = page.contactTypes?.length > 0
    ? page.contactTypes.map(type => ({ Icon: getIconForContactType(type.icon), title: type.title, desc: type.description }))
    : [
        { Icon: FiSend, title: "News Tips", desc: "Share information or story leads with our journalists." },
        { Icon: FiAlertCircle, title: "Corrections", desc: "Help us keep our reporting accurate and up to date." },
        { Icon: FiUsers, title: "Press & Media", desc: "Media inquiries and interview requests." },
        { Icon: FiEdit3Icon, title: "General Feedback", desc: "Your feedback helps us improve." },
      ];

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Form error:", err);
    } finally {
      setSending(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNewsletterSent(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSent(false), 3000);
    } catch (err) {
      console.error("Newsletter error:", err);
    }
  };

  const inputClass = "w-full h-14 bg-transparent border border-white/20 text-white placeholder-white/35 px-4 text-[14px] font-medium focus:outline-none focus:border-[#f4c542] transition-colors duration-200";
  const darkInputClass = "w-full h-14 bg-black border border-white/10 text-white placeholder-white/50 px-5 text-[14px] focus:outline-none focus:border-[#f4c542] transition-colors duration-200";
  const heroImageUrl = page.heroImage || "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80";

  return (
    <main itemScope itemType="https://schema.org/ContactPage">
      <meta itemProp="name" content={page.heroTitle || "Contact London News"} />
      <meta itemProp="description" content={page.heroSubtitle || "We welcome tips, story ideas, corrections, and feedback from our readers."} />
      <link itemProp="url" href={`${siteUrl}/page/contact`} />

      {/* Hero Section */}
      <section className="relative h-[650px] flex items-end overflow-hidden">
        <img src={heroImageUrl} alt={page.heroImageAlt || "London at night"} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
          <p className="text-[#f4c542] text-[13px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
            IN TOUCH
          </p>
          {/*
            SEO FIX: single H1 — AnimatedHero is skipped for contact template,
            so this is the only H1 on the page.
          */}
          <h1
            className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-6"
            style={{ fontSize: "clamp(64px, 9vw, 130px)" }}
            itemProp="headline"
          >
            {page.heroTitle || "Contact\nLondon News"}
          </h1>
          <p className="text-white/80 text-[16px] leading-relaxed max-w-[420px]">
            {page.heroSubtitle || "We welcome tips, story ideas, corrections, and feedback from our readers."}
          </p>
        </div>
      </section>

      {/* Contact Intro */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block w-10 h-[3px] bg-[#f4c542] mb-6" />
            <h2 className="text-[#0d0d0d] text-[26px] sm:text-[32px] font-bold leading-tight mb-6">
              {page.contactIntroTitle || "Have a story tip, press inquiry, correction, or general question?"}
              <br />
              <span className="text-[#0d0d0d]/70 font-semibold">We'd love to hear from you.</span>
            </h2>
            <p className="text-[#555] text-[16px] leading-[1.8]">
              {page.contactIntroText || "Our newsroom is based in London and our journalists are working around the clock to bring you the news that matters across the capital."}
            </p>
          </div>
          <div className="space-y-6">
            {contactItems.map(({ Icon, label, lines }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#0d0d0d] flex items-center justify-center">
                  <Icon className="text-[#f4c542]" size={18} />
                </div>
                <div>
                  <p className="text-[#0d0d0d] font-semibold text-[14px] tracking-wide mb-1">{label}</p>
                  {lines.map((l, idx) => (
                    <p key={idx} className="text-[#555] text-[14px] leading-[1.7]">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#050505] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-8">
              {page.contactFormTitle || "Send Us a Message"}
            </p>
            {page.contactFormDescription && (
              <p className="text-white/50 text-sm mb-4">{page.contactFormDescription}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className={inputClass} />
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className={inputClass} />
              </div>
              <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required className={inputClass} />
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={6}
                className="w-full bg-transparent border border-white/20 text-white placeholder-white/35 px-4 py-4 text-[14px] font-medium focus:outline-none focus:border-[#f4c542] transition-colors duration-200 resize-none" />
              <button type="submit" disabled={sending}
                className="w-full h-14 bg-[#f4c542] hover:bg-[#d9ab24] text-black font-bold text-[13px] tracking-[2.5px] uppercase transition-colors duration-200 disabled:opacity-50 cursor-pointer">
                {sent ? "Message Sent ✓" : sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div>
            <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-8">
              {page.contactTypesTitle || "What You Can Contact Us About"}
            </p>
            <div className="space-y-8">
              {contactTypes.map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="text-[#f4c542]" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px] mb-1">{title}</p>
                    <p className="text-white/50 text-[14px] leading-[1.7]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#ffffff] border-t border-white/10 py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-2">
              {page.newsletterTitle || "Stay Ahead of London"}
            </p>
            <p className="text-black/75 text-[15px] leading-relaxed max-w-[380px]">
              {page.newsletterDescription || "Get the latest news, analysis, and stories delivered straight to your inbox."}
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-[480px]">
            <input type="email" placeholder="Email address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className={darkInputClass} required />
            <button type="submit"
              className="h-14 px-7 bg-[#f4c542] hover:bg-[#d9ab24] text-black font-bold text-[12px] tracking-[2px] uppercase transition-colors duration-200 whitespace-nowrap cursor-pointer">
              {page.newsletterButtonText || "Subscribe"}
            </button>
          </form>
        </div>
        {newsletterSent && (
          <p className="text-green-600 text-sm text-center mt-4">
            {page.newsletterSuccessText || "Successfully subscribed! Check your inbox."}
          </p>
        )}
      </section>
    </main>
  );
}

function getIconForContactType(icon) {
  const iconMap = {
    "📰": FiSend, "✏️": FiAlertCircle, "📺": FiUsers, "💬": FiEdit3Icon,
    "news": FiSend, "corrections": FiAlertCircle, "media": FiUsers, "feedback": FiEdit3Icon,
  };
  if (typeof icon === 'string' && iconMap[icon.toLowerCase()]) return iconMap[icon.toLowerCase()];
  if (typeof icon === 'string') {
    if (icon.includes('News') || icon.includes('Tip')) return FiSend;
    if (icon.includes('Correction')) return FiAlertCircle;
    if (icon.includes('Press') || icon.includes('Media')) return FiUsers;
    if (icon.includes('Feedback')) return FiEdit3Icon;
  }
  return FiSend;
}

// ─── Careers Page ─────────────────────────────────────────────────────────────
function CareersPage({ page }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", job: "", coverLetter: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/public/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", job: "", coverLetter: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Application error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 lg:py-16" itemScope itemType="https://schema.org/WebPage">
      <meta itemProp="name" content="Careers at London News" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
        {/* Single H1 for careers page */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" itemProp="headline">Join Our Team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're always looking for talented journalists, editors, and creators to join our mission of independent journalism.
        </p>
      </motion.div>

      {page.jobsList?.filter(job => job.isActive).length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
          <div className="space-y-4">
            {page.jobsList.filter(job => job.isActive).map((job, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow" itemScope itemType="https://schema.org/JobPosting">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1" itemProp="title">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="text-sm text-gray-500" itemProp="jobLocation">{job.location}</span>
                      <span className="text-sm text-gray-500" itemProp="employmentType">{job.type}</span>
                    </div>
                    <p className="text-gray-600" itemProp="description">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Apply Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C645]" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C645]" required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C645]" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Position Applying For *</label>
              <select value={formData.job} onChange={e => setFormData({ ...formData, job: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C645]" required>
                <option value="">Select a position</option>
                {page.jobsList?.filter(job => job.isActive).map((job, idx) => (
                  <option key={idx} value={job.title}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Cover Letter</label>
            <textarea value={formData.coverLetter} onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
              rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C645]"
              placeholder="Tell us why you'd be a great fit..." />
          </div>
          <button type="submit" disabled={sending}
            className="w-full bg-[#F5C645] text-black font-semibold py-3 rounded-lg hover:bg-[#e8b800] transition-colors disabled:opacity-50">
            {sending ? "Submitting..." : "Submit Application"}
          </button>
          {submitted && <p className="text-green-600 text-sm text-center">Application submitted successfully! We'll review your application.</p>}
        </form>
      </motion.div>
    </div>
  );
}

// ─── Policy Page ──────────────────────────────────────────────────────────────
function PolicyPage({ page }) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  const policyContent = page.policyContent || {};
  const navLinks = page.navLinks?.length > 0 ? page.navLinks : getNavLinksForSlug(page.slug);
  const lastUpdated = page.lastUpdated || new Date().toISOString();

  useEffect(() => {
    if (!navLinks?.length) return;
    const elements = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActiveId(entry.target.id); }); },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    elements.forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [navLinks]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  if (!navLinks?.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">No Sections Configured</h2>
          <p className="text-gray-600">This policy page doesn't have any sections defined.</p>
        </div>
      </div>
    );
  }

  const heroImageUrl = page.heroImage || getHeroImageForSlug(page.slug);
  const heroLabel = getHeroLabelForSlug(page.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] lg:h-[580px] flex items-end overflow-hidden">
        {heroImageUrl ? (
          <>
            <img src={heroImageUrl} alt={page.heroImageAlt || page.heroTitle || page.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
          <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
            {heroLabel}
          </p>
          {/* Single H1 for policy pages — AnimatedHero is skipped for this template */}
          <h1 className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-5"
            style={{ fontSize: "clamp(64px, 8vw, 130px)" }}>
            {page.heroTitle || page.title}
          </h1>
          {page.heroSubtitle && (
            <p className="text-white/75 text-[16px] leading-relaxed max-w-[440px]">{page.heroSubtitle}</p>
          )}
        </div>
      </section>

      <div className="bg-white py-20" itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content={page.heroTitle || page.title} />
        <meta itemProp="dateModified" content={lastUpdated} />
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[260px_1fr] gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#999] mb-5">On This Page</p>
              <nav className="space-y-1">
                {navLinks.map(({ id, label }) => (
                  <button key={id} onClick={() => scrollToSection(id)}
                    className={`block w-full text-left text-[14px] py-2 transition-all duration-150 cursor-pointer ${
                      activeId === id ? "border-l-2 border-[#f4c542] pl-4 text-[#111] font-semibold" : "pl-[18px] text-[#666] hover:text-[#111]"
                    }`}>
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <article className="max-w-[850px] text-[#111] text-[15px] leading-[1.85] space-y-0" itemProp="articleBody">
            {navLinks.map((link, idx) => (
              <PolicySectionComponent key={link.id} id={link.id} label={link.label}
                content={policyContent[link.id] || ""} isLast={idx === navLinks.length - 1} />
            ))}
            {lastUpdated && (
              <p className="text-center text-[13px] text-[#aaa] mt-10">
                Last Updated: {new Date(lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
          </article>
        </div>
      </div>
    </>
  );
}

function PolicySectionComponent({ id, label, content, isLast }) {
  const elements = parsePolicyContent(content);
  return (
    <section id={id} className={`scroll-mt-28 ${!isLast ? 'border-b border-[#e5e5e5] pb-10' : ''}`}>
      <div className="flex items-center gap-4 mb-5 mt-14 first:mt-5">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fdf3cc] flex items-center justify-center">
          {getIconForSectionId(id)}
        </div>
        {/* H2 for policy sections — correct hierarchy under the page H1 */}
        <h2 className="text-[#111] text-[22px] font-bold">{label}</h2>
      </div>
      <div className="text-[#555] text-[15px] leading-[1.85] space-y-3">
        {elements.length === 0 ? (
          <p className="mb-4">{content || "Content for this section is being prepared."}</p>
        ) : (
          elements.map((el, idx) => {
            if (el.type === 'paragraph') return <p key={idx} className="mb-4">{el.text}</p>;
            if (el.type === 'bullet') return (
              <div key={idx} className="flex items-start gap-3">
                <FiCheckCircle className="flex-shrink-0 mt-[3px] text-[#f4c542]" size={16} />
                <span>{el.text}</span>
              </div>
            );
            if (el.type === 'numbered') return (
              <div key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fdf3cc] flex items-center justify-center mt-[2px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4c542] block" />
                </span>
                <span>{el.text}</span>
              </div>
            );
            if (el.type === 'subheading') return <h3 key={idx} className="text-[18px] font-semibold text-[#111] mt-6 mb-3">{el.text}</h3>;
            return null;
          })
        )}
      </div>
    </section>
  );
}

function parsePolicyContent(content) {
  if (!content || typeof content !== 'string') return [];
  return content.split('\n').reduce((acc, line) => {
    const t = line.trim();
    if (!t) return acc;
    if (t.startsWith('•') || t.startsWith('-') || t.startsWith('*')) return [...acc, { type: 'bullet', text: t.replace(/^[•\-*]\s*/, '') }];
    if (t.match(/^\d+\./)) return [...acc, { type: 'numbered', text: t.replace(/^\d+\.\s*/, '') }];
    if (t.startsWith('#')) return [...acc, { type: 'subheading', text: t.replace(/^#+\s*/, '') }];
    return [...acc, { type: 'paragraph', text: t }];
  }, []);
}

function getIconForSectionId(sectionId) {
  const iconMap = {
    'editorial-separation': <FiSliders size={20} className="text-[#f4c542]" />,
    'how-labeled': <FiTag size={20} className="text-[#f4c542]" />,
    'native-content': <FiPackage size={20} className="text-[#f4c542]" />,
    'affiliate-links': <FiLink size={20} className="text-[#f4c542]" />,
    'newsletters-social': <FiRadio size={20} className="text-[#f4c542]" />,
    'political-ads': <FiFlag size={20} className="text-[#f4c542]" />,
    'practices-avoided': <FiXCircle size={20} className="text-[#f4c542]" />,
    'complaints': <FiMessageCircle size={20} className="text-[#f4c542]" />,
    'how-we-handle': <FiAlertCircle size={20} className="text-[#f4c542]" />,
    'where-corrections': <FiMapPin size={20} className="text-[#f4c542]" />,
    'what-correction-includes': <FiFileText size={20} className="text-[#f4c542]" />,
    'reader-submissions': <FiMail size={20} className="text-[#f4c542]" />,
    'commitment-transparency': <FiShield size={20} className="text-[#f4c542]" />,
    'why-this-matters': <FiUsers size={20} className="text-[#f4c542]" />,
    'editorial-independence': <FiFlag size={20} className="text-[#f4c542]" />,
    'accuracy-verification': <FiCheckCircle size={20} className="text-[#f4c542]" />,
    'fairness-balance': <FiSliders size={20} className="text-[#f4c542]" />,
    'transparency': <FiEye size={20} className="text-[#f4c542]" />,
    'disclosure-labeling': <FiTag size={20} className="text-[#f4c542]" />,
    'ethical-standards': <FiShield size={20} className="text-[#f4c542]" />,
    'reader-feedback': <FiMail size={20} className="text-[#f4c542]" />,
    'our-commitment': <FiAward size={20} className="text-[#f4c542]" />,
    'information-we-collect': <FiDatabase size={20} className="text-[#f4c542]" />,
    'how-used': <FiSettings size={20} className="text-[#f4c542]" />,
    'cookies': <FiPieChart size={20} className="text-[#f4c542]" />,
    'your-rights': <FiUserCheck size={20} className="text-[#f4c542]" />,
    'data-protection': <FiLock size={20} className="text-[#f4c542]" />,
    'when-we-seek': <FiMessageCircle size={20} className="text-[#f4c542]" />,
    'how-outreach': <FiPhoneCall size={20} className="text-[#f4c542]" />,
    'what-to-send': <FiSend size={20} className="text-[#f4c542]" />,
    'post-publication': <FiRefreshCcw size={20} className="text-[#f4c542]" />,
    'what-not-guaranteed': <FiXCircle size={20} className="text-[#f4c542]" />,
    'urgent-matters': <FiAlertCircle size={20} className="text-[#f4c542]" />,
    'how-reporting-begins': <FiBookOpen size={20} className="text-[#f4c542]" />,
    'source-hierarchy': <FiLayers size={20} className="text-[#f4c542]" />,
    'anonymous-sources': <FiUserCheck size={20} className="text-[#f4c542]" />,
    'documents-data': <FiFileText size={20} className="text-[#f4c542]" />,
    'attribution': <FiLink size={20} className="text-[#f4c542]" />,
    'uncertainty': <FiAlertCircle size={20} className="text-[#f4c542]" />,
    'what-this-policy-excludes': <FiShield size={20} className="text-[#f4c542]" />,
    'what-this-covers': <FiBriefcase size={20} className="text-[#f4c542]" />,
    'editorial-control': <FiFlag size={20} className="text-[#f4c542]" />,
    'how-funded': <FiDollarSign size={20} className="text-[#f4c542]" />,
    'conflicts': <FiAlertCircle size={20} className="text-[#f4c542]" />,
    'commercial-separation': <FiBarChart2 size={20} className="text-[#f4c542]" />,
    'political-influence': <FiFlag size={20} className="text-[#f4c542]" />,
    'ownership-changes': <FiRefreshCcw size={20} className="text-[#f4c542]" />,
    'informational-use': <FiInfo size={20} className="text-[#f4c542]" />,
    'copyright-reuse': <FiCopy size={20} className="text-[#f4c542]" />,
    'complaints-accuracy': <FiAlertCircle size={20} className="text-[#f4c542]" />,
    'formal-request': <FiList size={20} className="text-[#f4c542]" />,
    'removal-requests': <FiMinusCircle size={20} className="text-[#f4c542]" />,
    'third-party-links': <FiExternalLink size={20} className="text-[#f4c542]" />,
    'formal-notices': <FiBell size={20} className="text-[#f4c542]" />,
    'using-our-content': <FiFileText size={20} className="text-[#f4c542]" />,
    'accuracy-updates': <FiRefreshCcw size={20} className="text-[#f4c542]" />,
    'opinion-analysis': <FiEdit size={20} className="text-[#f4c542]" />,
    'external-links': <FiExternalLink size={20} className="text-[#f4c542]" />,
    'limitation': <FiAlertCircle size={20} className="text-[#f4c542]" />,
    'reader-contributions': <FiUsers size={20} className="text-[#f4c542]" />,
    'updates-to-terms': <FiClock size={20} className="text-[#f4c542]" />,
  };
  return iconMap[sectionId] || <FiFileText size={20} className="text-[#f4c542]" />;
}

function getNavLinksForSlug(slug) {
  const cleanSlug = slug?.toLowerCase().trim();
  const templates = {
    'advertising-policy': [
      { id: 'editorial-separation', label: 'Editorial Separation' },
      { id: 'how-labeled', label: 'How Paid Material is Labeled' },
      { id: 'native-content', label: 'Native & Partner Content' },
      { id: 'affiliate-links', label: 'Affiliate Links & Commerce' },
      { id: 'newsletters-social', label: 'Newsletters & Social' },
      { id: 'political-ads', label: 'Political Advertising' },
      { id: 'practices-avoided', label: 'Practices We Avoid' },
      { id: 'complaints', label: 'Questions & Complaints' }
    ],
    'corrections-policy': [
      { id: 'how-we-handle', label: 'How We Handle Mistakes' },
      { id: 'where-corrections', label: 'Where Corrections Appear' },
      { id: 'what-correction-includes', label: 'What A Correction Includes' },
      { id: 'reader-submissions', label: 'Reader Submissions' },
      { id: 'commitment-transparency', label: 'Our Commitment To Transparency' },
      { id: 'why-this-matters', label: 'Why This Matters' }
    ],
    'editorial-policy': [
      { id: 'editorial-independence', label: 'Editorial Independence' },
      { id: 'accuracy-verification', label: 'Accuracy & Verification' },
      { id: 'fairness-balance', label: 'Fairness & Balance' },
      { id: 'transparency', label: 'Transparency' },
      { id: 'disclosure-labeling', label: 'Disclosure & Labeling' },
      { id: 'ethical-standards', label: 'Ethical Standards' },
      { id: 'reader-feedback', label: 'Reader Feedback' },
      { id: 'our-commitment', label: 'Our Commitment' }
    ],
    'privacy-policy': [
      { id: 'information-we-collect', label: 'Information We Collect' },
      { id: 'how-used', label: 'How Information Is Used' },
      { id: 'cookies', label: 'Cookies & Analytics' },
      { id: 'your-rights', label: 'Your Rights & Choices' },
      { id: 'data-protection', label: 'Data Protection' }
    ],
    'right-of-reply': [
      { id: 'when-we-seek', label: 'When We Seek a Response' },
      { id: 'how-outreach', label: 'How Outreach Is Handled' },
      { id: 'what-to-send', label: 'What to Send Us' },
      { id: 'post-publication', label: 'Post-Publication Responses' },
      { id: 'what-not-guaranteed', label: 'What This Policy Does Not Guarantee' },
      { id: 'urgent-matters', label: 'Urgent & Legal Matters' }
    ],
    'source-methodology': [
      { id: 'how-reporting-begins', label: 'How Reporting Begins' },
      { id: 'source-hierarchy', label: 'Source Hierarchy & Verification' },
      { id: 'anonymous-sources', label: 'Anonymous Sources' },
      { id: 'documents-data', label: 'Documents, Media & Data' },
      { id: 'attribution', label: 'Attribution & Source Notes' },
      { id: 'uncertainty', label: 'Handling Uncertainty' },
      { id: 'what-this-policy-excludes', label: 'What This Policy Excludes' }
    ],
    'ownership-and-funding': [
      { id: 'what-this-covers', label: 'What This Page Covers' },
      { id: 'editorial-control', label: 'Editorial Control' },
      { id: 'how-funded', label: 'How London News is Funded' },
      { id: 'conflicts', label: 'Conflicts of Interest' },
      { id: 'commercial-separation', label: 'Commercial Separation' },
      { id: 'political-influence', label: 'Political & Advocacy Influence' },
      { id: 'ownership-changes', label: 'Ownership Changes' }
    ],
    'legal': [
      { id: 'informational-use', label: 'Informational Use of Content' },
      { id: 'copyright-reuse', label: 'Copyright, Quotation & Reuse' },
      { id: 'complaints-accuracy', label: 'Complaints About Accuracy' },
      { id: 'formal-request', label: 'What to Include in a Formal Request' },
      { id: 'removal-requests', label: 'Removal & Update Requests' },
      { id: 'third-party-links', label: 'Links to Third-Party Material' },
      { id: 'formal-notices', label: 'Formal Notices & Requests' }
    ],
    'terms-and-conditions': [
      { id: 'using-our-content', label: 'Using Our Content' },
      { id: 'accuracy-updates', label: 'Accuracy & Updates' },
      { id: 'opinion-analysis', label: 'Opinion & Analysis' },
      { id: 'external-links', label: 'External Links' },
      { id: 'limitation', label: 'Limitation of Responsibility' },
      { id: 'reader-contributions', label: 'Reader Contributions' },
      { id: 'updates-to-terms', label: 'Updates to These Terms' }
    ]
  };
  return templates[cleanSlug] || [];
}

function getHeroImageForSlug(slug) {
  const images = {
    'advertising-policy': "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80",
    'corrections-policy': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
    'editorial-policy': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
    'privacy-policy': "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    'right-of-reply': "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1920&q=80",
    'source-methodology': "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
    'ownership-and-funding': "https://images.unsplash.com/photo-1444653389962-8149286c578a?w=1920&q=80",
    'legal': "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1920&q=80",
    'terms-and-conditions': "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80",
    'contact': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
    'about': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
  };
  return images[slug] || "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80";
}

function getHeroLabelForSlug(slug) {
  if (slug?.includes('advertising')) return 'Commercial Standards';
  if (slug?.includes('privacy')) return 'Reader Trust';
  if (slug?.includes('legal')) return 'Compliance & Rights';
  return 'Our Standards';
}

// ─── Block Renderer (Custom/Landing pages) ────────────────────────────────────
function BlockRenderer({ block, index }) {
  const { ref, controls } = useScrollReveal();
  const { type, data } = block;

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } },
  };

  switch (type) {
    case "hero":
      return (
        <motion.section ref={ref} variants={variants} initial="hidden" animate={controls}
          className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center overflow-hidden">
          {data.image ? (
            <>
              <div className="absolute inset-0">
                <Image src={data.image} alt={data.imageAlt || ""} fill className="object-cover" priority={index === 0} />
              </div>
              <div className="absolute inset-0 bg-black/50" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
          )}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            {data.title && <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">{data.title}</h1>}
            {data.subtitle && <p className="mt-4 text-white/80 text-base sm:text-xl max-w-2xl mx-auto">{data.subtitle}</p>}
            {data.buttonText && data.buttonUrl && (
              <Link href={data.buttonUrl} className="inline-block mt-8 bg-[#F5C645] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#e8b800] transition-colors text-base">
                {data.buttonText}
              </Link>
            )}
          </div>
        </motion.section>
      );

    case "heading":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-4xl mx-auto px-6 sm:px-10 pt-10 pb-2">
          {data.level === 1 && <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">{data.text}</h1>}
          {data.level === 2 && <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-snug">{data.text}</h2>}
          {(data.level === 3 || !data.level) && <h3 className="text-xl sm:text-3xl font-semibold text-gray-800">{data.text}</h3>}
        </motion.div>
      );

    case "paragraph":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-4">
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-line">{data.text}</p>
        </motion.div>
      );

    case "image":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-8">
          {data.src ? (
            <>
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                <Image src={data.src} alt={data.alt || ""} fill className="object-cover" />
              </div>
              {data.caption && <p className="text-sm text-gray-400 text-center mt-3 italic">{data.caption}</p>}
            </>
          ) : (
            <div className="w-full aspect-[16/9] rounded-xl bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">No image uploaded</p>
            </div>
          )}
        </motion.div>
      );

    case "pullquote":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-8">
          <blockquote className="border-l-4 border-[#F5C645] pl-6 sm:pl-8">
            <p className="text-xl sm:text-2xl font-medium text-gray-700 italic leading-relaxed">"{data.text}"</p>
            {data.attribution && <cite className="block text-sm text-gray-400 mt-3 not-italic font-medium">— {data.attribution}</cite>}
          </blockquote>
        </motion.div>
      );

    case "list":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-6">
          {data.items?.length > 0 && (
            data.ordered ? (
              <ol className="space-y-3 text-gray-600 text-base sm:text-lg list-none">
                {data.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5C645]/20 text-[#c9a000] font-bold text-sm flex items-center justify-center mt-0.5">{idx + 1}</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="space-y-3 text-gray-600 text-base sm:text-lg list-none">
                {data.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#F5C645] mt-2.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )
          )}
        </motion.div>
      );

    case "faq":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {data.faqs?.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6 bg-gray-50" itemScope itemType="https://schema.org/Question">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2" itemProp="name">{faq.question}</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed" itemProp="text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );

    case "cta":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls} className="w-full px-6 sm:px-10 py-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a0a2e] to-[#0d0721] border border-[#2d1f4e] rounded-2xl px-8 sm:px-16 py-12 text-center">
            {data.title && <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{data.title}</h3>}
            {data.subtitle && <p className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto">{data.subtitle}</p>}
            {data.buttonText && data.buttonUrl && (
              <Link href={data.buttonUrl} className="inline-block bg-[#F5C645] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#e8b800] transition-colors text-sm tracking-wide uppercase">
                {data.buttonText}
              </Link>
            )}
          </div>
        </motion.div>
      );

    case "two_column":
      return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}
          className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
              {data.leftTitle && <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{data.leftTitle}</h3>}
              {data.leftContent && <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">{data.leftContent}</p>}
            </div>
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
              {data.rightTitle && <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{data.rightTitle}</h3>}
              {data.rightContent && <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">{data.rightContent}</p>}
            </div>
          </div>
        </motion.div>
      );

    case "spacer": {
      const px = (data?.height || 8) * 4;
      return <div style={{ height: `${px}px` }} aria-hidden="true" />;
    }

    default:
      return null;
  }
}

// ─── Custom / Landing Page ────────────────────────────────────────────────────
function CustomPage({ page }) {
  const blocks = page.blocks || [];
  if (blocks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-400 text-lg">No content blocks added yet. Edit this page in the admin panel to add content.</p>
      </div>
    );
  }
  const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <main className="w-full bg-white pb-20" itemScope itemType="https://schema.org/WebPage">
      {sortedBlocks.map((block, index) => (
        <BlockRenderer key={block._id || index} block={block} index={index} />
      ))}
    </main>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function PageClient({ page, siteUrl, siteName }) {
  const showGenericHero =
    page.template !== "custom" &&
    page.template !== "landing" &&
    page.template !== "policy" &&
    page.template !== "contact";

  return (
    <div className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-white">
      <Header siteName={siteName} />

      {/*
        SEO FIX: AnimatedHero no longer renders an <h1>.
        Only shown for templates that don't own their hero section (about, team, careers).
        policy and contact render their own full hero with their own H1 inside.
      */}
      {showGenericHero && (
        <AnimatedHero
          title={page.heroTitle || page.title}
          subtitle={page.heroSubtitle}
          image={page.heroImage}
          imageAlt={page.heroImageAlt}
        />
      )}

      {page.template === "about"   && <AboutPage   page={page} siteName={siteName} siteUrl={siteUrl} />}
      {page.template === "team"    && <TeamPage />}
      {page.template === "contact" && <ContactPage page={page} siteUrl={siteUrl} />}
      {page.template === "careers" && <CareersPage page={page} />}
      {page.template === "policy"  && <PolicyPage  page={page} />}

      {(page.template === "custom" || page.template === "landing" || !page.template) && (
        <CustomPage page={page} />
      )}

      <Footer />
    </div>
  );
}