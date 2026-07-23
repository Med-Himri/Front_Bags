import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Link from "next/link";
import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Zack Luxury | Premium Women's Handbags & Accessories",
  description:
    "Discover the story behind Zack Luxury — a boutique dedicated to premium women's handbags and accessories, blending timeless style with modern craftsmanship.",

  keywords: [
    "About Zack Luxury",
    "premium women's handbags",
    "luxury accessories brand",
    "Zack Luxury story",
    "modern women's fashion accessories",
  ],

  authors: [{ name: "Zack Luxury Team" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    title: "The Story of Zack Luxury | Premium Women's Accessories",
    description:
      "Curated for the modern woman. Explore our collection of premium handbags and accessories built around timeless style.",
    url: "https://www.zackluxury.com/about-us",
    siteName: "Zack Luxury",
    images: [
      {
        url: "https://www.zackluxury.com/logo-zack.png",
        width: 1200,
        height: 630,
        alt: "Zack Luxury - Premium Women's Handbags and Accessories",
      },
    ],
    locale: "en_US",
    type: "website", 
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Zack Luxury",
    description:
      "Premium women's handbags and accessories, curated for the modern woman.",
    images: ["https://www.zackluxury.com/logo-zack.png"],
  },

  alternates: {
    canonical: "https://www.zackluxury.com/about-us",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Zack Luxury",
  image: "https://www.zackluxury.com/logo-zack.png",
  logo: "https://www.zackluxury.com/logo-zack.png",
  description: "Boutique offering premium women's handbags and accessories.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
  },
  url: "https://www.zackluxury.com",
  telephone: "+212XXXXXXXXX",
  knowsAbout: [
    "Women's Handbags",
    "Luxury Accessories",
    "Fashion Retail",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212XXXXXXXXX",
    contactType: "customer service", 
    areaServed: "Global",
    availableLanguage: ["English", "French", "Arabic"],
  },
};

const AboutUs = () => {
  return (
    <div className="bg-[#F9F6F0] text-[#1A1A1A] font-sans antialiased">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO SECTION: Minimal Editorial Space */}
      <section className="relative py-36 px-6 text-center border-b border-[#C9A24B]/30 bg-white/40 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#C9A24B]/10 px-4 py-1.5 rounded-full">
            <Sparkles size={13} className="text-[#C9A24B]" />
            <span className="text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight tracking-tight">
            Timeless Style, <br />
            <span className="text-[#C9A24B] italic font-normal">Curated for You.</span>
          </h1>
          <p className="text-base md:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-xl mx-auto font-medium">
            Zack Luxury brings together premium materials, considered design, and a sharp eye for detail — creating handbags and accessories built to last beyond a season.
          </p>
        </div>
      </section>

      {/* 2. BRAND PILLARS */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
          
          <div className="space-y-4 text-left">
            <span className="text-3xl font-serif font-light text-[#C9A24B]/40 block">01</span>
            <h3 className="text-lg font-semibold tracking-tight">Considered Design</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
              Every piece is selected for clean lines and lasting style, so it works with your wardrobe well beyond a single trend cycle.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <span className="text-3xl font-serif font-light text-[#C9A24B]/40 block">02</span>
            <h3 className="text-lg font-semibold tracking-tight">Quality Materials</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
              We prioritize durable, premium materials and solid construction, so what you buy holds up to daily use.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <span className="text-3xl font-serif font-light text-[#C9A24B]/40 block">03</span>
            <h3 className="text-lg font-semibold tracking-tight">Trusted Service</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
              From checkout to delivery, we aim for a smooth, reliable experience backed by responsive customer support.
            </p>
          </div>

        </div>
      </section>

      {/* 3. BRAND STORY SECTION (Asymmetric Contrast Strip) */}
      <section className="bg-[#1A1A1A] text-[#F9F6F0] py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#C9A24B]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-light leading-snug">
              Why Zack Luxury <br />
              <span className="text-[#C9A24B] italic font-normal">Exists</span>
            </h2>
            <div className="space-y-4 text-sm text-[#F9F6F0]/80 leading-relaxed font-normal">
              <p>
                We started Zack Luxury because we believe premium accessories shouldn&apos;t require guesswork — just honest quality, clear pricing, and pieces that earn a place in your everyday rotation.
              </p>
              <p>
                As we grow, our goal is to expand thoughtfully into new categories, always guided by the same standard: does this piece genuinely deserve a spot in our collection.
              </p>
            </div>
          </div>

          {/* Commitments Card */}
          <div className="w-full lg:w-1/2 bg-[#F9F6F0] text-[#1A1A1A] p-8 md:p-10 rounded-2xl shadow-xl border border-[#C9A24B]/20 space-y-6">
            <h3 className="text-xl font-serif font-medium text-[#1A1A1A]">Our Commitments</h3>
            <ul className="space-y-4 text-xs font-medium tracking-wide">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-1.5 flex-shrink-0" />
                <span>Careful quality checks before any product reaches our catalog.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-1.5 flex-shrink-0" />
                <span>Secure, protective packaging for every order that ships out.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-1.5 flex-shrink-0" />
                <span>Transparent product details so you know exactly what you're buying.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FOOTER CTA */}
      <section className="py-28 text-center">
        <div className="max-w-xl mx-auto space-y-8 px-6">
          <h2 className="text-[#1A1A1A] text-3xl md:text-4xl font-serif font-light leading-tight">
            Ready to find your next <br />signature piece?
          </h2>
          <div>
            <Link
              href="/product"
              className="inline-flex items-center justify-center gap-2.5 bg-[#1A1A1A] text-[#C9A24B] px-8 py-4 rounded-xl text-xs font-medium tracking-wide shadow-lg hover:bg-[#000000] transition-all active:scale-[0.98]"
            >
              Shop the Collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;