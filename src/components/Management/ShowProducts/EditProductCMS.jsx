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
//   ArrowLeft,
//   Sparkles,
//   Loader2,
//   Tag,
//   FileText,
// } from "lucide-react";
// import "quill/dist/quill.snow.css";
// import { updateProductAPI, getProductByIdAPI } from "@/services/user.service";

// /* ================= Utils ================= */
// const slugify = (str = "") =>
//   str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// export default function EditProductCMS({ productId, onBack }) {
//   const [description, setDescription] = useState("");
//   const [mainImage, setMainImage] = useState(null);
//   const [mainPreview, setMainPreview] = useState(null);
//   const [existingGallery, setExistingGallery] = useState([]);
//   const [newGallery, setNewGallery] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false);

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

//   const [isLoading, setIsLoading] = useState(true);

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

//   /* ================= Fetch Existing Data ================= */
//   useEffect(() => {
//     if (!productId) return;

//     const fetchProductData = async () => {
//       try {
//         // Was: fetch(`http://localhost:5000/api/product/${productId}`)
//         // That hit the PUBLIC route, which looks up by slug (not id) and
//         // filters accepted: true — so a pending or draft product being
//         // edited would silently fail to load. This uses the admin-only
//         // by-id route instead, and sends the auth token.
//         const response = await getProductByIdAPI(productId);
//         const data = response.data;

//         setForm({
//           title: data.title || "",
//           slug: data.slug || "",
//           price: data.price || "",
//           discountPrice: data.discountPrice || "",
//           category: data.category || "",
//           tags: data.tags ? data.tags.join(", ") : "",
//           shortDescription: data.shortDescription || "",
//           metaTitle: data.metaTitle || "",
//           metaDescription: data.metaDescription || "",
//         });

//         if (data.mainImage?.url) {
//           setMainPreview(data.mainImage.url);
//         }

//         if (data.gallery && data.gallery.length > 0) {
//           setExistingGallery(data.gallery);
//         }

//         if (data.description) {
//           setDescription(data.description);
//           if (quill) {
//             quill.clipboard.dangerouslyPasteHTML(data.description);
//           }
//         }

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         toast.error("Failed to load product details");
//         setIsLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [productId, quill]);

//   /* Handle Quill Text Changes */
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
//     setNewGallery((p) => [...p, ...files]);
//   };

