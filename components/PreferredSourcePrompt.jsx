// components/PreferredSourcePrompt.jsx
"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "ln_preferred_source_dismissed";

export default function PreferredSourcePrompt() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        const timer = setTimeout(() => setVisible(true), 8000);
        return () => clearTimeout(timer);
      }
    } catch {
      // sessionStorage blocked in some private browsers — fail silently
    }
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  }

  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Add London News as a preferred source"
      className="w-full bg-[#0d0d0d] border-t border-[#F5C645]/20 py-5 px-4 sm:px-8 lg:px-12"
      style={{ position: "relative", zIndex: 9999 }}
    >
      <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F5C645]/10 border border-[#F5C645]/30 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5C645" stroke="none" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-[13px] sm:text-[14px] font-semibold leading-snug">
              Get London News in your Google results
            </p>
            <p className="text-white/55 text-[11px] sm:text-[12px] mt-1 leading-relaxed max-w-[480px]">
              Add us as a Preferred Source in Google to see our stories in Google News, AI Overviews, and AI Mode.{" "}
              <a
                href="https://support.google.com/news/answer/9986533"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer", pointerEvents: "auto" }}
                className="text-[#F5C645] underline hover:no-underline"
              >
                Learn how
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pl-11 sm:pl-0">
          <a
            href="https://news.google.com/search?q=London+News+site%3Alondon-news-two.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: "pointer", pointerEvents: "auto" }}
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F5C645] border border-[#F5C645]/40 px-4 py-2 hover:border-[#F5C645] hover:bg-[#F5C645]/5 transition-all"
          >
            Follow on Google News
          </a>

          <button
            onClick={dismiss}
            aria-label="Dismiss this prompt"
            style={{ cursor: "pointer", pointerEvents: "auto" }}
            className="text-white/30 hover:text-white/60 transition-colors p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}