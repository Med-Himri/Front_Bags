"use client";

import React from "react";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#362e2e] text-[#FAFAFA] border-t border-[#D4AF37]/20">
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        {/* TOP SECTION: ASYMMETRIC SPLIT */}
        <div className="grid lg:grid-cols-12 gap-16 pb-16 border-b border-[#D4AF37]/20">
          {/* Left Block: Brand Identity Statement (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="relative z-50 flex items-center"
                aria-label="Zack Luxury Homepage"
              >
                <Image
                  src="/logo.png"
                  alt="Zack Luxury Logo"
                  width={150}
                  height={50}
                  className="h-auto w-[70px] lg:w-[90px] transition-transform duration-300 hover:scale-105"
                  priority
                />
              </Link>
            </div>

            <p className="text-[#FAFAFA]/70 text-sm leading-relaxed max-w-sm font-medium">
              Crafted for the bold. Defined by elegance. Discover our exclusive
              curation of luxury bespoke pieces and fine artisan creations.
            </p>

            {/* Premium Social Links */}
            <div className="flex space-x-5 pt-2">
              <a
                href="https://www.instagram.com"
                aria-label="Follow Zack Luxury on Instagram"
                className="text-[#FAFAFA]/60 hover:text-[#D4AF37] transition-colors duration-300 transform hover:scale-110"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                aria-label="Follow Zack Luxury on LinkedIn"
                className="text-[#FAFAFA]/60 hover:text-[#D4AF37] transition-colors duration-300 transform hover:scale-110"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com"
                aria-label="Follow Zack Luxury on Facebook"
                className="text-[#FAFAFA]/60 hover:text-[#D4AF37] transition-colors duration-300 transform hover:scale-110"
              >
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Right Block: Clean Horizontal Link Layout (7 Columns) */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-12 lg:pl-12">
            {/* Column 1: Navigation */}
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Navigation
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about-us" },
                  { label: "Shop", href: "/product" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#FAFAFA]/70 hover:text-[#D4AF37] transition-colors duration-300 font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Shop */}
            {/* NOTE: these three items were placeholder "collection" names with no
    matching products or category pages behind them — that's why they
    404'd. Until you build real category filtering on /product, all
    three just point to the general shop page so they at least work. */}
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Shop
              </p>
              <ul className="space-y-3">
                {["New Arrivals", "Best Sellers", "All Products"].map((label) => (
                  <li key={label} className="group/item">
                    <a
                      href="/product"
                      className="text-xs text-[#FAFAFA]/70 hover:text-[#D4AF37] transition-colors duration-300 font-normal flex items-center gap-1"
                    >
                      <span>{label}</span>
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#D4AF37]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Maison Contact
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5 text-xs text-[#FAFAFA]/70 font-medium">
                  <MapPin
                    size={14}
                    className="text-[#D4AF37] shrink-0 mt-0.5"
                  />
                  <span>
                    Casablanca, Morocco <br />
                    <span className="text-[10px] opacity-60">
                      Private Showroom
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-[#FAFAFA]/70 font-medium">
                  <Phone size={14} className="text-[#D4AF37] shrink-0" />
                  <a
                    href="tel:+212600000000"
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    +212 600-000000
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-[#FAFAFA]/70 font-medium">
                  <Mail size={14} className="text-[#D4AF37] shrink-0" />
                  <a
                    href="mailto:contact@zackluxury.com"
                    className="hover:text-[#D4AF37] transition-colors truncate"
                  >
                    contact@zackluxury.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: METADATA */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#FAFAFA]/40 text-xs font-normal">
            © {new Date().getFullYear()} Zack Luxury Maison. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy-policy"
              className="text-xs text-[#FAFAFA]/40 hover:text-[#D4AF37] transition-colors font-normal"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-xs text-[#FAFAFA]/40 hover:text-[#D4AF37] transition-colors font-normal"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}