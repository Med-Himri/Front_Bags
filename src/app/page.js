import { About } from "@/components/home/About";
import { CTA } from "@/components/home/CTA";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Quality } from "@/components/home/Quality";

export const metadata = {
  title: "Zack Luxury | Premium Women's Handbags & Accessories",
  description:
    "Shop Zack Luxury's curated collection of premium women's handbags and accessories. Timeless designs, quality materials, crafted for the modern woman.",
  keywords:
    "luxury women's handbags, women's accessories, premium leather bags, designer-inspired handbags, Zack Luxury store, luxury fashion accessories",
  authors: [{ name: "Zack Luxury" }],
  robots: "index, follow",
  openGraph: {
    title: "Zack Luxury | Premium Women's Handbags & Accessories Boutique",
    description:
      "Discover Zack Luxury's collection of premium handbags and accessories. Timeless elegance, quality craftsmanship, modern luxury.",
    url: "https://www.zackluxury.com/",
    siteName: "Zack Luxury",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://frontbags.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Zack Luxury - Premium Women's Handbags and Accessories",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zack Luxury | Premium Women's Handbags Store",
    description:
      "Shop premium women's handbags and accessories. Timeless designs, quality craftsmanship, modern luxury.",
    images: ["https://frontbags.vercel.app/logo.png"],
  },

  alternates: {
    canonical: "https://frontbags.vercel.app/",
  },
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Features />
        <About />
        <Quality />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}