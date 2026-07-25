"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { userLoginAPI } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { login, setAdminId } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineCalendar } from "react-icons/ai";
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
      
      toast.success(res.data.message || "Login successful!");
      router.push("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Invalid email or password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-beige-100 via-blue-100 to-green-100 text-gray-800 p-4">
      {/* Centered Login Card */}
      <div className="flex flex-col items-center justify-center w-full max-w-[500px] p-8 space-y-6 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
        {/* Icon & Header */}
        <div className="text-center mb-2">
          <AiOutlineCalendar className="text-5xl text-indigo-300 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-green-600">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Log in to access your bookings securely
          </p>
        </div>

        {error && (
          <div className="w-full p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 w-full">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 disabled:opacity-60 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 disabled:opacity-60 transition"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full py-2.5 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          <Link
            href="/sendmail"
            className="text-green-600 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </motion.div>
      </div>
    </div>
  );
}