"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ mainImage, gallery, title, hasDiscount, discountPrice, price }) {
  // 🎯 الـ State اللي كاتحكم ف الصورة الكبيرة المعروضة دابا
  const [activeImage, setActiveImage] = useState(mainImage?.url || "/fallback.jpg");

  return (
    <div className="lg:col-span-6 space-y-4">
      {/* الصورة الكبيرة الرئيسية */}
      <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-[#F2EDE4]/40 border border-[#D9C3B0]/30 shadow-xs group">
        <Image
          src={activeImage}
          alt={`ClayOria Fine Ceramic Masterpiece - ${title}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out animate-in fade-in"
        />
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-[#C87A53] text-white px-3 py-1 rounded-xl text-[9px] font-bold tracking-wider uppercase shadow-md">
            Allocation -{Math.round(((price - discountPrice) / price) * 100)}%
          </div>
        )}
      </div>

      {/* الصور المصغرة التحتانية التفاعلية */}
      <div className="flex flex-wrap gap-3">
        {/* نزيدو حتى الصورة الأساسية الأولى ف القائمة باش يرجع ليها إلا بغا */}
        {[mainImage, ...(gallery || [])].filter(Boolean).map((img, i) => {
          const isSelected = activeImage === img.url;
          return (
            <button
              key={i}
              onClick={() => setActiveImage(img.url)}
              className={`w-16 h-16 rounded-xl border bg-white overflow-hidden transition-all duration-300 shrink-0 relative ${
                isSelected 
                  ? "border-[#C87A53] ring-2 ring-[#C87A53]/20 scale-95" 
                  : "border-[#D9C3B0]/30 hover:border-[#C87A53]"
              }`}
              aria-label={`View perspective ${i + 1}`}
            >
              <Image
                src={img.url || "/fallback.jpg"}
                alt={`Perspective view ${i + 1}`}
                fill
                className="object-cover h-full w-full"
                sizes="64px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}