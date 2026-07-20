// app/contact/ContactForm.jsx
"use client";

import { useState } from "react";
import { audienceAPI } from "@/services/api";

const departments = [
  {
    name: "Editorial",
    email: "editorial@londonnews.com",
    description: "Story pitches, feedback on coverage, and editorial inquiries.",
    icon: "📝",
  },
  {
    name: "News Tips",
    email: "tips@londonnews.com",
    description: "Confidential story tips, documents, and investigative leads.",
    icon: "🔍",
    confidential: true,
  },
  {
    name: "Corrections",
    email: "corrections@londonnews.com",
    description: "Report errors or inaccuracies in our published content.",
    icon: "✓",
  },
  {
    name: "Advertising",
    email: "ads@londonnews.com",
    description: "Inquiries about advertising, sponsorships, and partnerships.",
    icon: "📢",
  },
  {
    name: "Press & Media",
    email: "press@londonnews.com",
    description: "Media inquiries, interview requests, and speaking engagements.",
    icon: "🎙️",
  },
  {
    name: "Technical Support",
    email: "support@londonnews.com",
    description: "Website issues, account problems, and technical questions.",
    icon: "⚙️",
  },
  {
    name: "Subscriptions",
    email: "subscriptions@londonnews.com",
    description: "Questions about newsletter subscriptions and account management.",
    icon: "📬",
  },
  {
    name: "Legal",
    email: "legal@londonnews.com",
    description: "Legal inquiries, copyright concerns, and official notices.",
    icon: "⚖️",
  },
];

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/londonnews",
    icon: (className) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/londonnews",
    icon: (className) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM12 9.162c1.655 0 3 1.345 3 3s-1.345 3-3 3-3-1.345-3-3 1.345-3 3-3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/londonnews",
    icon: (className) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    url: "https://reddit.com/r/londonnews",
    icon: (className) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-11 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5.5 5.5c-2.5 0-4.5-1.5-5-3h10c-.5 1.5-2.5 3-5 3zm0-8c0-.5.5-1 1-1s1 .5 1 1-.5 1-1 1-1-.5-1-1z" />
      </svg>
    ),
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Editorial",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    // Fold the department/subject into the message body since AudienceContact
    // only stores name/email/message — nothing else was actually wired up
    // before this, so submissions were never reaching the admin desk at all.
    try {
      const composedMessage = `[${formData.department}]${formData.subject ? ` ${formData.subject}` : ""}\n\n${formData.message}`;
      await audienceAPI.contact({
        name: formData.name,
        email: formData.email,
        message: composedMessage,
      });

      setFormStatus({
        type: "success",
        message: "Thank you for your message. We'll get back to you within 2-3 business days.",
      });
      setFormData({
        name: "",
        email: "",
        department: "Editorial",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error?.response?.data?.message || "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Form & Info Grid */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[32px] h-[3px] bg-[#F5C645]" />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">Send a message</span>
                </div>
                <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-black">
                  Drop us a line
                </h2>
                <p className="mt-2 text-[14px] text-black/60">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors appearance-none cursor-pointer"
                  >
                    {departments.map((dept) => (
                      <option key={dept.name} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors resize-vertical"
                    required
                  />
                </div>

                {formStatus.message && (
                  <div
                    className={`p-4 text-sm ${
                      formStatus.type === "error"
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-green-50 text-green-600 border border-green-200"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right Column - Contact Info & Departments */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[32px] h-[3px] bg-[#F5C645]" />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">Contact info</span>
                </div>
                <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-black">
                  How to reach us
                </h2>
              </div>

              {/* Physical Address */}
              <div className="mb-8 p-6 bg-[#f7f6f2]">
                <div className="text-[24px] mb-3">📍</div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                  Visit our newsroom
                </h3>
                <address className="not-italic text-[14px] text-black/60 leading-relaxed">
                  London News<br />
                  123 Fleet Street<br />
                  London, EC4A 2AY<br />
                  United Kingdom
                </address>
                <p className="mt-3 text-[12px] text-black/40">
                  By appointment only. Please email ahead to schedule a meeting.
                </p>
              </div>

              {/* Phone */}
              <div className="mb-8 p-6 bg-[#f7f6f2]">
                <div className="text-[24px] mb-3">📞</div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                  Phone
                </h3>
                <p className="text-[14px] text-black/60">
                  Main switchboard: <a href="tel:+442079461234" className="hover:text-[#F5C645] transition-colors">+44 (0)20 7946 1234</a>
                </p>
                <p className="text-[12px] text-black/40 mt-2">
                  Newsroom hours: Monday–Friday, 9am–6pm GMT
                </p>
              </div>

              {/* Secure Tips */}
              <div className="mb-8 p-6 bg-[#f7f6f2] border-l-4 border-[#F5C645]">
                <div className="text-[24px] mb-3">🔒</div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                  Secure story tips
                </h3>
                <p className="text-[14px] text-black/60 leading-relaxed">
                  For confidential tips, sensitive documents, or anonymous sources, please use our secure channel:
                </p>
                <p className="mt-3 text-[13px] font-mono text-[#F5C645] break-all">
                  tips@londonnews.com
                </p>
                <p className="mt-2 text-[12px] text-black/40">
                  We use encrypted email and can provide Signal/WhatsApp for sensitive communications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="w-full bg-[#fafaf8] py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-[32px] h-[3px] bg-[#F5C645]" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">Direct contacts</span>
              <div className="w-[32px] h-[3px] bg-[#F5C645]" />
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-[-0.02em] text-black">
              Contact by department
            </h2>
            <p className="mt-3 text-[14px] text-black/60 max-w-[600px] mx-auto">
              For faster responses, please email the appropriate department directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-[32px] mb-3">{dept.icon}</div>
                <h3 className="text-[15px] font-bold text-black mb-2">{dept.name}</h3>
                <p className="text-[12px] text-black/60 leading-relaxed mb-3">
                  {dept.description}
                </p>
                <a
                  href={`mailto:${dept.email}`}
                  className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F5C645] hover:text-black transition-colors"
                >
                  {dept.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="w-full bg-white py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <div className="text-[48px] mb-4">🌐</div>
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-black">
            Follow us online
          </h2>
          <p className="mt-3 text-[14px] text-black/60 max-w-[500px] mx-auto">
            Stay connected with London News across social media for updates, breaking news, and behind-the-scenes content.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-[#F5C645] transition-colors duration-300">
                  {social.icon("w-5 h-5 text-white group-hover:text-black transition-colors")}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-black/50 group-hover:text-[#F5C645]">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Response Times */}
      <section className="w-full bg-[#f7f6f2] py-12 border-y border-black/5">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-[28px] mb-2">⏱️</div>
              <div className="text-[13px] font-bold text-black">Response Time</div>
              <div className="text-[12px] text-black/50 mt-1">2-3 business days</div>
            </div>
            <div>
              <div className="text-[28px] mb-2">🔐</div>
              <div className="text-[13px] font-bold text-black">Confidentiality</div>
              <div className="text-[12px] text-black/50 mt-1">We protect sources</div>
            </div>
            <div>
              <div className="text-[28px] mb-2">🌍</div>
              <div className="text-[13px] font-bold text-black">Global Reach</div>
              <div className="text-[12px] text-black/50 mt-1">London-based, world-focused</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}