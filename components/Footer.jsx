

// // components/Footer.jsx
// "use client";

// import React, { useState } from 'react';
// import Image from 'next/image';

// import { FaInstagram, FaXTwitter, FaReddit } from "react-icons/fa6";
// import { SiMedium, SiSubstack } from "react-icons/si";

// function Footer() {
//   const [email, setEmail] = useState('');
//   const [subscriptionStatus, setSubscriptionStatus] = useState({ type: '', message: '' });

//   const handleSubscribe = (e) => {
//     e.preventDefault();

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       setSubscriptionStatus({ type: 'error', message: 'Please enter an email address.' });
//       return;
//     }
//     if (!emailRegex.test(email)) {
//       setSubscriptionStatus({ type: 'error', message: 'Please enter a valid email address (e.g., name@example.com).' });
//       return;
//     }

//     // Simulate successful subscription
//     setSubscriptionStatus({ type: 'success', message: 'Successfully subscribed! Check your inbox for the latest London news.' });
//     setEmail('');

//     setTimeout(() => {
//       setSubscriptionStatus({ type: '', message: '' });
//     }, 5000);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="relative w-full bg-[#0A0A0A] overflow-hidden">
//       {/* Background Image with very low opacity (10-15%) */}
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-10"
//         style={{ backgroundImage: "url('/images/home-img-8.webp')" }}
//       />
      
//       {/* Glassmorphism overlay for premium feel */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-[1px]" />

//       {/* Main Footer Content */}
//       <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16 py-16 lg:py-20">
        
//         {/* Top Section - 5 Column Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 border-b border-white/10 pb-12 mb-10">
          
//           {/* COLUMN 1 - Brand Section */}
//           <div className="lg:col-span-1 space-y-5">
//             {/* Gold Accent Line */}
//             <div className="w-10 h-[2px] bg-[#F5C542]"></div>
            
//             {/* Logo / Brand Name */}
//             <div>
//               <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
//                 LONDON<br />
//                 <span className="font-serif italic text-[#F5C542]">News</span>
//               </h2>
//             </div>
            
//             {/* Brand Description */}
//             <p className="text-white/60 text-sm leading-relaxed">
//               Independent coverage of London politics, business, culture, lifestyle, technology and sport.
//             </p>
            
//             {/* Subtle London Skyline Illustration Placeholder */}
//             <div className="mt-4">
//               <Image 
//                 src="/images/footer-text-image.webp" 
//                 alt="London Icon" 
//                 width={168}
//                 height={100}
//                 className="w-42 h-auto opacity-80"
//                 onError={(e) => { e.currentTarget.style.display = 'none' }} // Hides if image missing
//               />
//             </div>
//           </div>

//           {/* COLUMN 2 - Newsroom */}
//           <div className="space-y-4">
//             <h3 className="text-[#F5C542] text-xs font-semibold tracking-[0.2em] uppercase">Newsroom</h3>
//             <ul className="space-y-2">
//               <li><a href="/about" className="text-white/60 hover:text-white text-sm transition-colors duration-200">About Us</a></li>
//               <li><a href="/authors" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Our Team</a></li>
//               <li><a href="/contact" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Contact Us</a></li>
//               <li><a href="/editorial-policy" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Editorial Policy</a></li>
//               <li><a href="/corrections" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Corrections Policy</a></li>
//               <li><a href="/methodology" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Source Methodology</a></li>
//             </ul>
//           </div>

//           {/* COLUMN 3 - Standards & Transparency */}
//           <div className="space-y-4">
//             <h3 className="text-[#F5C542] text-xs font-semibold tracking-[0.2em] uppercase">Standards</h3>
//             <ul className="space-y-2">
//               <li><a href="/ownership" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Ownership & Funding</a></li>
//               <li><a href="/advertising" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Advertising Policy</a></li>
//               <li><a href="/right-of-reply" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Right of Reply</a></li>
//               <li><a href="/fact-checking" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Fact Checking Policy</a></li>
//               <li><a href="/newsroom-standards" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Newsroom Standards</a></li>
//             </ul>
//           </div>

//           {/* COLUMN 4 - Legal */}
//           <div className="space-y-4">
//             <h3 className="text-[#F5C542] text-xs font-semibold tracking-[0.2em] uppercase">Legal</h3>
//             <ul className="space-y-2">
//               <li><a href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a></li>
//               <li><a href="/terms" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Terms & Conditions</a></li>
//               <li><a href="/cookies" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a></li>
//               <li><a href="/disclaimer" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Disclaimer</a></li>
//               <li><a href="/accessibility" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Accessibility Statement</a></li>
//             </ul>
//           </div>

//           {/* COLUMN 5 - Newsletter */}
//           <div className="space-y-4">
//             <div className="w-10 h-[2px] bg-[#F5C542]"></div>
//             <h3 className="text-xl font-light text-white tracking-tight">Stay Ahead of<br />London</h3>
//             <p className="text-white/50 text-sm leading-relaxed">
//               Get the latest London news delivered directly to your inbox.
//             </p>
            
