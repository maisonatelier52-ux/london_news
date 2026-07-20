// components/HeroMoodDisplay.jsx
// Displays mood percentages (Happy%, Sad%, Can't Complain%) in the hero section

"use client";

import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getDisplayLabel(label) {
  if (!label) return "";
  // Special handling for "cantcomplain" or "can't complain"
  if (label.toLowerCase().includes("cant") || label.toLowerCase().includes("can't")) {
    return "Can't Complain";
  }
  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

export default function HeroMoodDisplay({ moodData, loading, className = "" }) {
  // If no data is passed in props, fetch it internally
  const [internalData, setInternalData] = useState(null);
  const [internalLoading, setInternalLoading] = useState(true);

  const isLoading = loading !== undefined ? loading : internalLoading;
  const data = moodData || internalData;

  useEffect(() => {
    if (!moodData) {
      setInternalLoading(true);
      fetch(`${API_BASE}/public/mood`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data) {
            
            setInternalData(data);
          }
          setInternalLoading(false);
        })
        .catch(() => setInternalLoading(false));
    }
  }, [moodData]);

  if (isLoading) {
    return (
      <div className={`flex flex-wrap gap-6 sm:gap-10 items-center ${className}`}>
        <div className="text-center animate-pulse">
          <div className="h-8 w-12 bg-white/20 rounded" />
          <div className="h-3 w-10 bg-white/20 rounded mt-1" />
        </div>
        <div className="text-center animate-pulse">
          <div className="h-8 w-12 bg-white/20 rounded" />
          <div className="h-3 w-10 bg-white/20 rounded mt-1" />
        </div>
        <div className="text-center animate-pulse">
          <div className="h-8 w-12 bg-white/20 rounded" />
          <div className="h-3 w-10 bg-white/20 rounded mt-1" />
        </div>
      </div>
    );
  }

  const breakdown = data?.moodBreakdown || [];

  if (breakdown.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-6 sm:gap-10 items-center ${className}`}>
      {breakdown.map((item) => (
        <div key={item.key} className="text-center">
          <div className="text-white/60 text-[12px] sm:text-[20px] lg:text-[28px] font-light leading-none">
            {item.value}
          </div>
          <div className="text-white/60 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] mt-1">
            {getDisplayLabel(item.label)}
          </div>
        </div>
      ))}
    </div>
  );
}