"use client";

import React from 'react';
import { ShieldCheck, Crown, PackageCheck, Compass } from 'lucide-react';

export function Quality() {
  const certifications = [
    {
      icon: Compass,
      title: 'Maison Heritage',
      description: 'Authentic Bespoke Craftsmanship',
    },
    {
      icon: ShieldCheck,
      title: 'Anti-Tarnish Plating',
      description: 'Durable Gold-Tone Accents',
    },
    {
      icon: Crown,
      title: 'Grade-A Full Grain',
      description: 'Hand-Selected Premium Leather',
    },
    {
      icon: PackageCheck,
      title: 'Secure Transit Box',
      description: 'Global Express Packaging',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Hide Selection', desc: 'Hand-inspecting top-tier full-grain leathers to guarantee flawless texture and long-term durability.' },
    { step: '02', title: 'Precision Cutting', desc: 'Sizing and cutting every piece by hand to maintain structural alignment and grain symmetry.' },
    { step: '03', title: 'Saddle Stitching', desc: 'Applying reinforced hand-stitching with bonded threads for superior strength and clean edges.' },
    { step: '04', title: 'Hardware Fitting', desc: 'Securing custom-cast gold-toned hardware, treated to resist wear and environmental oxidation.' },
  ];

  return (
    <section id="quality" className="py-32 bg-[#626060] text-[#FAFAFA] relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* 1. EDITORIAL HEADER SPLIT */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24 border-b border-[#D4AF37]/30 pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-2 rounded-full mb-8 border border-[#D4AF37]/40">
              <ShieldCheck size={14} className="text-[#D4AF37]" aria-hidden="true" />
              <span className="text-[#FAFAFA] text-[10px] font-bold uppercase tracking-widest">
                Craftsmanship Validation
              </span>
            </div>
            <h2 className="text-[#FAFAFA] text-4xl md:text-5xl font-serif font-light leading-[1.15]">
              Uncompromising Standards <br />
              <span className="text-[#D4AF37] italic font-normal">At Every Stage.</span>
            </h2>
          </div>
          
          <div className="max-w-md lg:pb-2">
            <p className="text-[#FAFAFA]/80 text-base leading-relaxed font-normal">
              Our creation process honors time-tested artisan methods while delivering the sleek refinement and structural integrity required for modern luxury.
            </p>
          </div>
        </div>

        {/* 2. THE JOURNEY (PROCESS TIMELINE) */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-[1px] bg-gradient-to-r from-[#D4AF37]/60 to-transparent" aria-hidden="true" />

            {processSteps.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Node */}
                <div className="w-3 h-3 rounded-full bg-[#D4AF37] mb-8 relative z-10 shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:scale-150 transition-transform duration-500 hidden lg:block" aria-hidden="true" />
                
                {/* Big Background Number */}
                <div className="absolute -top-10 -left-4 text-[#D4AF37]/25 font-serif text-8xl font-bold select-none pointer-events-none group-hover:-translate-y-2 transition-transform duration-500" aria-hidden="true">
                  {item.step}
                </div>
                
                <div className="relative z-10 pt-2 lg:pt-0">
                  <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] mb-3">
                    Stage {item.step}
                  </h4>
                  <h3 className="text-[#FAFAFA] text-xl font-serif font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#FAFAFA]/75 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CERTIFICATIONS (MINIMALIST SEALS) */}
        <div className="bg-[#4D4B4B] rounded-3xl p-10 lg:p-14 border border-[#D4AF37]/30 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-xl bg-[#626060] border border-[#D4AF37]/40 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37] transition-colors duration-500 shadow-sm">
                    <Icon className="text-[#D4AF37] group-hover:text-[#111111] transition-colors duration-500" size={22} aria-hidden="true" />
                  </div>
                  <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1.5">
                    {cert.title}
                  </h4>
                  <p className="text-[#FAFAFA]/70 text-[10px] font-medium uppercase tracking-wider">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}