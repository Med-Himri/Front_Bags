"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function ProductShowcase() {
  const products = [
    {
      name: "Crimson Croc-Embossed Leather Tote with Silk Scarf",
      collection: "Signature Handbag Collection",
      image: "showImage1.webp",
      finish: "Crimson Croc-Embossed Leather",
      features: ["Croc-Embossed Leather", "Silk Scarf Handle Wrap", "Structured Silhouette"],
      price: "499.00 DH",
      unit: "piece",
    },
    {
      name: "Two-Tone Beige & Mocha Structured Satchel",
      collection: "Crown Heritage Collection",
      image: "showImage2.webp",
      finish: "Smooth Beige & Mocha Leather",
      features: [
        "Dual Top Handles",
        "Gold-Tone Hardware",
        "Detachable Shoulder Strap",
      ],
      price: "599.00 DH",
      unit: "piece",
    },
    {
      name: "Quilted Chevron Leather Chain Shoulder Bag",
      collection: "Maison Exclusives",
      image: "showImage3.webp",
      finish: "Charcoal Grey Matelassé Leather",
      features: [
        "Quilted Chevron Pattern",
        "Bronze Chain Strap",
        "Signature Front Logo",
      ],
      price: "599.00 DH",
      unit: "piece",
    },
  ];

  return (
    <section id="products" className="py-32 bg-[#F9F6F0]/95 text-[#111111] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* 1. SECTION HEADER */}
        <div className="max-w-2xl mb-28">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-1.5 rounded-full mb-4 border border-[#D4AF37]/20">
            <Sparkles size={13} className="text-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#111111] text-[10px] font-bold uppercase tracking-widest">
              Curated Showcase
            </span>
          </div>
          <h2 className="text-[#111111] text-5xl md:text-6xl font-serif font-light leading-tight">
            Exclusive <br />
            <span className="text-[#D4AF37] italic font-normal">
              Signature Pieces
            </span>
          </h2>
        </div>

        {/* 2. ALTERNATING GRID */}
        <div className="space-y-40">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? "" : "lg:flex-row-reverse"
                  }`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative h-[450px] md:h-[520px] w-full overflow-hidden bg-[#F5F0E6] transition-all duration-75 ease-out rounded-2xl border border-[#D4AF37]/20 shadow-lg shadow-[#111111]/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#111111]/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Absolute Badge */}
                  <div
                    className={`absolute -bottom-6 bg-[#111111] text-[#FAFAFA] border border-[#D4AF37]/30 px-5 py-3 rounded-xl shadow-xl z-10 transition-transform duration-500 group-hover:-translate-y-2 ${isEven ? "-right-4" : "-left-4"
                      }`}
                  >
                    <p className="text-[8px] uppercase tracking-wider text-[#D4AF37]">
                      Surface Finish
                    </p>
                    <p className="text-xs font-medium tracking-wide">
                      {product.finish}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6 lg:px-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    {product.collection}
                  </span>

                  <h3 className="text-[#111111] text-3xl md:text-4xl font-serif font-light leading-tight">
                    {product.name}
                  </h3>

                  {/* Feature Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.features.map((feature, i) => (
                      <span
                        key={i}
                        className="bg-[#FFFDF8] px-3.5 py-2 rounded-xl text-xs font-medium border border-[#D4AF37]/20 text-[#111111]/80 shadow-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#D4AF37]/20 max-w-sm">
                    <div>
                      <p className="text-[#111111]/50 text-[9px] font-bold uppercase tracking-wider">
                        Price
                      </p>
                      <p className="text-[#111111] text-2xl font-semibold mt-0.5">
                        {product.price}{" "}
                        <span className="text-xs font-normal text-[#111111]/60">
                          / {product.unit}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Arrow Link */}
                  <div className="pt-6">
                    <Link
                      href="/product"
                      className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] hover:text-[#111111] transition-colors group/link"
                    >
                      <span>Request Specs</span>
                      <div className="w-8 h-[1px] bg-[#D4AF37] group-hover/link:w-12 group-hover/link:bg-[#111111] transition-all duration-300" />
                      <ArrowRight
                        size={14}
                        className="group-hover/link:translate-x-1 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}