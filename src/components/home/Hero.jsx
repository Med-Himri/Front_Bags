"use client";

import { ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#F9F6F0]">

      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0 z-0">
        <div className="block lg:hidden h-full w-full relative">
          <Image
            src="/hero_phone.webp"
            alt="Zack Luxury Women's Accessories Mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#F9F6F0]/90 to-[#F9F6F0]/20 z-10" />
        </div>

        <div className="hidden lg:block h-full w-full relative">
          <Image
            src="/hero_desctop.webp"
            alt="Zack Luxury Women's Accessories Collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#F9F6F0] via-[#F9F6F0]/50 to-transparent z-10" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <div className="max-w-[750px]">

          <div className="space-y-3 mb-8 mt-2">
            <h1 className="text-[#1A1A1A] font-serif leading-[1.1] tracking-tight">
              <span className="text-[2.5rem] md:text-[4rem] block font-semibold">
                Timeless Style,
              </span>
              <span className="text-[3.2rem] md:text-[5.2rem] italic font-normal text-[#b6733c] block">
                Curated Luxury.
              </span>
            </h1>
            <p className="text-[#1A1A1A] text-base md:text-lg font-medium max-w-md leading-relaxed">
              Discover women&apos;s accessories designed with premium materials and timeless elegance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href="/product"
              className="group relative px-9 py-4.5 bg-[#1A1A1A] text-[#C9A24B] rounded-xl overflow-hidden transition-all duration-500 shadow-xl flex items-center justify-center gap-2.5 hover:bg-[#000000]"
            >
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest">Shop Collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-sm">
            {[
              { val: "100%", label: "Handcrafted" },
              { val: "Premium", label: "Materials" },
              { val: "Global", label: "Shipping" }
            ].map((stat, i) => (
              <div key={i} className="space-y-0.5">
                <span className="text-[#1A1A1A] text-2xl font-bold tracking-tight">{stat.val}</span>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#ce6a1e]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}