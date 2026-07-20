"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { audienceAPI } from "@/services/api";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | already | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("submitting");

    try {
      const res = await audienceAPI.subscribe(trimmed, "subscribe-page");
      setStatus(res.data?.alreadySubscribed ? "already" : "success");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const done = status === "success" || status === "already";

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-xl mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center">
        <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#4a5a6a] mb-3">Newsletter</p>
        <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-4">
          Stay ahead of London
        </h1>
        <p className="text-[15px] text-black/60 mb-10">
          Get the latest {SITE_NAME} stories delivered straight to your inbox — no spam, unsubscribe anytime.
        </p>

        {done ? (
          <div className="border border-black/10 rounded-lg p-8 bg-[#fafaf8] text-left sm:text-center">
            <p className="text-[16px] font-semibold text-[#1B2435]">
              {status === "already" ? "You're already subscribed." : "You're subscribed!"}
            </p>
            <p className="text-[13px] text-black/60 mt-2">
              We've added <strong className="text-[#1B2435]">{email.trim()}</strong> to the list.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="you@example.com"
              aria-invalid={!!error}
              className={`flex-1 px-4 py-3 bg-white border rounded-none focus:outline-none text-black text-sm transition-colors ${
                error ? "border-red-400 focus:border-red-500" : "border-black/20 focus:border-[#F5C645]"
              }`}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {error && <p className="text-[12px] text-red-500 mt-3">{error}</p>}
      </main>

      <Footer />
    </div>
  );
}

