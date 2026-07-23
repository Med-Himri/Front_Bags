"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PlusCircle, Layers, Sparkles, ShieldCheck } from "lucide-react";

// Components
import AddProductCMS from "./Addproduct/AddProduct";
import ShowProductRequests from "./ShowProducts/ShowProducts";
import AddAIProductCMS from "./addaiproduct/Addaiproduct";

const Management = () => {
  const [activeTab, setActiveTab] = useState("Add Product");
  const [isMounted, setIsMounted] = useState(false);

  const loggedIn = useSelector((state) => state.admin.loggedIn);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loggedIn) {
      toast.warning("Please authenticate to access the Atelier Portal.");
      router.push("/login");
    }
  }, [loggedIn, router, isMounted]);

  if (!isMounted || !loggedIn) return null;

  const tabs = [
    { id: "Add Product", label: "Create Craft", icon: <PlusCircle size={16} /> },
    { id: "Add AI Product", label: "AI Assisted Creation", icon: <Sparkles size={16} /> },
    { id: "Show Products", label: "Catalog Overview", icon: <Layers size={16} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Add AI Product":
        return <AddAIProductCMS />;
      case "Show Products":
        return <ShowProductRequests />;
      case "Add Product":
      default:
        return <AddProductCMS />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#111111] antialiased">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-[#D4AF37]/20 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Atelier Control Center
                </span>
                <span className="inline-flex items-center gap-1 bg-[#111111] text-[#F9F6F0] text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  <ShieldCheck size={10} className="text-[#D4AF37]" />
                  Admin
                </span>
              </div>
              <h1 className="text-3xl font-serif font-light text-[#111111]">
                Zack Luxury Management
              </h1>
              <p className="text-[#626060] text-xs font-medium max-w-md">
                Manage, curate, and publish handcrafted leather artifacts to your global showroom.
              </p>
            </div>

            {/* Atelier Tab Switcher */}
            <nav className="flex bg-[#F9F6F0] p-1.5 rounded-2xl border border-[#D4AF37]/20 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer ${
                    activeTab === tab.id
                      ? "text-[#111111]"
                      : "text-[#626060] hover:text-[#111111]"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeAtelierTab"
                      className="absolute inset-0 bg-white shadow-md rounded-xl border border-[#D4AF37]/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeTab === tab.id ? "text-[#D4AF37]" : ""}`}>
                    {tab.icon}
                  </span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Management;