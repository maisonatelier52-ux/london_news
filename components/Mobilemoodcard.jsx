// components/MobileMoodCard.jsx
// Premium glassmorphism "London's Mood" card — mobile / tablet only.
// Self-contained: fetches its own time, weather (Open-Meteo) and mood data
// so it can be dropped in anywhere, but accepts optional overrides via props
// (weather, moodData) if a parent already has that data loaded.
"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── weather helpers ──────────────────────────────────────────────────────
function mapWeatherCodeToCondition(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 99) return "Storm";
  return "Cloudy";
}

function mapWeatherCodeToIcon(code) {
  if (code === 0) return "sunny";
  if (code <= 3) return "partly";
  if (code <= 48) return "cloudy";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 99) return "storm";
  return "cloudy";
}

// ─── mood helpers ─────────────────────────────────────────────────────────
function moodKind(key = "") {
  const k = key.toLowerCase();
  if (k.includes("happy")) return "happy";
  if (k.includes("sad")) return "sad";
  return "neutral";
}

function moodDescription(key = "") {
  const kind = moodKind(key);
  if (kind === "happy") return "Positive mood";
  if (kind === "sad") return "Needs improvement";
  return "No complaints";
}

function moodAccent(key = "") {
  const kind = moodKind(key);
  if (kind === "happy") return "#2F9E63";
  if (kind === "sad") return "#C2542F";
  return "#556270";
}

// ─── outline mood icons (minimal, stroke-only) ───────────────────────────
function MoodIcon({ kind, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (kind === "happy") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 14.3c1 1.15 2.18 1.7 3.5 1.7s2.5-.55 3.5-1.7" />
        <circle cx="9" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "sad") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 16c1-1.15 2.18-1.7 3.5-1.7s2.5.55 3.5 1.7" />
        <circle cx="9" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 15h7" />
      <circle cx="9" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── outline weather icons ────────────────────────────────────────────────
function WeatherIcon({ type, size = 30 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#1D2733",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (type) {
    case "sunny":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
      );
    case "partly":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3.2" />
          <path d="M9 3.5v1.6M9 13v1.6M3.9 9h1.6M12.5 9h1.6M5.2 5.2l1.1 1.1M11.7 5.2l-1.1 1.1" />
          <path d="M9.5 17.5h6.5a3 3 0 0 0 .3-6 4.1 4.1 0 0 0-7.8.7" />
        </svg>
      );
    case "rain":
      return (
        <svg {...common}>
          <path d="M7 16a4 4 0 0 1 .7-7.94 5 5 0 0 1 9.6.94A3.5 3.5 0 0 1 17 16H7Z" />
          <path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2" />
        </svg>
      );
    case "storm":
      return (
        <svg {...common}>
          <path d="M7 14a4 4 0 0 1 .7-7.94 5 5 0 0 1 9.6.94A3.5 3.5 0 0 1 17 14H7Z" />
          <path d="M13 14l-2.5 4h2.5l-1.5 3.5" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <path d="M7 14a4 4 0 0 1 .7-7.94 5 5 0 0 1 9.6.94A3.5 3.5 0 0 1 17 14H7Z" />
          <path d="M9 18.5h.01M12 19.5h.01M15 18.5h.01" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M7 16a4 4 0 0 1 .7-7.94 5 5 0 0 1 9.6.94A3.5 3.5 0 0 1 17 16H7Z" />
        </svg>
      );
  }
}

