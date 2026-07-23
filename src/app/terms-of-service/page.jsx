import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Scale, ShieldCheck, Globe, FileText } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Terms of Service | Zack Luxury – Authentic Handmade Moroccan Leathercraft",

  description:
    "Read Zack Luxury's Terms of Service. Learn about our atelier policies, global transit, custom monogramming, and terms for purchasing our authentic handmade leather creations online.",

  keywords:
    "terms of service, Zack Luxury terms, authentic handmade leather goods, Moroccan leathercraft, online store policies, retail terms, bespoke leather allocation",

  authors: [{ name: "Zack Atelier Team" }],
  robots: "index, follow",

  openGraph: {
    title: "Terms of Service | Zack Luxury Store & Commercial Policies",
    description:
      "Review the Terms of Service for Zack Luxury. Comprehensive information regarding online purchases, bespoke allocations, shipping, and policies for our authentic handmade leather goods.",
    url: "http://localhost:5000/terms-of-service",
    siteName: "Zack Luxury",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "http://localhost:5000/logo.png",
        width: 1200,
        height: 630,
        alt: "Zack Luxury Terms of Service – Authentic Handmade Moroccan Leathercraft",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Zack Luxury Policies",
    description:
      "Review Zack Luxury's terms and policies for purchasing our authentic handmade Moroccan leather creations online.",
    images: ["http://localhost:5000/logo.png"],
  },

  alternates: {
    canonical: "http://localhost:5000/terms-of-service",
  },
};

