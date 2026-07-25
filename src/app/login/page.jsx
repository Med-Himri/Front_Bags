"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { userLoginAPI } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { login, setAdminId } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await userLoginAPI(email, password);
      
      dispatch(login(res.data.token));
      dispatch(setAdminId(res.data.adminId));
      
      toast.success(res.data.message || "Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Invalid credentials provided.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0] p-6 selection:bg-[#D4AF37] selection:text-[#111111]">
      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />
      </div>

      {/* Centered Luxury Card */}
      <div className="relative w-full max-w-[480px] bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-[#D4AF37]/30">
        {/* Brand Identity / Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#626060] border border-[#D4AF37]/40 shadow-inner mb-1">
            <Sparkles size={20} className="text-[#D4AF37]" />
          </div>
          
          <h1 className="text-3xl font-serif font-light text-[#111111]">
            Zack <span className="italic font-normal text-[#D4AF37]">Luxury</span>
          </h1>
          
          <p className="text-xs font-medium tracking-wide uppercase text-[#626060]">
            Portal Access & Concierge Management
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3 text-xs font-bold tracking-wide uppercase text-red-700 bg-red-50 border border-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5 flex items-center gap-1.5"
            >
              <Mail size={12} className="text-[#D4AF37]" />
              Direct Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@zackluxury.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full py-3 px-1 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/30 text-sm font-medium disabled:opacity-50"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5 flex items-center gap-1.5"
            >
              <Lock size={12} className="text-[#D4AF37]" />
              Passcode
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full py-3 px-1 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/30 text-sm font-medium disabled:opacity-50"
            />
          </div>

          {/* Action Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="w-full py-4 mt-2 rounded-xl text-[#111111] font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b8972e] shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{loading ? "Authenticating..." : "Authorize Sign In"}</span>
            {!loading && <ArrowRight size={14} className="text-[#111111]" />}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-8 pt-6 border-t border-[#111111]/10">
          <Link
            href="/sendmail"
            className="text-[11px] font-bold uppercase tracking-wider text-[#626060] hover:text-[#D4AF37] transition-colors"
          >
            Forgot your passcode?
          </Link>
        </div>
      </div>
    </div>
  );
}