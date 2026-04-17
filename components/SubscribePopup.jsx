"use client";

import { useEffect, useState } from "react";

export default function SubscribePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show on every page load (use sessionStorage to suppress after first close this session)
    const dismissed = sessionStorage.getItem("subscribeDismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 800); // slight delay feels natural
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("subscribeDismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end pr-8 sm:pr-16 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 pointer-events-auto"
        onClick={handleClose}
      />

      {/* Popup card */}
      <div className="relative z-10 bg-[#F5C645] w-[420px] max-w-[90vw] p-10 pointer-events-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-[#3a4a5a] text-2xl font-light leading-none bg-none border-none cursor-pointer hover:opacity-60 transition-opacity"
        >
          ×
        </button>

        {/* Header */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5a6a3a] mb-2">
          Introductory Offer
        </p>
        <div className="w-[120px] h-px bg-[#8a7a20] mb-5" />

        {/* Body */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-[22px] font-semibold uppercase text-[#2a3a1a] leading-[1.25] mb-5">
              Subscribe for<br />just £5 per year
            </h2>
            <button className="w-full bg-[#1a3a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase py-3.5 px-6 cursor-pointer hover:bg-[#2a4a5a] transition-colors">
              Subscribe Now
            </button>
          </div>

          {/* Percentage */}
          <div className="text-right min-w-[110px]">
            <span className="text-[72px] font-bold text-[#3a4a2a] leading-none tracking-[-0.04em]">
              90%
            </span>
            <p className="text-[11px] font-medium uppercase text-[#4a5a2a] mt-1 tracking-[0.06em] leading-snug">
              For the<br />first two years.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}