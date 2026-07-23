import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import React from "react";

export const metadata = {
  title: "Privacy Policy | Zack Luxury Leathercraft Atelier",
  description:
    "Read the Privacy Policy for Zack Luxury Leathercraft to learn how we collect, protect, and manage client data in compliance with international standards. We prioritize secure bespoke ordering.",
  keywords:
    "privacy policy, data protection, Zack Luxury privacy, artisanal leather wholesale, client data security, GDPR compliance, leather export privacy",
  authors: [{ name: "Zack Atelier Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy | Zack Luxury Leathercraft Atelier",
    description:
      "Learn how Zack Luxury Leathercraft collects and protects your personal and commercial data. Our privacy practices comply with international standards for luxury trade.",
    url: "http://localhost:5000/privacy-policy",
    siteName: "Zack Luxury",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "http://localhost:5000/logo.png",
        width: 1200,
        height: 630,
        alt: "Zack Luxury Privacy Policy Statement",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Zack Fine Leathercraft",
    description:
      "Understand how Zack Luxury protects your data and privacy. Compliant with international standards for secure luxury trade.",
    images: ["http://localhost:5000/logo.png"],
  },

  alternates: {
    canonical: "http://localhost:5000/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "May 21, 2026";

  return (
    <>
      <Header />
      <main className="bg-[#F9F6F0] min-h-screen pt-36 pb-24 text-[#111111]">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Elegant Studio Header */}
          <div className="border-b border-[#D4AF37]/30 pb-10 mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[#111111] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Clean Editorial Content Block */}
          <div className="space-y-10 text-base leading-relaxed text-[#111111]/80 font-medium">
            <p className="text-lg font-normal text-[#111111] leading-relaxed">
              At Zack Luxury, we respect your professional privacy and are committed to
              protecting the personal and corporate data you share with us. This policy
              explains how we handle your information when you browse our digital atelier 
              or engage in our bespoke leathercraft allocations and concierge services.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-[#111111] pt-4">
                1. Information We Collect
              </h2>
              <p>
                We collect essential commercial data that helps us provide a seamless 
                wholesale and private client experience, including:
              </p>
              <ul className="space-y-3 pl-5 list-disc marker:text-[#D4AF37]">
                <li>
                  <strong>Corporate & Client Identifiers:</strong> Representative name, company name, 
                  business type, destination country, and corporate email when requesting catalog access.
                </li>
                <li>
                  <strong>Transactional Sourcing Data:</strong> Shipping coordinates, custom monogram specifications, 
                  and order history for bespoke leather goods allocation.
                </li>
                <li>
                  <strong>Technical Browsing Data:</strong> IP address, device location metrics, 
                  and platform usage patterns collected via essential cookies.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-[#111111] pt-4">
                2. How We Use Your Data
              </h2>
              <p>Your commercial data is used strictly for legitimate supply chain and client service purposes:</p>
              <ul className="space-y-3 pl-5 list-disc marker:text-[#D4AF37]">
                <li>Crafting, processing, and arranging secure express international transit for your luxury leather orders.</li>
                <li>
                  Generating custom volume pricing and bespoke commission quotes.
                </li>
                <li>
                  Distributing private collection drop notifications and atelier updates (only with explicit opt-in).
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-[#111111] pt-4">
                3. Atelier Data Protection
              </h2>
              <p>
                We implement strict digital security protocols, including industry-standard SSL 
                encryption layers, to guarantee that your corporate credentials and payment 
                details are transmitted securely. Zack Luxury never sells, rents, or leaks your 
                commercial identity to third-party marketing brokers.
              </p>
            </section>

            {/* Micro Badge Contact Box */}
            <section className="bg-white p-8 rounded-2xl mt-16 border border-[#D4AF37]/30 space-y-4 shadow-sm">
              <h2 className="text-xl font-serif font-medium text-[#111111]">
                Contact Our Client Relations Desk
              </h2>
              <p className="text-sm text-[#111111]/80 font-normal leading-relaxed mb-0">
                If you have questions regarding this privacy policy or wish to request data 
                modification or deletion, please contact our concierge team at:
                <br />
                <span className="block mt-3">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:contact.zackluxury@gmail.com" className="text-[#D4AF37] font-semibold hover:underline">
                    contact.zackluxury@gmail.com
                  </a>
                </span>
                <span className="block mt-1">
                  <strong>Direct Line:</strong>{" "}
                  <a href="tel:+212600000000" className="text-[#111111] font-semibold hover:underline">
                    +212 600-000000
                  </a>
                </span>
                <span className="block mt-1">
                  <strong>Atelier Address:</strong> Artisan Industrial Zone, Morocco
                </span>
              </p>
            </section>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}