//             <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
//               <div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Email address"
//                   className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-none focus:outline-none focus:border-[#F5C542] text-white placeholder:text-white/30 text-sm transition-colors duration-200"
//                   aria-label="Email address for newsletter"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 bg-[#F5C542] hover:bg-[#e0b83a] text-black font-medium text-sm uppercase tracking-wider transition-colors duration-200"
//               >
//                 Subscribe
//               </button>
//             </form>
            
//             {/* Status Message */}
//             {subscriptionStatus.message && (
//               <div className={`text-xs ${subscriptionStatus.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
//                 {subscriptionStatus.message}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
//           {/* Copyright */}
//           <div className="text-white/40 text-xs tracking-wide">
//             © 2026 London News. All Rights Reserved.
//           </div>
          
//           {/* Social Media Icons */}
//           <div className="flex gap-6">
//             <a 
//               href="#" 
//               className="text-white/40 hover:text-[#F5C542] transition-colors duration-200"
//               aria-label="Instagram"
//             >
//               <FaInstagram size={16} />
//             </a>
//             <a 
//               href="#" 
//               className="text-white/40 hover:text-[#F5C542] transition-colors duration-200"
//               aria-label="Twitter"
//             >
//               <FaXTwitter size={16} />
//             </a>
//             <a 
//               href="#" 
//               className="text-white/40 hover:text-[#F5C542] transition-colors duration-200"
//               aria-label="Reddit"
//             >
//               <FaReddit size={16} />
//             </a>
//             <a 
//               href="#" 
//               className="text-white/40 hover:text-[#F5C542] transition-colors duration-200"
//               aria-label="Medium"
//             >
//               <SiMedium size={16} />
//             </a>
//             <a 
//               href="#" 
//               className="text-white/40 hover:text-[#F5C542] transition-colors duration-200"
//               aria-label="Substack"
//             >
//               <SiSubstack size={16} />
//             </a>
//           </div>
          
//           {/* Back to Top */}
//           <button
//             onClick={scrollToTop}
//             className="text-white/40 hover:text-[#F5C542] text-xs uppercase tracking-wider transition-colors duration-200 flex items-center gap-1"
//           >
//             Back To Top
//             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

