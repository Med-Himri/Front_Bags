// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useQuill } from "react-quilljs";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import Image from "next/image";
// import {
//   UploadCloud,
//   Settings,
//   Package,
//   DollarSign,
//   Layers,
//   Tag,
//   FileText,
//   Sparkles,
//   Loader2,
// } from "lucide-react";
// import "quill/dist/quill.snow.css";
// import { createProductAPI } from "@/services/user.service";

// /* ================= Utils ================= */
// const slugify = (str = "") =>
//   str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// export default function AddProductCMS() {
//   const [description, setDescription] = useState("");
//   const [mainImage, setMainImage] = useState(null);
//   const [mainPreview, setMainPreview] = useState(null);
//   const [gallery, setGallery] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const mainRef = useRef(null);
//   const galleryRef = useRef(null);

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     price: "",
//     discountPrice: "",
//     category: "",
//     tags: "",
//     shortDescription: "",
//     metaTitle: "",
//     metaDescription: "",
//   });

//   /* ================= Editor ================= */
//   const modules = useMemo(
//     () => ({
//       toolbar: [
//         [{ header: [2, 3, false] }],
//         ["bold", "italic", "underline"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image"],
//         ["clean"],
//       ],
//     }),
//     []
//   );

//   const { quill, quillRef } = useQuill({ theme: "snow", modules });

//   useEffect(() => {
//     if (!quill) return;
//     quill.on("text-change", () => {
//       setDescription(quill.root.innerHTML);
//     });
//   }, [quill]);

//   /* ================= Handlers ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const handleMainImage = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setMainImage(file);
//     setMainPreview(URL.createObjectURL(file));
//   };

//   const handleGallery = (e) => {
//     const files = Array.from(e.target.files || []);
//     setGallery((p) => [...p, ...files]);
//   };

//   const handleSubmit = async () => {
//     if (!form.title) {
//       toast.error("Please provide an artifact title");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await createProductAPI({
//         ...form,
//         tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
//         description,
//         mainImage,
//         gallery,
//       });
//       toast.success("Craft artifact published successfully.");
      
//       // Optional: Reset Form State
//       setForm({
//         title: "",
//         slug: "",
//         price: "",
//         discountPrice: "",
//         category: "",
//         tags: "",
//         shortDescription: "",
//         metaTitle: "",
//         metaDescription: "",
//       });
//       setMainImage(null);
//       setMainPreview(null);
//       setGallery([]);
//       setDescription("");
//       if (quill) quill.setText("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to publish artifact");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 text-[#111111] antialiased">
//       {/* Top Header */}
//       <header className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
//             Atelier Creation
//           </span>
//           <h1 className="text-xl font-serif font-light text-[#111111] flex items-center gap-2">
//             <Package size={20} className="text-[#D4AF37]" /> Create Leather Artifact
//           </h1>
//         </div>

//         <motion.button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           whileTap={{ scale: 0.97 }}
//           className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest rounded-xl border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
//         >
//           {isSubmitting ? (
//             <Loader2 size={16} className="animate-spin text-[#D4AF37]" />
//           ) : (
//             <Sparkles size={16} className="text-[#D4AF37]" />
//           )}
//           <span>{isSubmitting ? "Publishing..." : "Publish Artifact"}</span>
//         </motion.button>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Left Column - Primary Details */}
//         <div className="lg:col-span-8 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-6">
//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
//                 Artifact Title
//               </label>
//               <input
//                 name="title"
//                 placeholder="e.g. Master Artisan Leather Briefcase"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="text-2xl font-serif font-light w-full outline-none border-b border-[#D4AF37]/30 focus:border-[#D4AF37] pb-2 text-[#111111] placeholder:text-gray-300 transition-colors"
//               />
//             </div>

