import ProductsPage from "@/components/products/Product";
import React from "react";

export const metadata = {
  title: "Shop Authentic Handmade Moroccan Leather Goods | Zack Luxury",

  description:
    "Explore Zack Luxury's collection of authentic handmade Moroccan leathercraft. Shop premium full-grain leather bags, bespoke accessories, and handcrafted luxury goods to elevate your style.",

  keywords:
    "shop authentic handmade Moroccan leather goods, buy luxury leather bags online, Moroccan leathercraft store, handmade leather tote, bespoke leather accessories, artisan full-grain leather, Zack Luxury products",

  authors: [{ name: "Zack Luxury Team" }],
  robots: "index, follow",

  openGraph: {
    title: "Shop Authentic Handmade Moroccan Leather Goods | Zack Luxury Store",
    description:
      "Discover our curated collection of authentic handmade Moroccan leather goods. Find the perfect bespoke leather bags and handcrafted luxury pieces for your collection.",
    url: "https://www.zackluxury.com/product",
    type: "website",
    locale: "en_US",
    siteName: "Zack Luxury",
    images: [
      {
        url: "https://www.zackluxury.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Zack Luxury Store – Shop Authentic Handmade Moroccan Leathercraft",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zack Luxury | Shop Authentic Moroccan Leather Goods",
    description:
      "Browse our collection of authentic handmade Moroccan leather goods. Premium full-grain leather bags and bespoke accessories crafted by master artisans.",
    images: ["https://www.zackluxury.com/logo.png"],
  },

  alternates: {
    canonical: "https://www.zackluxury.com/product",
  },
};

export default function Products() {
  return (
    <main className="min-h-screen bg-[#F9F6F0]">
      <ProductsPage />
    </main>
  );
}