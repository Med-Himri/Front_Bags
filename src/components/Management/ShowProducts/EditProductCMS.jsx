"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useQuill } from "react-quilljs";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  UploadCloud,
  Settings,
  Package,
  DollarSign,
  Layers,
  ArrowLeft,
  Sparkles,
  Loader2,
  Tag,
  FileText,
} from "lucide-react";
import "quill/dist/quill.snow.css";
import { updateProductAPI } from "@/services/user.service";

/* ================= Utils ================= */
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function EditProductCMS({ productId, onBack }) {
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const mainRef = useRef(null);
  const galleryRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    price: "",
    discountPrice: "",
    category: "",
    tags: "",
    shortDescription: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  /* ================= Editor ================= */
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const { quill, quillRef } = useQuill({ theme: "snow", modules });

  /* ================= Fetch Existing Data ================= */
  useEffect(() => {
    if (!productId) return;

    const fetchProductData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/product/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product data");
        const data = await res.json();

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          price: data.price || "",
          discountPrice: data.discountPrice || "",
          category: data.category || "",
          tags: data.tags ? data.tags.join(", ") : "",
          shortDescription: data.shortDescription || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
        });

        if (data.mainImage?.url) {
          setMainPreview(data.mainImage.url);
        }

        if (data.gallery && data.gallery.length > 0) {
          setExistingGallery(data.gallery);
        }

        if (data.description) {
          setDescription(data.description);
          if (quill) {
            quill.clipboard.dangerouslyPasteHTML(data.description);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load product details");
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId, quill]);

  /* Handle Quill Text Changes */
  useEffect(() => {
    if (!quill) return;
    quill.on("text-change", () => {
      setDescription(quill.root.innerHTML);
    });
  }, [quill]);

  /* ================= Handlers ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  const handleGallery = (e) => {
    const files = Array.from(e.target.files || []);
    setNewGallery((p) => [...p, ...files]);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateProductAPI(productId, {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        description,
        mainImage,
        newGallery,
      });
      toast.success("Craft artifact updated successfully.");
      if (onBack) onBack();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setIsUpdating(false);
    }
  };

  /* ================= UI ================= */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center space-y-3 antialiased text-[#111111]">
        <Loader2 className="animate-spin text-[#D4AF37]" size={36} />
        <p className="text-xs font-bold uppercase tracking-widest text-[#626060]">
          Loading Atelier Artifact...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 text-[#111111] antialiased">
      {/* Top Action Header */}
      <header className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-[#F9F6F0] text-[#111111] hover:bg-[#111111] hover:text-[#F9F6F0] transition-colors border border-[#D4AF37]/30 cursor-pointer"
              aria-label="Back to collection"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Atelier Curator
            </span>
            <h1 className="text-xl font-serif font-light text-[#111111] flex items-center gap-2">
              <Package size={20} className="text-[#D4AF37]" /> Edit Leather Artifact
            </h1>
          </div>
        </div>

        <motion.button
          onClick={handleUpdate}
          disabled={isUpdating}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest rounded-xl border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isUpdating ? (
            <Loader2 size={16} className="animate-spin text-[#D4AF37]" />
          ) : (
            <Sparkles size={16} className="text-[#D4AF37]" />
          )}
          <span>{isUpdating ? "Saving Changes..." : "Update Artifact"}</span>
        </motion.button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Primary Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
                Artifact Title
              </label>
              <input
                name="title"
                placeholder="e.g. Royal Leather Tote"
                value={form.title}
                onChange={handleChange}
                className="text-2xl font-serif font-light w-full outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] pb-2 text-[#111111] placeholder:text-gray-300 transition-colors"
              />
            </div>

            {/* Permalink Slug */}
            <div className="flex items-center gap-2 p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/20 text-xs">
              <span className="text-[#626060] font-mono text-[11px]">
                zackluxury.com/product/
              </span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="text-[#111111] font-mono text-[11px] bg-transparent flex-1 outline-none font-semibold"
              />
              <button
                type="button"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    slug: slugify(p.title),
                  }))
                }
                className="text-[10px] uppercase tracking-wider font-bold border border-[#D4AF37]/40 px-3 py-1 rounded-lg bg-white text-[#111111] hover:bg-[#111111] hover:text-[#F9F6F0] transition-colors cursor-pointer"
              >
                Auto-Generate
              </button>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
                Short Summary
              </label>
              <textarea
                name="shortDescription"
                placeholder="Brief summary of full-grain leather composition and artisan origin..."
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37] text-[#111111] leading-relaxed transition-colors"
                rows={3}
              />
            </div>

            {/* Rich Editor */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
                <FileText size={14} className="text-[#D4AF37]" /> Full Craftsmanship Story
              </label>
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20">
                <div ref={quillRef} style={{ height: 350 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Meta & Media Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pricing */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
              <DollarSign size={16} className="text-[#D4AF37]" /> Pricing & Valuation
            </label>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#626060]">
                  Standard Price ($)
                </span>
                <input
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37] mt-1"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#626060]">
                  Exclusive / Sale Price ($)
                </span>
                <input
                  name="discountPrice"
                  placeholder="0.00"
                  value={form.discountPrice}
                  onChange={handleChange}
                  className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37] mt-1 text-[#D4AF37] font-bold"
                />
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
              <Tag size={16} className="text-[#D4AF37]" /> Classification
            </label>
            <div className="space-y-3">
              <input
                name="category"
                placeholder="Category (e.g. Travel, Bags, Accessories)"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37]"
              />
              <input
                name="tags"
                placeholder="Tags (comma separated, e.g. Full-grain, Handmade)"
                value={form.tags}
                onChange={handleChange}
                className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Main Showcase Image */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
              Main Showcase Image
            </span>
            <div
              onClick={() => mainRef.current?.click()}
              className="relative border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl aspect-video flex items-center justify-center cursor-pointer overflow-hidden bg-[#F9F6F0] transition-colors group"
            >
              {mainPreview ? (
                <Image
                  src={mainPreview}
                  alt="Main artifact preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#626060]">
                  <UploadCloud size={28} className="text-[#D4AF37]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Upload Artifact Photo
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              hidden
              ref={mainRef}
              accept="image/*"
              onChange={handleMainImage}
            />
          </div>

          {/* Gallery Showcase */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-3">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-2">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <Layers size={16} className="text-[#D4AF37]" /> Gallery Photos
              </span>
              <button
                type="button"
                onClick={() => galleryRef.current?.click()}
                className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
              >
                + Add More
              </button>
            </div>
            <input
              type="file"
              multiple
              hidden
              ref={galleryRef}
              accept="image/*"
              onChange={handleGallery}
            />

            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Existing Gallery Images */}
              {existingGallery.map((img, i) => (
                <div
                  key={`old-${i}`}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#F9F6F0]"
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover"
                    alt={`Existing Gallery ${i}`}
                  />
                </div>
              ))}
              {/* Newly Uploaded Gallery Images */}
              {newGallery.map((img, i) => (
                <div
                  key={`new-${i}`}
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-[#F9F6F0]"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                    alt={`New Upload ${i}`}
                  />
                  <span className="absolute top-1 right-1 bg-[#D4AF37] text-[#111111] text-[8px] font-bold px-1 rounded">
                    NEW
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-3">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
              <Settings size={16} className="text-[#D4AF37]" /> SEO Metadata
            </span>
            <input
              name="metaTitle"
              placeholder="SEO Meta Title"
              value={form.metaTitle}
              onChange={handleChange}
              className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37]"
            />
            <textarea
              name="metaDescription"
              placeholder="SEO Meta Description..."
              value={form.metaDescription}
              onChange={handleChange}
              className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37]"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}