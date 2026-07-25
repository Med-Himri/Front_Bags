import axios from "axios";
import { checkTokenExpiry } from "../utils/checkTokenExpiry";
import { logout } from "../redux/slices/adminSlice";
import store from "../redux/store";
// http://localhost:5000
// https://back-bags.vercel.app
// ✅ RIGHT (check if 'window' exists first):
const isProduction = typeof window !== "undefined" && window.location.hostname !== "localhost";

const axiosInstance = axios.create({
  baseURL: isProduction ? "https://backbags.vercel.app" : "http://localhost:5000",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (!checkTokenExpiry(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        store.dispatch(logout());
      }
    }

    return config;
  },
  (error) => {
    console.error("Error intercepting request:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
