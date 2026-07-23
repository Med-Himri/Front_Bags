"use client";

import { Download, ArrowRight, Check } from "lucide-react";
import Image from "next/image";

export function About() {
  const highlights = [
    { label: "Boutique Partners", value: "250+" },
    { label: "Master Artisans", value: "45+" },
    { label: "Heritage Leathercraft", value: "Est. 1950" },
    { label: "Global Showrooms", value: "18" },
  ];

  return (
    <section id="about" className="py-32 bg-[#F9F6F0] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* 1. LEFT - Visual Stage & Seal */}
          <div className="w-full lg:w-1/2 relative group min-h-[550px] flex items-center justify-center">
            <div className="absolute w-[320px] h-80 md:w-[450px] md:h-[450px] bg-[#EAE3D8]/50 rounded-full -z-10 opacity-70 blur-xs" />
            <div className="relative h-[660px] w-full md:w-[90%] overflow-hidden bg-[#EAE3D8] transition-all duration-75 ease-out rounded-[10rem_2rem_10rem_2rem] md:rounded-[15rem_4rem_15rem_4rem] shadow-xl shadow-[#111111]/5">
              <Image
                src="/ImageAbout.webp"
                alt="Handcrafted Luxury Leathercraft from Morocco"
                fill
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-multiply"
                aria-hidden="true"
              />
            </div>

            {/* Floating Quality Seal - Gold Toned */}
            <div className="absolute top-10 left-4 md:left-10 z-20 bg-white p-3.5 rounded-full shadow-2xl border border-[#D4AF37]/30 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#D4AF37]/40 flex flex-col items-center justify-center">
                <span className="text-[#D4AF37] text-[10px] font-serif italic">
                  Crafted
                </span>
                <span className="text-[#F9F6F0] font-bold text-sm leading-none mt-0.5">
                  By Hand
                </span>
              </div>
            </div>
          </div>

          {/* 2. RIGHT - Curation-Led Content */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 px-4 py-1.5 rounded-full mb-6 animate-in fade-in duration-1000">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                  aria-hidden="true"
                />
                <span className="text-[#111111] text-[10px] font-bold uppercase tracking-widest">
                  The Zack Luxury Atelier
                </span>
              </div>

              <h2 className="text-[#111111] text-4xl md:text-5xl font-serif font-light leading-[1.15] mb-8">
                Ancestral Moroccan Leather, <br />
                <span className="text-[#D4AF37] italic font-normal">
                  Curated for Modern Spaces.
                </span>
              </h2>

              <div className="space-y-6 text-[#111111]/80 text-base leading-relaxed font-medium max-w-xl">
                <p>
                  Zack Luxury redefines ancestral Moroccan leathercraft by
                  centering raw, full-grain materials within an avant-garde studio
                  context. We do not mass-produce; we curate individual
                  sculptural handbags, travel goods, and bespoke custom-crafted
                  leather accessories.
                </p>

                <p className="text-sm font-normal text-[#626060]">
                  Every creation is individually hand-stitched and finished by master
                  artisans in Morocco, capturing timeless silhouettes and 
                  exceptional hardware details that make our pieces 
                  distinctive signature statements.
                </p>
              </div>
            </div>

            {/* Premium Editorial Stats Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-[#D4AF37]/25">
              {highlights.map((item, index) => (
                <div key={index} className="flex flex-col space-y-1.5">
                  <div className="text-[#111111] text-3xl md:text-4xl font-serif font-medium tracking-tight">
                    {item.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <Check
                      size={12}
                      className="text-[#D4AF37]"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}