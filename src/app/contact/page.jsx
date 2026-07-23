import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import React from "react";

export const metadata = {
  title: "Contact Zack Luxury | Premium Women's Handbags & Accessories",

  description:
    "Get in touch with Zack Luxury. Contact our customer support team for questions about your orders, shipping, and our women's handbags and accessories.",

  keywords:
    "Contact Zack Luxury, women's handbags customer service, luxury accessories support, track order Zack Luxury, Zack Luxury inquiries",

  authors: [{ name: "Zack Luxury Team" }],
  robots: "index, follow",

  openGraph: {
    title: "Contact Zack Luxury | Customer Support",
    description:
      "Reach out to Zack Luxury for inquiries about our handbags and accessories, order updates, and shipping details.",
    url: "https://www.zackluxury.com/contact",
    siteName: "Zack Luxury",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.zackluxury.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Zack Luxury - Premium Women's Handbags Support",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Zack Luxury | Customer Support",
    description:
      "Have questions about our handbags and accessories? Contact the Zack Luxury team for order and shipping support.",
    images: ["https://www.zackluxury.com/logo.png"],
  },

  alternates: {
    canonical: "https://www.zackluxury.com/contact",
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Store",
    name: "Zack Luxury",
    image: "https://www.zackluxury.com/logo.png",
    description:
      "Boutique offering premium women's handbags and accessories.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "Global",
      availableLanguage: ["English", "French", "Arabic"],
    },
  },
};

function page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CTA />
      <Footer />
    </div>
  );
}

export default page;