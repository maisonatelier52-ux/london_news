"use client";

import { useState } from "react";
import Link from "next/link";
import { FiHome, FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { authAdminAPI } from "@/services/adminAPI";

export default function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authAdminAPI.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5C645] rounded-full mb-4">
            <FiHome size={40} className="text-black" />
          </div>
          <h1 className="text-white text-3xl font-bold">News Portal Admin</h1>
          <p className="text-gray-400 mt-2">Reset your password</p>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-[#F5C645]/20 rounded-2xl p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full">
                <FiCheckCircle size={32} className="text-green-400" />
              </div>
              <h2 className="text-white text-xl font-semibold">Check your email</h2>
              <p className="text-gray-400 text-sm">
                If <span className="text-[#F5C645]">{email}</span> is registered,
                you'll receive a reset link within a few minutes.
              </p>
              <p className="text-gray-500 text-xs">Don't see it? Check your spam folder.</p>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-[#F5C645] text-sm hover:underline mt-4"
              >
                <FiArrowLeft size={14} /> Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-gray-400 text-sm">
                Enter your admin email and we'll send you a link to reset your password.
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#F5C645] transition-colors"
                    placeholder="admin@newsportal.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F5C645] text-black font-semibold py-3 rounded-lg hover:bg-[#F5C645]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>

              <div className="text-center">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-[#F5C645] transition-colors"
                >
                  <FiArrowLeft size={14} /> Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}