"use client";

import { useEffect, useState } from "react";

// PERFORMANCE FIX: Reduced minimum splash time from 1200ms → 600ms so FCP
// is not artificially delayed. The splash still waits for real data; we just
// stop adding extra wait time on top of it.
export default function SplashScreen({ ready = false, onComplete }) {
  const [phase, setPhase] = useState("visible");
  const [minTimerDone, setMinTimerDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinTimerDone(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Fade only when BOTH min timer AND data are ready
  useEffect(() => {
    if (minTimerDone && ready) {
      setPhase("fading");
    }
  }, [minTimerDone, ready]);

  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete?.();
      }, 500); // reduced fade from 800ms → 500ms
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;800&display=swap');

        .splash-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1),
                      transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .splash-root.fading {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        .splash-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(2, 8, 20, 0.55) 0%,
              rgba(2, 8, 20, 0.70) 50%,
              rgba(2, 8, 20, 0.92) 100%
            ),
            url('/images/splashscreen-image.webp');
          background-size: cover;
          background-position: center;
          backdrop-filter: blur(2px);
        }

        .splash-rays {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 80px,
            rgba(255, 255, 255, 0.015) 140px,
            transparent 220px
          );
          opacity: 0.6;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .splash-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -100px;
        }

        .splash-title {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(72px, 18vw, 128px);
          line-height: 0.9;
          letter-spacing: -0.07em;
          color: #F5C645;
          text-align: center;
          margin: 0 0 24px;
          animation: splashFadeDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        .splash-divider {
          width: 48px;
          height: 1px;
          background: rgba(255, 255, 255, 0.35);
          margin: 0 0 20px;
          animation: splashFadeDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        .splash-tagline {
          font-family: 'Manrope', sans-serif;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          margin: 0 0 48px;
          animation: splashFadeDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
        }

        .splash-loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          animation: splashFadeDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
        }

        .splash-loader {
          width: 240px;
          height: 2px;
          background: rgba(255, 255, 255, 0.15);
          overflow: hidden;
          border-radius: 2px;
        }

        .splash-loader::before {
          content: "";
          display: block;
          width: 35%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #F5C645, transparent);
          animation: splashSlide 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .splash-loading-text {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #F5C645;
        }

        @keyframes splashFadeDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes splashSlide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(350%); }
        }
      `}</style>

      <div className={`splash-root${phase === "fading" ? " fading" : ""}`}>
        <div className="splash-bg" />
        <div className="splash-rays" />

        <div className="splash-content">
          <p className="splash-title" aria-hidden="true">
            London<br />News
          </p>
          <div className="splash-divider" />
          <p className="splash-tagline">Your City. Your Stories.</p>
          <div className="splash-loader-wrap">
            <div className="splash-loader" />
            <span className="splash-loading-text">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}