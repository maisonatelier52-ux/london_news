// app/contact/page.jsx
"use client";

import { useState } from "react";
import { audienceAPI } from "@/services/api";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiSend,
  FiAlertCircle,
  FiUsers,
  FiEdit3,
} from "react-icons/fi";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa6";

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[650px] flex items-end overflow-hidden">
      {/* Background image — swap src with your actual asset */}
      <img
        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80"
        alt="London at night"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
        {/* Label */}
        <p className="text-[#f4c542] text-[13px] font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-[2px] bg-[#f4c542]" />
          In Touch
        </p>

        {/* Heading */}
        <h1
          className="text-[#f4c542] font-extrabold leading-[.88] tracking-[-0.05em] mb-6"
          style={{ fontSize: "clamp(64px, 9vw, 130px)" }}
        >
          Contact
          <br />
          London News
        </h1>

        {/* Subtext */}
        <p className="text-white/80 text-[16px] leading-relaxed max-w-[420px]">
          We welcome tips, story ideas, corrections, and feedback from our
          readers.
        </p>
      </div>
    </section>
  );
}

// ─── CONTACT INTRO ───────────────────────────────────────────────────────────
const contactItems = [
  {
    Icon: FiMapPin,
    label: "Our Office",
    lines: [
      "London News",
      "1 London Bridge Street",
      "London, SE1 9GF",
      "United Kingdom",
    ],
  },
  {
    Icon: FiMail,
    label: "General Inquiries",
    lines: ["hello@londonnews.co.uk"],
  },
  { Icon: FiPhone, label: "Phone", lines: ["+44 20 7946 0958"] },
  {
    Icon: FiClock,
    label: "Newsroom Hours",
    lines: [
      "24/7 — Our newsroom never sleeps.",
      "Tips and messages are monitored around the clock.",
    ],
  },
];

function ContactIntro() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <span className="inline-block w-10 h-[3px] bg-[#f4c542] mb-6" />
          <h2 className="text-[#0d0d0d] text-[26px] sm:text-[32px] font-bold leading-tight mb-6">
            Have a story tip, press inquiry, correction, or general question?
            <br />
            <span className="text-[#0d0d0d]/70 font-semibold">
              We&apos;d love to hear from you.
            </span>
          </h2>
          <p className="text-[#555] text-[16px] leading-[1.8]">
            Our newsroom is based in London and our journalists are working
            around the clock to bring you the news that matters across the
            capital.
          </p>
        </div>

        {/* Right — contact details */}
        <div className="space-y-6">
          {contactItems.map(({ Icon, label, lines }) => (
            <div key={label} className="flex items-start gap-4">
              {/* Icon badge */}
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#0d0d0d] flex items-center justify-center">
                <Icon className="text-[#f4c542]" size={18} />
              </div>
              <div>
                <p className="text-[#0d0d0d] font-semibold text-[14px] tracking-wide mb-1">
                  {label}
                </p>
                {lines.map((l) => (
                  <p key={l} className="text-[#555] text-[14px] leading-[1.7]">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const contactTypes = [
  {
    Icon: FiSend,
    title: "News Tips",
    desc: "Share information or story leads with our journalists.",
  },
  {
    Icon: FiAlertCircle,
    title: "Corrections",
    desc: "Help us keep our reporting accurate and up to date.",
  },
  {
    Icon: FiUsers,
    title: "Press & Media",
    desc: "Media inquiries and interview requests.",
  },
  {
    Icon: FiEdit3,
    title: "General Feedback",
    desc: "Your feedback helps us improve.",
  },
];

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // AudienceContact only stores name/email/message — fold subject in so
      // it isn't lost.
      await audienceAPI.contact({
        name: form.name,
        email: form.email,
        message: `${form.subject}\n\n${form.message}`,
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-14 bg-transparent border border-white/20 text-white placeholder-white/35 px-4 text-[14px] font-medium focus:outline-none focus:border-[#f4c542] transition-colors duration-200";

  return (
    <section className="bg-[#050505] py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
        {/* FORM */}
        <div>
          <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-8">
            Send Us a Message
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-transparent border border-white/20 text-white placeholder-white/35 px-4 py-4 text-[14px] font-medium focus:outline-none focus:border-[#f4c542] transition-colors duration-200 resize-none"
            />

            {error && (
              <p className="text-[13px] text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-[#f4c542] hover:bg-[#d9ab24] text-black font-bold text-[13px] tracking-[2.5px] uppercase transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sent ? "Message Sent ✓" : submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        {/* CONTACT TYPES */}
        <div>
          <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-8">
            What You Can Contact Us About
          </p>

          <div className="space-y-8">
            {contactTypes.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Icon className="text-[#f4c542]" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold text-[15px] mb-1">
                    {title}
                  </p>
                  <p className="text-white/50 text-[14px] leading-[1.7]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER CTA ───────────────────────────────────────────────────────────
function NewsletterCTA() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-[#ffffff] border-t border-white/10 py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left text */}
        <div>
          <p className="text-[#f4c542] text-[12px] font-semibold tracking-[3px] uppercase mb-2">
            Stay Ahead of London
          </p>
          <p className="text-black/75 text-[15px] leading-relaxed max-w-[380px]">
            Get the latest news, analysis, and stories delivered straight to
            your inbox.
          </p>
        </div>

        {/* Signup */}
        <div className="flex w-full max-w-[480px]">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-14 bg-black border border-white/10 text-white placeholder-white/50 px-5 text-[14px] focus:outline-none focus:border-[#f4c542] transition-colors duration-200"
          />
          <button className="h-14 px-7 bg-[#f4c542] hover:bg-[#d9ab24] text-black font-bold text-[12px] tracking-[2px] uppercase transition-colors duration-200 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main>
      <Hero />
      <ContactIntro />
      <ContactForm />
      <NewsletterCTA />
    </main>
  );
}