export default function TermsOfService() {
  const lastUpdated = "May 21, 2026";

  return (
    <>
      <Header />
      <main className="bg-[#F9F6F0] min-h-screen pt-36 pb-24 text-[#111111]">
        <div className="container mx-auto px-6">
          <article className="max-w-5xl mx-auto bg-white border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-xl shadow-[#111111]/5">
            {/* High-End Editorial Legal Header */}
            <header className="bg-[#636161] p-12 text-[#F9F6F0]">
              <div className="flex items-center gap-3 mb-4 opacity-80">
                <FileText
                  size={18}
                  className="text-[#D4AF37]"
                  aria-hidden="true"
                />
                <span className="uppercase tracking-widest text-[10px] font-bold text-[#D4AF37]">
                  Atelier Legal Desk
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">
                Terms of Service
              </h1>
              <p className="text-[#F9F6F0]/80 max-w-2xl text-base font-normal leading-relaxed">
                Please review these global commercial terms prior to requesting
                private allocations or executing wholesale contracts. By accessing
                the Zack Luxury Leathercraft ecosystem, you bind your corporate or private entity to these legal provisions.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3 text-xs opacity-90 font-medium tracking-wide">
                <span>
                  <strong>Last Updated:</strong> {lastUpdated}
                </span>
                <span>
                  <strong>Framework:</strong> v3.1.2
                </span>
                <span>
                  <strong>Atelier Jurisdiction:</strong> Morocco
                </span>
              </div>
            </header>

            {/* Quick Overview Stream Block */}
            <section className="p-8 md:p-16 space-y-16">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2.5 p-6 bg-[#F9F6F0]/60 border border-[#D4AF37]/25 rounded-2xl">
                  <Globe
                    className="text-[#D4AF37]"
                    size={22}
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-[#111111] text-sm mt-1">
                    Express Transit Logistics
                  </h2>
                  <p className="text-xs text-[#111111]/70 leading-relaxed">
                    Protocols for custom protective packaging and secure international courier transit.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 p-6 bg-[#F9F6F0]/60 border border-[#D4AF37]/25 rounded-2xl">
                  <ShieldCheck
                    className="text-[#D4AF37]"
                    size={22}
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-[#111111] text-sm mt-1">
                    Atelier Protection
                  </h2>
                  <p className="text-xs text-[#111111]/70 leading-relaxed">
                    Securing original leathercraft patterns, finishes, and bespoke monogram designs.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 p-6 bg-[#F9F6F0]/60 border border-[#D4AF37]/25 rounded-2xl">
                  <Scale
                    className="text-[#D4AF37]"
                    size={22}
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-[#111111] text-sm mt-1">
                    Dispute Resolutions
                  </h2>
                  <p className="text-xs text-[#111111]/70 leading-relaxed">
                    Standardized procedures for hand-finished leather grain and custom spec variances.
                  </p>
                </div>
              </div>

              {/* Main Legal Content Block */}
              <div className="space-y-10 text-base leading-relaxed text-[#111111]/80 font-medium">
                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    1. Binding Consent & Scalability
                  </h2>
                  <p>
                    The digital studio interfaces and allocation channels
                    managed by Zack Luxury Leathercraft (referred to as &quot;the
                    Atelier,&quot; &quot;we,&quot; or &quot;us&quot;) are
                    regulated under these universal Terms of Service. We reserve
                    the authority to update these terms to align with international shipping standards. Continued interaction with our bespoke
                    allocation framework validates your acceptance of updated terms.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    2. Verified Client Profiles
                  </h2>
                  <p>
                    Retail buyers, luxury boutiques, and private clients holding verified allocation profiles assume total accountability for credential protection. Zack Luxury retains absolute discretion to freeze product allocations, withhold custom finish samples, or cancel production runs failing initial deposit verification.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    3. Leather Export & Customization Compliance
                  </h2>
                  <p>
                    Due to the hand-crafted, full-grain nature of our luxury leather goods, international order processing is bound to the following conditions:
                  </p>
                  <ul className="space-y-2.5 pl-5 list-disc marker:text-[#D4AF37] text-sm">
                    <li>
                      <strong>Delivery standard:</strong> All bulk or bespoke shipments are dispatched on FOB or Ex Works terms unless otherwise negotiated in client covenants.
                    </li>
                    <li>
                      <strong>Custom Monogramming:</strong> Personalizations and bespoke finishes are strictly non-refundable once production or leather cutting has commenced.
                    </li>
                    <li>
                      <strong>Grain & Tone Variations:</strong> As genuine full-grain leather exhibits natural variations, minor texture and pigment nuances reflect authentic hand-craftsmanship rather than defect.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    4. Financial Protocols & Quotations
                  </h2>
                  <p>
                    Pro-forma quotes for boutique allocations stand firm for exactly 14 calendar days. Payments are processed via secure wire transfers, recognized credit facilities, or direct boutique payment gateways verified by corresponding banking partners.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    5. Intellectual Design Ownership
                  </h2>
                  <p>
                    All original patterns, tanning finishes, custom hardware designs, and product imagery published on this platform remain the exclusive artistic property of Zack Luxury. Unauthorized replication of our signature silhouettes for mass commercial duplication constitutes copyright infringement.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    6. Liability Boundaries
                  </h2>
                  <p>
                    Zack Luxury is not responsible for international transit delays caused by customs hold-ups or courier routing complications. Total judicial liability cannot exceed the total invoice amount cleared for that single specified order.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-serif font-light text-[#111111]">
                    7. Ruling Jurisdiction
                  </h2>
                  <p>
                    These terms are governed and interpreted under Moroccan Commercial Law. Any dispute stemming from international distribution or custom allocations will be decided under local commercial jurisdiction.
                  </p>
                </section>

                {/* Micro Legal Footer Box */}
                <section className="bg-[#F9F6F0]/80 p-8 rounded-2xl border-l-4 border-[#D4AF37] mt-12">
                  <h3 className="text-lg font-serif font-medium text-[#111111] mb-1.5">
                    Require Executed Corporate Agreements?
                  </h3>
                  <p className="mb-0 text-sm font-normal text-[#111111]/80">
                    To request a bilateral signed corporate addendum for your volume allocation, reach out to our client desk at{" "}
                    <a href="mailto:contact.zackluxury@gmail.com" className="text-[#D4AF37] font-semibold hover:underline">
                      contact.zackluxury@gmail.com
                    </a>.
                  </p>
                </section>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}