//   const handleUpdate = async () => {
//     setIsUpdating(true);
//     try {
//       await updateProductAPI(productId, {
//         ...form,
//         tags: form.tags.split(",").map((tag) => tag.trim()),
//         description,
//         mainImage,
//         newGallery,
//       });
//       toast.success("Product updated successfully.");
//       if (onBack) onBack();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update product");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   /* ================= UI ================= */
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center space-y-3 antialiased text-[#1A1A1A]">
//         <Loader2 className="animate-spin text-[#C9A24B]" size={36} />
//         <p className="text-xs font-bold uppercase tracking-widest text-[#626060]">
//           Loading product...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 text-[#1A1A1A] antialiased">
//       {/* Top Action Header */}
//       <header className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex items-center gap-3">
//           {onBack && (
//             <button
//               onClick={onBack}
//               className="p-2 rounded-xl bg-[#F9F6F0] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F6F0] transition-colors border border-[#C9A24B]/30 cursor-pointer"
//               aria-label="Back to collection"
//             >
//               <ArrowLeft size={18} />
//             </button>
//           )}
//           <div>
//             <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
//               Product Editor
//             </span>
//             <h1 className="text-xl font-serif font-light text-[#1A1A1A] flex items-center gap-2">
//               <Package size={20} className="text-[#C9A24B]" /> Edit Product
//             </h1>
//           </div>
//         </div>

//         <motion.button
//           onClick={handleUpdate}
//           disabled={isUpdating}
//           whileTap={{ scale: 0.97 }}
//           className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest rounded-xl border border-[#C9A24B]/40 hover:bg-[#C9A24B] hover:text-[#1A1A1A] hover:border-[#C9A24B] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
//         >
//           {isUpdating ? (
//             <Loader2 size={16} className="animate-spin text-[#C9A24B]" />
//           ) : (
//             <Sparkles size={16} className="text-[#C9A24B]" />
//           )}
//           <span>{isUpdating ? "Saving Changes..." : "Update Product"}</span>
//         </motion.button>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Left Column - Primary Details */}
//         <div className="lg:col-span-8 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-6">
//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
//                 Product Title
//               </label>
//               <input
//                 name="title"
//                 placeholder="e.g. Black Leather Tote"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="text-2xl font-serif font-light w-full outline-none border-b border-[#C9A24B]/30 focus:border-[#C9A24B] pb-2 text-[#1A1A1A] placeholder:text-gray-300 transition-colors"
//               />
//             </div>

//             {/* Permalink Slug */}
//             <div className="flex items-center gap-2 p-3 bg-[#F9F6F0] rounded-xl border border-[#C9A24B]/20 text-xs">
//               <span className="text-[#626060] font-mono text-[11px]">
//                 zackluxury.com/product/
//               </span>
//               <input
//                 name="slug"
//                 value={form.slug}
//                 onChange={handleChange}
//                 className="text-[#1A1A1A] font-mono text-[11px] bg-transparent flex-1 outline-none font-semibold"
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   setForm((p) => ({
//                     ...p,
//                     slug: slugify(p.title),
//                   }))
//                 }
//                 className="text-[10px] uppercase tracking-wider font-bold border border-[#C9A24B]/40 px-3 py-1 rounded-lg bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F6F0] transition-colors cursor-pointer"
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
//                 placeholder="Brief summary shown under the price..."
//                 value={form.shortDescription}
//                 onChange={handleChange}
//                 className="w-full border border-[#C9A24B]/20 rounded-xl p-3 text-xs outline-none focus:border-[#C9A24B] text-[#1A1A1A] leading-relaxed transition-colors"
//                 rows={3}
//               />
//             </div>

//             {/* Rich Editor */}
//             <div>
//               <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
//                 <FileText size={14} className="text-[#C9A24B]" /> Full Description
//               </label>
//               <div className="rounded-xl overflow-hidden border border-[#C9A24B]/20">
//                 <div ref={quillRef} style={{ height: 350 }} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Meta & Media Settings */}
//         <div className="lg:col-span-4 space-y-6">
//           {/* Pricing */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-4">
//             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#C9A24B]/20">
//               <DollarSign size={16} className="text-[#C9A24B]" /> Pricing
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
//                   className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B] mt-1"
//                 />
//               </div>
//               <div>
//                 <span className="text-[10px] font-bold uppercase tracking-wider text-[#626060]">
//                   Sale Price ($)
//                 </span>
//                 <input
//                   name="discountPrice"
//                   placeholder="0.00"
//                   value={form.discountPrice}
//                   onChange={handleChange}
//                   className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B] mt-1 text-[#C9A24B] font-bold"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Categorization */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-4">
//             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#C9A24B]/20">
//               <Tag size={16} className="text-[#C9A24B]" /> Classification
//             </label>
//             <div className="space-y-3">
//               <input
//                 name="category"
//                 placeholder="Category (e.g. Handbags, Totes, Accessories)"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="w-full border border-[#C9A24B]/20 rounded-xl p-3 text-xs outline-none focus:border-[#C9A24B]"
//               />
//               <input
//                 name="tags"
//                 placeholder="Tags (comma separated)"
//                 value={form.tags}
//                 onChange={handleChange}
//                 className="w-full border border-[#C9A24B]/20 rounded-xl p-3 text-xs outline-none focus:border-[#C9A24B]"
//               />
//             </div>
//           </div>

//           {/* Main Showcase Image */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-3">
//             <span className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
//               Main Image
//             </span>
//             <div
//               onClick={() => mainRef.current?.click()}
//               className="relative border-2 border-dashed border-[#C9A24B]/30 hover:border-[#C9A24B] rounded-2xl aspect-video flex items-center justify-center cursor-pointer overflow-hidden bg-[#F9F6F0] transition-colors group"
//             >
//               {mainPreview ? (
//                 <Image
//                   src={mainPreview}
//                   alt="Main product preview"
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   unoptimized
//                 />
//               ) : (
//                 <div className="flex flex-col items-center gap-2 text-[#626060]">
//                   <UploadCloud size={28} className="text-[#C9A24B]" />
//                   <span className="text-[10px] uppercase font-bold tracking-wider">
//                     Upload Product Photo
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
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-3">
//             <div className="flex justify-between items-center border-b border-[#C9A24B]/20 pb-2">
//               <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
//                 <Layers size={16} className="text-[#C9A24B]" /> Gallery Photos
//               </span>
//               <button
//                 type="button"
//                 onClick={() => galleryRef.current?.click()}
//                 className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] hover:underline cursor-pointer"
//               >
//                 + Add More
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
//               {/* Existing Gallery Images */}
//               {existingGallery.map((img, i) => (
//                 <div
//                   key={`old-${i}`}
//                   className="relative aspect-square rounded-xl overflow-hidden border border-[#C9A24B]/30 bg-[#F9F6F0]"
//                 >
//                   <img
//                     src={img.url}
//                     className="w-full h-full object-cover"
//                     alt={`Existing Gallery ${i}`}
//                   />
//                 </div>
//               ))}
//               {/* Newly Uploaded Gallery Images */}
//               {newGallery.map((img, i) => (
//                 <div
//                   key={`new-${i}`}
//                   className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#C9A24B] bg-[#F9F6F0]"
//                 >
//                   <img
//                     src={URL.createObjectURL(img)}
//                     className="w-full h-full object-cover"
//                     alt={`New Upload ${i}`}
//                   />
//                   <span className="absolute top-1 right-1 bg-[#C9A24B] text-[#1A1A1A] text-[8px] font-bold px-1 rounded">
//                     NEW
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SEO Metadata */}
//           <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-3">
//             <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#C9A24B]/20">
//               <Settings size={16} className="text-[#C9A24B]" /> SEO Metadata
//             </span>
//             <input
//               name="metaTitle"
//               placeholder="SEO Meta Title"
//               value={form.metaTitle}
//               onChange={handleChange}
//               className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B]"
//             />
//             <textarea
//               name="metaDescription"
//               placeholder="SEO Meta Description..."
//               value={form.metaDescription}
//               onChange={handleChange}
//               className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B]"
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
  ArrowLeft,
  Sparkles,
  Loader2,
  Tag,
  FileText,
  Palette,
  X,
} from "lucide-react";
import "quill/dist/quill.snow.css";
import { updateProductAPI, getProductByIdAPI } from "@/services/user.service";

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

export default function EditProductCMS({ productId, onBack }) {
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);
  const [variants, setVariants] = useState([]);
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
        // Was: fetch(`http://localhost:5000/api/product/${productId}`)
        // That hit the PUBLIC route, which looks up by slug (not id) and
        // filters accepted: true — so a pending or draft product being
        // edited would silently fail to load. This uses the admin-only
        // by-id route instead, and sends the auth token.
        const response = await getProductByIdAPI(productId);
        const data = response.data;

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

        if (data.variants && data.variants.length > 0) {
          setVariants(
            data.variants.map((v) => ({
              color: v.color || "",
              size: v.size || "",
              stock: v.stock ?? "",
              available: v.available !== false,
            }))
          );
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

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateProductAPI(productId, {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        description,
        mainImage,
        newGallery,
        variants: variants.map((v) => ({
          color: v.color,
          size: v.size,
          stock: Number(v.stock) || 0,
          available: v.available !== false,
        })),
      });
      toast.success("Product updated successfully.");
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
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center space-y-3 antialiased text-[#1A1A1A]">
        <Loader2 className="animate-spin text-[#C9A24B]" size={36} />
        <p className="text-xs font-bold uppercase tracking-widest text-[#626060]">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 text-[#1A1A1A] antialiased">
      {/* Top Action Header */}
      <header className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-[#F9F6F0] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F6F0] transition-colors border border-[#C9A24B]/30 cursor-pointer"
              aria-label="Back to collection"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
              Product Editor
            </span>
            <h1 className="text-xl font-serif font-light text-[#1A1A1A] flex items-center gap-2">
              <Package size={20} className="text-[#C9A24B]" /> Edit Product
            </h1>
          </div>
        </div>

        <motion.button
          onClick={handleUpdate}
          disabled={isUpdating}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest rounded-xl border border-[#C9A24B]/40 hover:bg-[#C9A24B] hover:text-[#1A1A1A] hover:border-[#C9A24B] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isUpdating ? (
            <Loader2 size={16} className="animate-spin text-[#C9A24B]" />
          ) : (
            <Sparkles size={16} className="text-[#C9A24B]" />
          )}
          <span>{isUpdating ? "Saving Changes..." : "Update Product"}</span>
        </motion.button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Primary Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
                Product Title
              </label>
              <input
                name="title"
                placeholder="e.g. Black Leather Tote"
                value={form.title}
                onChange={handleChange}
                className="text-2xl font-serif font-light w-full outline-none border-b border-[#C9A24B]/30 focus:border-[#C9A24B] pb-2 text-[#1A1A1A] placeholder:text-gray-300 transition-colors"
              />
            </div>

            {/* Permalink Slug */}
            <div className="flex items-center gap-2 p-3 bg-[#F9F6F0] rounded-xl border border-[#C9A24B]/20 text-xs">
              <span className="text-[#626060] font-mono text-[11px]">
                zackluxury.com/product/
              </span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="text-[#1A1A1A] font-mono text-[11px] bg-transparent flex-1 outline-none font-semibold"
              />
              <button
                type="button"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    slug: slugify(p.title),
                  }))
                }
                className="text-[10px] uppercase tracking-wider font-bold border border-[#C9A24B]/40 px-3 py-1 rounded-lg bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F6F0] transition-colors cursor-pointer"
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
                placeholder="Brief summary shown under the price..."
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full border border-[#C9A24B]/20 rounded-xl p-3 text-xs outline-none focus:border-[#C9A24B] text-[#1A1A1A] leading-relaxed transition-colors"
                rows={3}
              />
            </div>

            {/* Rich Editor */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#626060] mb-2">
                <FileText size={14} className="text-[#C9A24B]" /> Full Description
              </label>
              <div className="rounded-xl overflow-hidden border border-[#C9A24B]/20">
                <div ref={quillRef} style={{ height: 350 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Colors & Sizes (Variants) */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-4">
            <div className="flex justify-between items-center border-b border-[#C9A24B]/20 pb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                <Palette size={16} className="text-[#C9A24B]" /> Colors & Sizes
              </span>
              <button
                type="button"
                onClick={addVariant}
                className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] hover:underline cursor-pointer"
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
                      className="w-full border border-[#C9A24B]/20 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-[#C9A24B] text-[#1A1A1A] bg-white"
                    />
                    <select
                      value={v.size}
                      onChange={(e) => updateVariant(i, "size", e.target.value)}
                      className="w-full border border-[#C9A24B]/20 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-[#C9A24B] text-[#1A1A1A] bg-white"
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
                      className="w-full border border-[#C9A24B]/20 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-[#C9A24B] text-[#1A1A1A] bg-white"
                    />
                    <label
                      className="flex items-center justify-center cursor-pointer"
                      title={v.available === false ? "Marked sold out / limited" : "Available"}
                    >
                      <input
                        type="checkbox"
                        checked={v.available !== false}
                        onChange={(e) => updateVariant(i, "available", e.target.checked)}
                        className="w-4 h-4 accent-[#C9A24B] cursor-pointer"
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
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#C9A24B]/20">
              <DollarSign size={16} className="text-[#C9A24B]" /> Pricing
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
                  className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B] mt-1"
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
                  className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B] mt-1 text-[#C9A24B] font-bold"
                />
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#C9A24B]/20">
              <Tag size={16} className="text-[#C9A24B]" /> Classification
            </label>
            <div className="space-y-3">
              <input
                name="category"
                placeholder="Category (e.g. Handbags, Totes, Accessories)"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-[#C9A24B]/20 rounded-xl p-3 text-xs outline-none focus:border-[#C9A24B]"
              />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={handleChange}
                className="w-full border border-[#C9A24B]/20 rounded-xl p-3 text-xs outline-none focus:border-[#C9A24B]"
              />
            </div>
          </div>

          {/* Main Showcase Image */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              Main Image
            </span>
            <div
              onClick={() => mainRef.current?.click()}
              className="relative border-2 border-dashed border-[#C9A24B]/30 hover:border-[#C9A24B] rounded-2xl aspect-video flex items-center justify-center cursor-pointer overflow-hidden bg-[#F9F6F0] transition-colors group"
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
                  <UploadCloud size={28} className="text-[#C9A24B]" />
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
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-3">
            <div className="flex justify-between items-center border-b border-[#C9A24B]/20 pb-2">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                <Layers size={16} className="text-[#C9A24B]" /> Gallery Photos
              </span>
              <button
                type="button"
                onClick={() => galleryRef.current?.click()}
                className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] hover:underline cursor-pointer"
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
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#C9A24B]/30 bg-[#F9F6F0]"
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
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#C9A24B] bg-[#F9F6F0]"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                    alt={`New Upload ${i}`}
                  />
                  <span className="absolute top-1 right-1 bg-[#C9A24B] text-[#1A1A1A] text-[8px] font-bold px-1 rounded">
                    NEW
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#C9A24B]/20 space-y-3">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#C9A24B]/20">
              <Settings size={16} className="text-[#C9A24B]" /> SEO Metadata
            </span>
            <input
              name="metaTitle"
              placeholder="SEO Meta Title"
              value={form.metaTitle}
              onChange={handleChange}
              className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B]"
            />
            <textarea
              name="metaDescription"
              placeholder="SEO Meta Description..."
              value={form.metaDescription}
              onChange={handleChange}
              className="w-full border border-[#C9A24B]/20 p-2.5 rounded-xl text-xs outline-none focus:border-[#C9A24B]"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}