// components/Footer.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaReddit, FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa6";
import { SiMedium, SiSubstack } from "react-icons/si";
import { FiSend } from "react-icons/fi";
import { audienceAPI } from "@/services/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function Footer() {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({ type: '', message: '' });
  const [imageError, setImageError] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/public/footer`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.backgroundImage) {
          let baseUrl = API_BASE.replace('/api', '');
          let imagePath = data.backgroundImage;
          if (!imagePath.startsWith('/')) imagePath = '/' + imagePath;
          const fullUrl = `${baseUrl}${imagePath}`;
          setBackgroundImageUrl(fullUrl);

          const img = new window.Image();
          img.onload = () => setImageError(false);
          img.onerror = () => setImageError(true);
          img.src = fullUrl;
        } else {
          setBackgroundImageUrl(null);
        }
        setFooter(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setSubscriptionStatus({ type: 'error', message: 'Please enter an email address.' });
      return;
    }
    if (!emailRegex.test(email)) {
      setSubscriptionStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    audienceAPI.subscribe(email, 'footer')
      .then(() => {
        setSubscriptionStatus({ type: 'success', message: footer?.newsletterSuccessText || 'Successfully subscribed! Check your inbox.' });
        setEmail('');
      })
      .catch((err) => {
        setSubscriptionStatus({
          type: 'error',
          message: err?.response?.data?.message || 'Something went wrong. Please try again.',
        });
      })
      .finally(() => {
        setTimeout(() => setSubscriptionStatus({ type: '', message: '' }), 5000);
      });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialIcons = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    twitter: FaXTwitter,
    linkedin: FaLinkedin,
    reddit: FaReddit,
    telegram: FiSend,
    medium: SiMedium,
    substack: SiSubstack,
  };

  const renderLink = (link) => {
    if (!link) return null;
    if (link.externalUrl) {
      return (
        <a href={link.externalUrl} target="_blank" rel="noopener noreferrer"
          className="text-white/70 hover:text-white text-sm transition-colors duration-200">
          {link.title}
        </a>
      );
    }
    if (link.slug) {
      return (
        <Link href={`/page/${link.slug}`}
          className="text-white/70 hover:text-white text-sm transition-colors duration-200 block">
          {link.title}
        </Link>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <footer className="relative w-full bg-[#0A0A0A] py-8">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <div className="inline-block w-6 h-6 border-2 border-[#F5C542] border-t-transparent rounded-full animate-spin" />
        </div>
      </footer>
    );
  }

  const footerData = footer || {
    siteDescription: "Independent coverage of London politics, business, culture, lifestyle, technology and sport.",
    column1Title: "Newsroom",
    column2Title: "Standards",
    column3Title: "Legal",
    column4Title: "Get Involved",
    column1Links: [],
    column2Links: [],
    column3Links: [],
    column4Links: [],
    socialLinks: {},
    copyrightText: "© 2026 London News. All Rights Reserved.",
    newsletterTitle: "Stay Ahead of London",
    newsletterDescription: "Get the latest London news delivered directly to your inbox.",
    newsletterButtonText: "Subscribe",
  };

  return (
    <footer className="relative w-full bg-[#0A0A0A] overflow-hidden">
      {/* Background Image */}
      {backgroundImageUrl && !imageError && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}

      {(!backgroundImageUrl || imageError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      )}

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 border-b border-white/10 pb-12 mb-10">

          {/* COLUMN 1 — Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="w-10 h-[2px] bg-[#F5C542]" />
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                LONDON<br />
                <span className="font-serif italic text-[#F5C542]">News</span>
              </h2>
            </div>
            {/* CONTRAST FIX: text-white/60 → text-white/70 for body text (9.96:1) */}
            <p className="text-white/70 text-sm leading-relaxed">
              {footerData.siteDescription}
            </p>
            <div className="mt-4">
              {/*
                PERFORMANCE FIX: replaced <img> with Next.js <Image> so that:
                1. width/height are explicit → prevents CLS (layout shift)
                2. Next.js optimises and serves a correctly-sized WebP
                   instead of the oversized 1742×903 original (saves ~63 KiB)
                The displayed size is 168×87px (maintaining the ~1.93:1 aspect ratio).
              */}
              <Image
                src="/images/footer-text-image.webp"
                alt="London News"
                width={168}
                height={87}
                className="opacity-80"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* COLUMN 2 — Newsroom */}
          <div className="space-y-4">
            <h3 className="text-[#F5C542] text-xs font-semibold tracking-[0.2em] uppercase">{footerData.column1Title}</h3>
            <ul className="space-y-2">
              {footerData.column1Links?.map((link, idx) => (
                <li key={idx}>{renderLink(link)}</li>
              ))}
              {(!footerData.column1Links || footerData.column1Links.length === 0) && (
                <li className="text-white/50 text-sm">No links yet</li>
              )}
            </ul>
          </div>

          {/* COLUMN 3 — Standards */}
          <div className="space-y-4">
            <h3 className="text-[#F5C542] text-xs font-semibold tracking-[0.2em] uppercase">{footerData.column2Title}</h3>
            <ul className="space-y-2">
              {footerData.column2Links?.map((link, idx) => (
                <li key={idx}>{renderLink(link)}</li>
              ))}
              {(!footerData.column2Links || footerData.column2Links.length === 0) && (
                <li className="text-white/50 text-sm">No links yet</li>
              )}
            </ul>
          </div>

          {/* COLUMN 4 — Legal */}
          <div className="space-y-4">
            <h3 className="text-[#F5C542] text-xs font-semibold tracking-[0.2em] uppercase">{footerData.column3Title}</h3>
            <ul className="space-y-2">
              {footerData.column3Links?.map((link, idx) => (
                <li key={idx}>{renderLink(link)}</li>
              ))}
              {(!footerData.column3Links || footerData.column3Links.length === 0) && (
                <li className="text-white/50 text-sm">No links yet</li>
              )}
            </ul>
          </div>

          {/* COLUMN 5 — Newsletter */}
          <div className="space-y-4">
            <div className="w-10 h-[2px] bg-[#F5C542]" />
            <h3 className="text-xl font-light text-white tracking-tight">{footerData.newsletterTitle}</h3>
            {/* CONTRAST FIX: text-white/50 → text-white/60 (7.37:1) */}
            <p className="text-white/60 text-sm leading-relaxed">
              {footerData.newsletterDescription}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:outline-none focus:border-[#F5C542] text-white placeholder:text-white/40 text-sm transition-colors duration-200"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#F5C542] hover:bg-[#e0b83a] text-black font-medium text-sm uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              >
                {footerData.newsletterButtonText}
              </button>
            </form>
            {subscriptionStatus.message && (
              <div className={`text-xs ${subscriptionStatus.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {subscriptionStatus.message}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          {/* CONTRAST FIX: text-white/40 → text-white/60 */}
          <div className="flex items-center gap-5 text-white/60 text-xs tracking-wide">
            <span>{footerData.copyrightText}</span>
            <Link href="/classifieds" className="hover:text-[#F5C542] uppercase tracking-wider transition-colors duration-200">
              Classifieds
            </Link>
            <Link href="/subscribe" className="hover:text-[#F5C542] uppercase tracking-wider transition-colors duration-200">
              Subscribe
            </Link>
          </div>

          <div className="flex gap-6">
            {Object.entries(footerData.socialLinks || {}).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon || !url) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* CONTRAST FIX: text-white/40 → text-white/60 */
                  className="text-white/60 hover:text-[#F5C542] transition-colors duration-200"
                  aria-label={platform}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          <button
            onClick={scrollToTop}
            /* CONTRAST FIX: text-white/40 → text-white/60 */
            className="text-white/60 hover:text-[#F5C542] text-xs uppercase tracking-wider transition-colors duration-200 flex items-center gap-1 cursor-pointer"
          >
            Back To Top
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
