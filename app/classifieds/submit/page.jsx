"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { classifiedsAPI } from "@/services/api";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

const CATEGORIES = [
  { value: "property", label: "Property" },
  { value: "jobs", label: "Jobs" },
  { value: "services", label: "Services" },
  { value: "for-sale", label: "For Sale" },
];

const inputClass =
  "w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors";

export default function SubmitClassifiedPage() {
  const [form, setForm] = useState({
    title: "",
    category: "property",
    description: "",
    price: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFiles(e) {
    setImages(Array.from(e.target.files || []).slice(0, 6));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.contactEmail.trim()) {
      setError("Title, description, and contact email are required.");
      return;
    }
    setError("");
    setStatus("submitting");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      images.forEach((file) => formData.append("images", file));

      await classifiedsAPI.submit(formData);
      setStatus("success");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-3">
          Post a classified listing
        </h1>
        <p className="text-[15px] text-black/60 mb-10">
          Submit your listing for review. Once approved, it'll appear on the public classifieds page.
        </p>

        {status === "success" ? (
          <div className="border border-black/10 rounded-lg p-8 bg-[#fafaf8]">
            <p className="text-[16px] font-semibold text-[#1B2435]">Thanks — your listing has been submitted.</p>
            <p className="text-[13px] text-black/60 mt-2">
              Our team reviews every submission before it goes live. We'll be in touch if we need anything else.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">Title *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">Description *</label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                className={`${inputClass} resize-vertical`}
              />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">Price</label>
              <input
                type="text"
                name="price"
                placeholder="e.g. £450,000 or POA"
                value={form.price}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">Contact email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">Contact phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wide text-black/60 mb-2">
                Photos (WebP, up to 6)
              </label>
              <input type="file" accept="image/webp" multiple onChange={handleFiles} className="text-sm" />
            </div>

            {error && <p className="text-[12px] text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full sm:w-auto px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Submitting…" : "Submit listing"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}

