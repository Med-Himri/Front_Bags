"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { userLoginAPI } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { login, setAdminId } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import { AiOutlineCalendar } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    userLoginAPI(email, password)
      .then((res) => {
        dispatch(login(res.data.token));
        dispatch(setAdminId(res.data.adminId));
        toast.success(res.data.message);
        router.push("/dashboard");
      })
      .catch((err) => {
        setError("Invalid email or password");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-beige-100 via-blue-100 to-green-100 text-gray-800">
      {/* Centered Login Card */}
      <div className="flex flex-col items-center justify-center  w-full max-w-[500px] p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-sm">
        {/* Icon & Header */}
        <div className="text-center mb-6">
          <AiOutlineCalendar className="text-5xl text-indigo-300 mb-3" />
          <h2 className="text-3xl font-bold text-green-600">Welcome Back</h2>
          <p className="text-gray-500">
            Log in to access your bookings securely
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 w-full">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
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
              className="mt-1 w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
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
              className="mt-1 w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-400 transition duration-300"
          >
            Log In
          </motion.button>
        </form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          <a href="/sendmail" className="text-green-600 hover:underline">
            forgot password
          </a>
        </motion.div>
      </div>
    </div>
  );
}
