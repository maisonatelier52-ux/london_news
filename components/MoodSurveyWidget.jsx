
// components/MoodSurveyWidget.jsx
// Shared mood survey widget — used on homepage, category pages, and article pages
"use client";

import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const VOTED_KEY = "london_news_mood_voted";

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function hasVotedToday() {
  if (typeof window === "undefined") return false;
  try {
    const stored = JSON.parse(localStorage.getItem(VOTED_KEY) || "{}");
    return stored.date === getTodayStr();
  } catch {
    return false;
  }
}

function markVotedToday() {
  try {
    localStorage.setItem(VOTED_KEY, JSON.stringify({ date: getTodayStr() }));
  } catch {}
}

export default function MoodSurveyWidget({ variant = "default" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSurvey, setShowSurvey] = useState(false);
  const [submitting, setSubmitting] = useState("");
  const [voted, setVoted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [breakdown, setBreakdown] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    setVoted(hasVotedToday());
    fetch(`${API_BASE}/public/mood`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          setData(d);
          setBreakdown(d.moodBreakdown || []);
          setTotalVotes(d.moodTotalVotes || 0);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function submitVote(optionKey) {
    setSubmitting(optionKey);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/public/mood/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionKey }),
      });
      const result = await res.json();

      if (res.status === 409) {
        setFeedback("You've already voted today!");
        setVoted(true);
        markVotedToday();
        setShowSurvey(false);
        return;
      }

      if (!res.ok) {
        setError(result?.error || "Couldn't record your vote.");
        return;
      }

      setBreakdown(result.moodBreakdown || breakdown);
      setTotalVotes(result.moodTotalVotes || totalVotes);
      setFeedback(result.surveySuccessText || data?.surveySuccessText || "Thanks for sharing!");
      setVoted(true);
      markVotedToday();
      setShowSurvey(false);
    } catch {
      setError("Couldn't record your vote. Please try again.");
    } finally {
      setSubmitting("");
    }
  }

  if (loading || !data) return null;

  // ── Compact variant for footers ──────────────────────────────────────────
  if (variant === "compact") {
    return (
      <section className="w-full bg-black py-8 px-4 sm:px-8 lg:px-12" aria-label="London mood">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] sm:text-[15px] font-bold uppercase text-[#F5C645] tracking-wide">
              {data.surveyTitle || "London's Mood Right Now"}
            </p>
            {/* CONTRAST FIX: text-white/40 (3.66:1) → text-white/60 (7.37:1) */}
            <p className="text-[11px] font-normal uppercase text-white/60 mt-1">
              {data.moodUpdatedText || "Updated 32 minutes ago"}
            </p>
          </div>

          {/* CONTRAST FIX: text-white/70 (9.96:1) for labels on black */}
          <div className="flex flex-wrap gap-5 text-white/70 text-[12px] uppercase tracking-wide">
            {breakdown.map(item => (
              <p key={item.key}>
                <span className="text-[18px] text-white font-light">{item.value} </span>
                {item.label}
              </p>
            ))}
          </div>

          {voted ? (
            feedback ? (
              <p className="text-[11px] text-green-400 uppercase tracking-wide">{feedback}</p>
            ) : (
              /* CONTRAST FIX: text-white/30 (2.46:1) → text-white/60 (7.37:1) */
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 border border-white/20 px-5 py-2">
                Thanks for voting!
              </p>
            )
          ) : showSurvey ? (
            <div className="flex flex-col gap-2 min-w-[180px]">
              {(data.moodOptions || []).map(opt => (
                <button
                  key={opt.key}
                  onClick={() => submitVote(opt.key)}
                  disabled={Boolean(submitting)}
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5C645] border border-[#F5C645]/40 px-4 py-2 hover:border-[#F5C645] hover:bg-[#F5C645]/10 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting === opt.key ? "Saving..." : opt.label}
                </button>
              ))}
              <button onClick={() => setShowSurvey(false)} className="text-[9px] text-white/60 uppercase tracking-wide cursor-pointer hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSurvey(true)}
              className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5C645] border border-[#F5C645]/40 px-5 py-2 hover:border-[#F5C645] transition-all cursor-pointer"
            >
              {data.surveyButtonLabel || "Take Daily Survey"}
            </button>
          )}

          {error && <p className="text-[10px] text-red-400">{error}</p>}
        </div>
      </section>
    );
  }

  // ── Default / full variant ───────────────────────────────────────────────
  return (
    <section className="w-full bg-black py-10 px-4 sm:px-8 lg:px-12 relative z-10" aria-label="London mood survey">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: headline + breakdown */}
          <div className="flex-1">
            {/*
              CONTRAST FIX: "UPDATED JUST NOW"
              text-white/40 on black = 3.66:1 (FAIL)
              → text-white/60 on black = 7.37:1 (PASS AA + AAA)
            */}
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/60 mb-2">
              {data.moodUpdatedText}
            </p>
            <h2 className="text-white text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-tight mb-6">
              {data.moodHeadline}
            </h2>

            <div className="flex flex-wrap gap-6">
              {breakdown.map(item => (
                <div key={item.key} className="text-center">
                  <div className="text-white text-[28px] sm:text-[36px] font-light leading-none">{item.value}</div>
                  {/*
                    CONTRAST FIX: breakdown labels
                    text-white/50 on black = 5.28:1 (PASS AA)
                    was text-white/50 which actually passes, keeping at /60 for consistency
                  */}
                  <div className="text-white/60 text-[11px] uppercase tracking-[0.18em] mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            {/*
              CONTRAST FIX: "X responses today"
              text-white/30 on black = 2.46:1 (FAIL)
              → text-white/60 on black = 7.37:1 (PASS AA + AAA)
            */}
            {totalVotes > 0 && (
              <p className="text-white/60 text-[11px] uppercase tracking-wide mt-4">{totalVotes} responses today</p>
            )}
          </div>

          {/* Right: survey */}
          <div className="lg:w-[300px] shrink-0">
            <div className="border border-white/10 p-6">
              {/*
                CONTRAST FIX: survey title label
                text-white/50 on black = 5.28:1 (PASS AA) — keeping at /60 for consistency
              */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
                {data.surveyTitle}
              </p>

              {voted ? (
                <p className="text-green-400 text-sm leading-relaxed">
                  {feedback || data.surveySuccessText || "Thanks for sharing your mood!"}
                </p>
              ) : showSurvey ? (
                <div className="space-y-2">
                  {(data.moodOptions || []).map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => submitVote(opt.key)}
                      disabled={Boolean(submitting)}
                      className="w-full text-left border border-white/20 hover:border-[#F5C645] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white hover:text-[#F5C645] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {submitting === opt.key ? "Saving..." : opt.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setShowSurvey(false); setError(""); }}
                    className="text-[10px] text-white/60 uppercase tracking-wide cursor-pointer hover:text-white transition-colors mt-2 block"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSurvey(true)}
                  className="inline-flex items-center bg-[#F5C645] text-black text-[10px] font-bold uppercase tracking-[0.18em] px-5 py-3 hover:bg-[#e8b800] transition-colors cursor-pointer"
                >
                  {data.surveyButtonLabel || "Take Part in Our Daily Survey"}
                </button>
              )}

              {error && <p className="text-red-400 text-[11px] mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}