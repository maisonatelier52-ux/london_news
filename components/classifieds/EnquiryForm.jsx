"use client";

import { useState } from "react";
import { classifiedsAPI } from "@/services/api";

export default function EnquiryForm({ classifiedId }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in every field.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      await classifiedsAPI.enquire(classifiedId, form);
      setStatus("success");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-black/10 rounded-lg p-6 bg-[#fafaf8]">
        <p className="text-[14px] text-[#1B2435] font-semibold">Enquiry sent.</p>
        <p className="text-[13px] text-black/60 mt-1">The seller will get back to you directly.</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors";

  return (
    <form onSubmit={handleSubmit} className="border border-black/10 rounded-lg p-6 flex flex-col gap-4">
      <h2 className="text-[16px] font-semibold text-[#1B2435]">Contact the seller</h2>

      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Your message"
        rows={4}
        value={form.message}
        onChange={handleChange}
        className={`${inputClass} resize-vertical`}
      />

      {error && <p className="text-[12px] text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-6 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