//             {/* Permalink Slug */}
//             <div className="flex items-center gap-2 p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/20 text-xs">
//               <span className="text-[#626060] font-mono text-[11px]">
//                 zackluxury.com/product/
//               </span>
//               <input
//                 name="slug"
//                 placeholder="artifact-slug"
//                 value={form.slug}
//                 onChange={handleChange}
//                 className="text-[#111111] font-mono text-[11px] bg-transparent flex-1 outline-none font-semibold"
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   setForm((p) => ({
//                     ...p,
//                     slug: slugify(p.title),
//                   }))
//                 }
//                 className="text-[10px] uppercase tracking-wider font-bold border border-[#D4AF37]/40 px-3 py-1 rounded-lg bg-white text-[#111111] hover:bg-[#111111] hover:text-[#F9F6F0] transition-colors cursor-pointer"
//               >
//                 Auto-Generate
//               </button>
//             </div>

//             {/* Short Description */}
//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
//                 Short Summary
//               </label>
//               <textarea
//                 name="shortDescription"
//                 placeholder="Brief description of full-grain leather composition and artisan origin..."
//                 value={form.shortDescription}
//                 onChange={handleChange}
//                 className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37] text-[#111111] leading-relaxed transition-colors"
//                 rows={3}
//               />
//             </div>

//             {/* Rich Editor */}
//             <div>
//               <label className="text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2 flex items-center gap-1.5">
//                 <FileText size={14} className="text-[#D4AF37]" /> Full Craftsmanship Story
//               </label>
//               <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20">
//                 <div ref={quillRef} style={{ height: 350 }} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Meta & Media Settings */}
//         <div className="lg:col-span-4 space-y-6">
//           {/* Pricing */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-4">
//             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
//               <DollarSign size={16} className="text-[#D4AF37]" /> Pricing & Valuation
//             </label>
//             <div className="space-y-3">
//               <div>
//                 <span className="text-[10px] font-bold uppercase tracking-wider text-[#626060]">
//                   Standard Price ($)
//                 </span>
//                 <input
//                   name="price"
//                   placeholder="0.00"
//                   value={form.price}
//                   onChange={handleChange}
//                   className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37] mt-1"
//                 />
//               </div>
//               <div>
//                 <span className="text-[10px] font-bold uppercase tracking-wider text-[#626060]">
//                   Exclusive / Sale Price ($)
//                 </span>
//                 <input
//                   name="discountPrice"
//                   placeholder="0.00"
//                   value={form.discountPrice}
//                   onChange={handleChange}
//                   className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37] mt-1 text-[#D4AF37] font-bold"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Categorization */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-4">
//             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
//               <Tag size={16} className="text-[#D4AF37]" /> Classification
//             </label>
//             <div className="space-y-3">
//               <input
//                 name="category"
//                 placeholder="Category (e.g. Travel, Wallets, Bags)"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37]"
//               />
//               <input
//                 name="tags"
//                 placeholder="Tags (comma separated, e.g. Full-grain, Handmade)"
//                 value={form.tags}
//                 onChange={handleChange}
//                 className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37]"
//               />
//             </div>
//           </div>

//           {/* Main Showcase Image */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-3">
//             <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
//               Main Showcase Image
//             </span>
//             <div
//               onClick={() => mainRef.current?.click()}
//               className="relative border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl aspect-video flex items-center justify-center cursor-pointer overflow-hidden bg-[#F9F6F0] transition-colors group"
//             >
//               {mainPreview ? (
//                 <Image
//                   src={mainPreview}
//                   alt="Main artifact preview"
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   unoptimized
//                 />
//               ) : (
//                 <div className="flex flex-col items-center gap-2 text-[#626060]">
//                   <UploadCloud size={28} className="text-[#D4AF37]" />
//                   <span className="text-[10px] uppercase font-bold tracking-wider">
//                     Upload Artifact Photo
//                   </span>
//                 </div>
//               )}
//             </div>
//             <input
//               type="file"
//               hidden
//               ref={mainRef}
//               accept="image/*"
//               onChange={handleMainImage}
//             />
//           </div>

//           {/* Gallery Showcase */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-3">
//             <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-2">
//               <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
//                 <Layers size={16} className="text-[#D4AF37]" /> Gallery Photos
//               </span>
//               <button
//                 type="button"
//                 onClick={() => galleryRef.current?.click()}
//                 className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
//               >
//                 + Add Photos
//               </button>
//             </div>
//             <input
//               type="file"
//               multiple
//               hidden
//               ref={galleryRef}
//               accept="image/*"
//               onChange={handleGallery}
//             />

//             <div className="grid grid-cols-3 gap-2 pt-1">
//               {gallery.map((img, i) => (
//                 <div
//                   key={i}
//                   className="relative aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#F9F6F0]"
//                 >
//                   <img
//                     src={URL.createObjectURL(img)}
//                     className="w-full h-full object-cover"
//                     alt={`Gallery preview ${i}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SEO Metadata */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-3">
//             <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
//               <Settings size={16} className="text-[#D4AF37]" /> SEO Metadata
//             </span>
//             <input
//               name="metaTitle"
//               placeholder="SEO Meta Title"
//               value={form.metaTitle}
//               onChange={handleChange}
//               className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37]"
//             />
//             <textarea
//               name="metaDescription"
//               placeholder="SEO Meta Description..."
//               value={form.metaDescription}
//               onChange={handleChange}
//               className="w-full border border-[#D4AF37]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37]"
//               rows={3}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  Tag,
  FileText,
  Sparkles,
  Loader2,
  Palette,
  X,
} from "lucide-react";
import "quill/dist/quill.snow.css";
import { createProductAPI } from "@/services/user.service";

/* ================= Constants ================= */
const EU_SHOE_SIZES = ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43"];

/* ================= Utils ================= */
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddProductCMS() {
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setGallery((p) => [...p, ...files]);
  };

  /* ================= Variants (Colors & Sizes) ================= */
  const addVariant = () => {
    setVariants((prev) => [...prev, { color: "", size: "", stock: "", available: true }]);
  };

  const updateVariant = (index, field, value) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title) {
      toast.error("Please provide a product title");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProductAPI({
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        description,
        mainImage,
        gallery,
        variants: variants.map((v) => ({
          color: v.color,
          size: v.size,
          stock: Number(v.stock) || 0,
          available: v.available !== false,
        })),
      });
      toast.success("Product published successfully.");

      // Reset Form State
      setForm({
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
      setMainImage(null);
      setMainPreview(null);
      setGallery([]);
      setVariants([]);
      setDescription("");
      if (quill) quill.setText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const smallInput =
    "w-full border border-[#D4AF37]/20 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-[#D4AF37] text-[#111111] bg-white";

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 text-[#111111] antialiased">
      {/* Top Header */}
      <header className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Product Creation
          </span>
          <h1 className="text-xl font-serif font-light text-[#111111] flex items-center gap-2">
            <Package size={20} className="text-[#D4AF37]" /> Create Product
          </h1>
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest rounded-xl border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin text-[#D4AF37]" />
          ) : (
            <Sparkles size={16} className="text-[#D4AF37]" />
          )}
          <span>{isSubmitting ? "Publishing..." : "Publish Product"}</span>
        </motion.button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Primary Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
                Product Title
              </label>
              <input
                name="title"
                placeholder="e.g. Pointed-Toe Leather Stiletto Pumps"
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
                placeholder="product-slug"
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
                placeholder="Brief description shown under the price..."
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37] text-[#111111] leading-relaxed transition-colors"
                rows={3}
              />
            </div>

            {/* Rich Editor */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2 flex items-center gap-1.5">
                <FileText size={14} className="text-[#D4AF37]" /> Full Description
              </label>
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20">
                <div ref={quillRef} style={{ height: 350 }} />
              </div>
            </div>
          </div>

          {/* Colors & Sizes (Variants) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-4">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <Palette size={16} className="text-[#D4AF37]" /> Colors & Sizes
              </span>
              <button
                type="button"
                onClick={addVariant}
                className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
              >
                + Add Variant
              </button>
            </div>

            {variants.length === 0 ? (
              <p className="text-[11px] text-[#626060]">
                No variants added yet. Optional — for handbags you might only fill in Color, for shoes only Size. Leave any field blank as needed.
                Add variants here for different colors/sizes (e.g. shoe sizes),
                each with its own stock count.
              </p>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_1fr_90px_80px_32px] gap-2 px-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#626060]">Color</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#626060]">Size (EU)</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#626060]">Stock</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#626060]">Avail.</span>
                  <span />
                </div>
                {variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_90px_80px_32px] gap-2 items-center">
                    <input
                      placeholder="e.g. Black"
                      value={v.color}
                      onChange={(e) => updateVariant(i, "color", e.target.value)}
                      className={smallInput}
                    />
                    <select
                      value={v.size}
                      onChange={(e) => updateVariant(i, "size", e.target.value)}
                      className={smallInput}
                    >
                      <option value="">Size (EU)</option>
                      {EU_SHOE_SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      value={v.stock}
                      onChange={(e) => updateVariant(i, "stock", e.target.value)}
                      className={smallInput}
                    />
                    <label
                      className="flex items-center justify-center cursor-pointer"
                      title={v.available === false ? "Marked sold out / limited" : "Available"}
                    >
                      <input
                        type="checkbox"
                        checked={v.available !== false}
                        onChange={(e) => updateVariant(i, "available", e.target.checked)}
                        className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center"
                      aria-label="Remove variant"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Meta & Media Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pricing */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#D4AF37]/20 space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#D4AF37]/20">
              <DollarSign size={16} className="text-[#D4AF37]" /> Pricing
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
                  Sale Price ($)
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
                placeholder="Category (e.g. Handbags, Heels, Wallets)"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-[#D4AF37]/20 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37]"
              />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
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
                  alt="Main product preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#626060]">
                  <UploadCloud size={28} className="text-[#D4AF37]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Upload Product Photo
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
                + Add Photos
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
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#F9F6F0]"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                    alt={`Gallery preview ${i}`}
                  />
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