"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FiHome, FiLock, FiEye, FiEyeOff,
  FiCheckCircle, FiAlertCircle, FiArrowLeft,
} from "react-icons/fi";
import { authAdminAPI } from "@/services/adminAPI";

function ResetPasswordForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const token        = searchParams.get("token");

  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [verifying, setVerifying]             = useState(true);
  const [tokenValid, setTokenValid]           = useState(false);
  const [error, setError]                     = useState("");
  const [success, setSuccess]                 = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setVerifying(false);
      return;
    }
    (async () => {
      try {
        const res = await authAdminAPI.verifyResetToken(token);
        setTokenValid(res.data?.valid === true);
      } catch {
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    })();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await authAdminAPI.resetPassword({ token, password });
      setSuccess(true);
      setTimeout(() => router.push("/admin/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (pw) => {
    if (!pw)        return { label: "",       color: "bg-gray-700",   width: "0%"   };
   if (pw.length < 4)  return { label: "Weak",   color: "bg-red-500",    width: "25%"  };
    if (pw.length < 6)  return { label: "Fair",   color: "bg-yellow-500", width: "50%"  };
    if (pw.length < 10) return { label: "Good",   color: "bg-blue-500",   width: "75%" };
    return              { label: "Strong", color: "bg-green-500",  width: "100%" };
  };
  const strength = getStrength(password);

  if (verifying) return (
    <div className="text-center py-8">
      <div className="w-10 h-10 border-2 border-[#F5C645] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-400 text-sm">Verifying link…</p>
    </div>
  );

  if (!tokenValid) return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full">
        <FiAlertCircle size={32} className="text-red-400" />
      </div>
      <h2 className="text-white text-xl font-semibold">Link Invalid or Expired</h2>
      <p className="text-gray-400 text-sm">
        This reset link is no longer valid. Links expire after 1 hour.
      </p>
      <Link
        href="/admin/forgot-password"
        className="inline-flex items-center gap-2 bg-[#F5C645] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[#F5C645]/90 transition-all text-sm mt-2"
      >
        Request a new link
      </Link>
    </div>
  );

  if (success) return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full">
        <FiCheckCircle size={32} className="text-green-400" />
      </div>
      <h2 className="text-white text-xl font-semibold">Password Reset!</h2>
      <p className="text-gray-400 text-sm">Your password has been updated. Redirecting to login…</p>
      <div className="w-8 h-8 border-2 border-[#F5C645] border-t-transparent rounded-full animate-spin mx-auto mt-2" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* New password */}
      <div>
        <label className="block text-gray-300 mb-2 text-sm">New Password</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-[#F5C645] transition-colors"
            placeholder="Min. 6 characters"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer">
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {password && (
          <div className="mt-2 space-y-1">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: strength.width }} />
            </div>
            <p className="text-xs text-gray-500">
              Strength: <span className="text-gray-300">{strength.label}</span>
            </p>
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div>
        <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full bg-gray-900/50 border rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none transition-colors
              ${confirmPassword && confirmPassword !== password
                ? "border-red-500/70 focus:border-red-500"
                : "border-gray-700 focus:border-[#F5C645]"}`}
            placeholder="Repeat your password"
            required
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer">
            {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {confirmPassword && confirmPassword !== password && (
          <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#F5C645] text-black font-semibold py-3 rounded-lg hover:bg-[#F5C645]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Resetting…" : "Reset Password"}
      </button>

      <div className="text-center">
        <Link href="/admin/login"
          className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-[#F5C645] transition-colors">
          <FiArrowLeft size={14} /> Back to login
        </Link>
      </div>
    </form>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5C645] rounded-full mb-4">
            <FiHome size={40} className="text-black" />
          </div>
          <h1 className="text-white text-3xl font-bold">News Portal Admin</h1>
          <p className="text-gray-400 mt-2">Set a new password</p>
        </div>
        <div className="bg-black/50 backdrop-blur-sm border border-[#F5C645]/20 rounded-2xl p-8">
          <Suspense fallback={
            <div className="text-center py-8">
              <div className="w-10 h-10 border-2 border-[#F5C645] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}