// ─── illustrated sunrise skyline (Big Ben + London Eye), inline SVG ──────
// Replaces the "background image" from the brief — no external asset needed,
// scales to fill the card via preserveAspectRatio="slice".
function SkylineBackground() {
  return (
    <svg
      viewBox="0 0 400 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mmcSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE3C2" />
          <stop offset="50%" stopColor="#FFF6EA" />
          <stop offset="100%" stopColor="#D9ECF6" />
        </linearGradient>
        <radialGradient id="mmcSun" cx="78%" cy="22%" r="45%">
          <stop offset="0%" stopColor="#FFF7E0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFF7E0" stopOpacity="0" />
        </radialGradient>
        <filter id="mmcBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
      </defs>

      <rect width="400" height="180" fill="url(#mmcSky)" />
      <circle cx="312" cy="40" r="70" fill="url(#mmcSun)" />

      {/* soft clouds */}
      <g fill="#FFFFFF" opacity="0.65" filter="url(#mmcBlur)">
        <ellipse cx="80" cy="34" rx="38" ry="10" />
        <ellipse cx="118" cy="27" rx="26" ry="8" />
        <ellipse cx="230" cy="20" rx="30" ry="8" />
      </g>

      {/* distant rooftops strip */}
      <g fill="#2B3A4A" opacity="0.24">
        <rect x="0" y="152" width="400" height="28" />
        <rect x="10" y="138" width="20" height="14" />
        <rect x="150" y="142" width="26" height="10" />
        <rect x="340" y="140" width="22" height="12" />
      </g>

      {/* Big Ben */}
      <g fill="#2B3A4A" opacity="0.4" filter="url(#mmcBlur)">
        <rect x="48" y="78" width="20" height="78" />
        <polygon points="48,78 58,58 68,78" />
        <rect x="55" y="64" width="6" height="10" />
      </g>
      <circle cx="58" cy="96" r="5" fill="none" stroke="#FBF6EC" strokeOpacity="0.9" strokeWidth="1.4" />

      {/* London Eye */}
      <g opacity="0.4" filter="url(#mmcBlur)">
        <circle cx="305" cy="118" r="46" fill="none" stroke="#2B3A4A" strokeWidth="3" />
        <line x1="305" y1="72" x2="305" y2="164" stroke="#2B3A4A" strokeWidth="1.4" />
        <line x1="259" y1="118" x2="351" y2="118" stroke="#2B3A4A" strokeWidth="1.4" />
        <line x1="273" y1="86" x2="337" y2="150" stroke="#2B3A4A" strokeWidth="1.4" />
        <line x1="273" y1="150" x2="337" y2="86" stroke="#2B3A4A" strokeWidth="1.4" />
        <polygon points="305,164 290,180 320,180" fill="#2B3A4A" />
      </g>
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function MobileMoodCard({ weather: weatherProp, moodData: moodDataProp, className = "" }) {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(weatherProp || null);
  const [moodData, setMoodData] = useState(moodDataProp || null);

  // clock — Europe/London, lowercase am/pm to match the design
  useEffect(() => {
    const update = () =>
      setTime(
        new Date()
          .toLocaleTimeString("en-GB", {
            timeZone: "Europe/London",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          .toLowerCase()
      );
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  // weather — skip the fetch if a parent already passed weather in
  useEffect(() => {
    if (weatherProp) return;
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true&timezone=Europe/London"
    )
      .then((r) => r.json())
      .then((data) => {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        setWeather({
          temp,
          realFeel: temp,
          condition: mapWeatherCodeToCondition(code),
          icon: mapWeatherCodeToIcon(code),
        });
      })
      .catch(() => {});
  }, [weatherProp]);

  // mood — skip the fetch if a parent already passed moodData in
  useEffect(() => {
    if (moodDataProp) return;
    fetch(`${API_BASE}/public/mood`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setMoodData(d);
      })
      .catch(() => {});
  }, [moodDataProp]);

  const headline = moodData?.moodHeadline || "London is okay right now";
  const breakdown =
    moodData?.moodBreakdown?.length > 0
      ? moodData.moodBreakdown
      : [
          { key: "happy", label: "Happy", value: "62%" },
          { key: "neutral", label: "Neutral", value: "28%" },
          { key: "sad", label: "Sad", value: "10%" },
        ];

  const w = weather || { temp: 18, realFeel: 17, condition: "Clear sky", icon: "sunny" };

  return (
    <div
      className={`block lg:hidden relative w-full min-h-[180px] rounded-[18px] overflow-hidden ${className}`}
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
      role="group"
      aria-label="London's mood and current weather"
    >
      {/* Inter, loaded just for this card */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap');`}</style>

      {/* Illustrated sunrise skyline */}
      <SkylineBackground />

      {/* Frosted glass layer — kept light so the skyline art stays visible */}
      <div className="absolute inset-0 bg-white/15 backdrop-blur-sm" />

      {/* Content — auto-height, so a longer headline or extra mood items
          never get clipped by the card's bottom edge */}
      <div
        className="relative z-10 p-6 flex flex-col gap-5"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          {/* Top-left: label + headline */}
          <div style={{ maxWidth: "58%" }}>
            <p
              className="font-semibold uppercase"
              style={{ fontSize: 14, color: "#3A4655", letterSpacing: "1px" }}
            >
              London&rsquo;s Mood
            </p>
            <p
              className="font-bold"
              style={{ fontSize: 26, lineHeight: 1.15, color: "#1D2733", marginTop: 8 }}
            >
              {headline}
            </p>
          </div>

          {/* Top-right: time + weather */}
          <div className="flex flex-col items-center text-center shrink-0">
            <p className="font-medium" style={{ fontSize: 14, color: "#556270" }}>
              {time}
            </p>
            <div className="mt-1">
              <WeatherIcon type={w.icon} size={30} />
            </div>
            <p className="font-bold leading-none" style={{ fontSize: 48, color: "#1D2733", marginTop: 2 }}>
              {w.temp}&deg;C
            </p>
            <p className="font-medium" style={{ fontSize: 14, color: "#6B7280", marginTop: 2 }}>
              Feels like {w.realFeel}&deg;
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.5)", flexShrink: 0 }} />

        {/* Mood stats */}
        <div className="grid grid-cols-3 gap-6">
          {breakdown.slice(0, 3).map((item) => {
            const kind = moodKind(item.key || item.label);
            return (
              <div key={item.key || item.label} className="flex flex-col items-center text-center">
                <span style={{ color: moodAccent(item.key || item.label) }}>
                  <MoodIcon kind={kind} />
                </span>
                <p className="font-bold" style={{ fontSize: 18, color: "#1D2733", marginTop: 6 }}>
                  {item.value}
                </p>
                <p className="font-medium" style={{ fontSize: 11, color: "#667085" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 10, color: "#9AA5B1", marginTop: 1 }}>
                  {moodDescription(item.key || item.label)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}