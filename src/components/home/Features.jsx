"use client";

import { Sparkles } from "lucide-react";

export function Features() {
  const features = [
    {
      num: "01",
      title: "Bespoke Leather Tanning",
      description: "Sourced from premier tanneries, ensuring unmatched grain purity, durability, and a signature supple patina over time.",
    },
    {
      num: "02",
      title: "Hand-Stitched Artistry",
      description: "Each creation is individually tailored with meticulous saddle-stitching by master leather artisans.",
    },
    {
      num: "03",
      title: "Metallic Gold Hardware",
      description: "Custom-molded gold accents and heavy-duty zippers treated with protective anti-tarnish coating.",
    },
    {
      num: "04",
      title: "Protective Maison Packaging",
      description: "Delivered in custom-fit velvet dust covers and rigid magnetic display boxes built for safe worldwide transit.",
    },
  ];

  const certifications = [
    "Handmade Quality",
    "Genuine Leather",
    "Anti-Tarnish Plating",
    "Maison Verified",
  ];

  return (
    <section className="py-32 bg-[#F9F6F0]/95 text-[#111111] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* 1. LEFT SIDE: Sticky Brand Info */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">
              <Sparkles size={13} className="text-[#D4AF37]" aria-hidden="true" />
              <span className="text-[#111111] text-[10px] font-bold uppercase tracking-widest">
                Maison Standards
              </span>
            </div>

            <h2 className="text-[#111111] text-4xl md:text-5xl font-serif font-light leading-[1.1]">
              The Pursuit of <br />
              <span className="text-[#D4AF37] italic font-normal">
                Pure Excellence.
              </span>
            </h2>

            <p className="text-[#111111]/70 text-base leading-relaxed font-medium max-w-sm">
              We fuse timeless leathercraft techniques with modern luxury design. Every item represents raw elegance, precision craftsmanship, and durable elegance.
            </p>

            {/* Micro Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#D4AF37]/20 pt-8">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold tracking-wide text-[#111111]/90">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. RIGHT SIDE: Clean Numerical Stream */}
          <div className="lg:w-7/12 w-full">
            <div className="divide-y divide-[#D4AF37]/20 border-t border-b border-[#D4AF37]/20">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative py-10 flex flex-col md:flex-row items-start gap-6 md:gap-12 transition-all duration-300 hover:pl-2"
                >
                  {/* Huge Minimal Gold-Toned Number */}
                  <span className="text-5xl md:text-6xl font-serif font-light text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors duration-500 leading-none select-none">
                    {feature.num}
                  </span>

                  <div className="space-y-2 max-w-xl">
                    <h3 className="text-[#111111] text-xl font-medium tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[#111111]/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. TRANSITION STRIP */}
        <div className="mt-36 pt-12 border-t border-[#D4AF37]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/40">
              Maison Categories:
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
              {[
                "Bespoke Leatherwear",
                "Scorpion Emblem Series",
                "Crown Heritage Collection",
                "Luxury Travel Goods",
              ].map((type) => (
                <span
                  key={type}
                  className="text-[#111111]/80 font-serif italic text-lg md:text-xl hover:text-[#D4AF37] transition-colors cursor-default"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}