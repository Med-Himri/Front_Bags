"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import { createAIProductAPI } from "@/services/product.service";
import {
  X,
  ImagePlus,
  Sparkles,
  Loader2,
  Bot,
  Package,
  DollarSign,
  Tag,
} from "lucide-react";

export default function AddAIProductCMS() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPEG, PNG, or WEBP allowed!");
      return;
    }
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );

    const newItems = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: "",
    }));

    setGalleryItems((prev) => [...prev, ...newItems]);
  };

  const handleGalleryItemChange = (idx, field, value) => {
    setGalleryItems((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const removeGalleryImage = (indexToRemove) => {
    setGalleryItems((prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview);
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName) return toast.error("Please enter a product name.");
    if (!price) return toast.error("Please set a price.");
    if (!mainImage) return toast.error("Upload a main product image.");

    setIsSubmitting(true);

    try {
      await createAIProductAPI({
        productName,
        price,
        discountPrice,
        mainImage,
        galleryItems,
      });

      toast.success("AI magic complete! Product published successfully. 🎉");

      setProductName("");
      setPrice("");
      setDiscountPrice("");
      if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
      setMainImage(null);
      setMainImagePreview(null);
      galleryItems.forEach((item) => URL.revokeObjectURL(item.preview));
      setGalleryItems([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate AI product!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cuteInput =
    "w-full bg-[#F9F6F0]/60 hover:bg-[#F9F6F0] border border-[#D4AF37]/20 rounded-2xl px-4 py-3 text-[14px] text-[#111111] font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 focus:border-[#D4AF37] transition-all placeholder:text-gray-300";
  const labelText =
    "text-[10px] font-bold text-[#626060] uppercase tracking-widest mb-2 flex items-center gap-1.5";
  const sidebarCard =
    "bg-white p-6 rounded-[2rem] border border-[#D4AF37]/20 shadow-xs";

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#111111] font-sans py-8 lg:py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <form onSubmit={handleSubmit} className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Automated Crafting
            </span>
            <h1 className="text-[2rem] font-serif font-light text-[#111111] tracking-tight flex items-center gap-3">
              AI Product Magic <Bot className="w-8 h-8 text-[#D4AF37]" />
            </h1>
            <p className="text-xs font-medium text-[#626060]">
              Provide title, pricing, and media. AI will generate descriptions, SEO metadata, and tags.
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className={`hidden lg:flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#F9F6F0] rounded-2xl shadow-md border border-[#D4AF37]/40 transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed opacity-80"
                : "bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" /> AI Crafting...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Generate & Publish
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-[#D4AF37]/20 shadow-xs space-y-8">
              <div>
                <label className={labelText}>
                  <Package className="w-3.5 h-3.5 text-[#D4AF37]" /> Product Name
                </label>
                <textarea
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="E.g., Full-Grain Leather Travel Duffle..."
                  className="w-full text-[2rem] lg:text-[2.2rem] font-serif font-light text-[#111111] placeholder:text-gray-200 outline-none bg-transparent tracking-tight leading-tight resize-none h-32"
                  required
                />
              </div>

              <hr className="border-[#D4AF37]/20" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelText}>
                    <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" /> Regular Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="299.00"
                    className={cuteInput}
                    required
                  />
                </div>
                <div>
                  <label className={labelText}>
                    <Tag className="w-3.5 h-3.5 text-[#D4AF37]" /> Exclusive Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="discountPrice"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="249.00"
                    className={cuteInput}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className={sidebarCard}>
              <h3 className={labelText}>
                <ImagePlus className="w-3.5 h-3.5 text-[#D4AF37]" /> Main Showcase Image
              </h3>
              <div className="mt-4 space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#F9F6F0]/50 rounded-3xl transition-all cursor-pointer overflow-hidden relative group">
                  {mainImagePreview ? (
                    <>
                      <Image
                        fill
                        src={mainImagePreview}
                        alt="Main Product Preview"
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-white text-xs uppercase tracking-wider">
                        Replace Showcase Image
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                      <span className="text-xs font-bold text-[#626060] uppercase tracking-wider">
                        Upload Showcase Photo
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className={sidebarCard}>
              <h3 className={labelText}>
                <ImagePlus className="w-3.5 h-3.5 text-[#D4AF37]" /> Gallery Showcase
              </h3>
              <label className="flex items-center justify-center w-full py-3 border-2 border-dashed border-[#D4AF37]/30 rounded-2xl hover:border-[#D4AF37] bg-[#F9F6F0]/50 transition-all cursor-pointer mb-4 text-[#D4AF37] font-bold text-xs uppercase tracking-wider gap-2">
                <ImagePlus className="w-4 h-4" /> Add Gallery Photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>

              {galleryItems.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                  <AnimatePresence>
                    {galleryItems.map((item, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={item.preview}
                        className="flex items-center gap-3 p-3 border border-[#D4AF37]/20 rounded-2xl bg-[#F9F6F0]/40 group"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-white">
                          <Image
                            fill
                            src={item.preview}
                            alt={`Gallery ${idx + 1}`}
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Image Alt text"
                            value={item.alt}
                            onChange={(e) =>
                              handleGalleryItemChange(idx, "alt", e.target.value)
                            }
                            className="w-full bg-white border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#D4AF37] transition-all"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="bg-white border border-[#D4AF37]/20 p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-xs shrink-0 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#F9F6F0] rounded-2xl shadow-md border border-[#D4AF37]/40 transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed opacity-80"
                : "bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" /> AI Crafting...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Generate & Publish
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}