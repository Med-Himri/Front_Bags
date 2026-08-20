"use client";

import { useState, useMemo } from "react";
import { CheckCircle } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";

export function ProductPurchaseBox({ product }) {
  const variants = product.variants || [];
  const hasVariants = variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? null : undefined
  );

  // Overall availability: if this product has variants, it's "in stock"
  // as long as at least one variant is available; otherwise fall back to
  // the simple stock flag on the product itself.
  const isOverallAvailable = hasVariants
    ? variants.some((v) => v.available !== false && v.stock > 0)
    : product.stock === "in_stock"; 

  const needsSelection = hasVariants && !selectedVariant;

  return (
    <div className="space-y-4">
      <div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium border ${
            isOverallAvailable
              ? "bg-white border-[#2C3E35]/20 text-[#2C3E35]"
              : "bg-red-50/50 border-red-200 text-red-700"
          }`}
        >
          <CheckCircle
            size={13}
            className={isOverallAvailable ? "text-[#C87A53]" : "text-red-500"}
          />
          <span className="text-[11px] font-medium">
            {isOverallAvailable ? "Queue Active — Ready to Crate" : "Allocation Full"}
          </span>
        </div>
      </div>

      {hasVariants && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D2522]/50">
            Select Option
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const available = variant.available !== false && variant.stock > 0;
              const label = [variant.color, variant.size].filter(Boolean).join(" / ");
              const isSelected = selectedVariant?._id === variant._id;

              return (
                <button
                  key={variant._id}
                  type="button"
                  disabled={!available}
                  onClick={() => available && setSelectedVariant(variant)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                    available
                      ? isSelected
                        ? "border-[#C87A53] bg-[#C87A53]/10 text-[#2D2522] cursor-pointer"
                        : "border-[#D9C3B0]/50 text-[#2D2522] hover:border-[#C87A53] cursor-pointer"
                      : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                  }`}
                >
                  {label}
                  {!available && (
                    <>
                      <span
                        className="absolute inset-0 pointer-events-none rounded-lg"
                        style={{
                          background:
                            "linear-gradient(to top right, transparent 47%, currentColor 49%, currentColor 51%, transparent 53%)",
                        }}
                      />
                      <span className="ml-1 text-[9px] uppercase tracking-wide">
                        Sold out
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
          {needsSelection && (
            <p className="text-[10px] text-[#2D2522]/40">
              Please select an option before adding to cart.
            </p>
          )}
        </div>
      )}

      <div className="pt-2 max-w-md">
        <AddToCartButton
          product={product}
          selectedVariant={selectedVariant}
          disabled={needsSelection}
        />
      </div>
    </div>
  );
}