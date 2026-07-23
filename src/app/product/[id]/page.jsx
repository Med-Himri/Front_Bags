import Image from "next/image";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { CheckCircle, ShieldCheck, Box, Sparkles } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { ProductGallery } from "./ProductGallery";
import Link from "next/link";

// ================= PRO SEO & ISR PERFORMANCE =================
async function fetchProduct(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/product/${id}`, {
      next: { revalidate: 60 }, // Incremental Static Regeneration (ISR)
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("SEO Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await fetchProduct(id);
  const baseUrl = "http://localhost:5000"; // Replace with your actual base URL

  if (!product) {
    return {
      title: "Collection Piece Not Found | ClayOria",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.metaTitle || product.title} | ClayOria Atelier`;
  const description = (
    product.metaDescription ||
    product.shortDescription ||
    "Discover handcrafted Moroccan ceramics from Safi."
  ).slice(0, 160);
  const imageUrl = product.mainImage?.url || `${baseUrl}/fallback.jpg`;
  const productUrl = `${baseUrl}/product/${product.slug || id}`;

  return {
    title,
    description,
    alternates: { canonical: productUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website", // 🚀 تم الإصلاح هنا: Next.js كيقبل website، والبيانات د البروداكت غاتمشي ف other
      url: productUrl,
      siteName: "ClayOria",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      // 🚀 هكا كنفرضوا على السوشيال ميديا ومحركات البحث يقراوه كـ Product صحة
      "og:type": "product",
      "product:price:amount": product.discountPrice || product.price,
      "product:price:currency": "USD",
      "product:availability": product.stock === "in_stock" ? "instock" : "oos",
      "product:retailer_item_id": product.sku || id,
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product)
    return (
      <div className="py-40 text-center font-serif text-[#2D2522] bg-[#F9F6F0]">
        <h1 className="text-2xl mb-4">Exhibition piece not found.</h1>
        <Link
          href="/product"
          className="text-[#C87A53] underline font-sans text-sm"
        >
          Return to Atelier Catalog
        </Link>
      </div>
    );

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  // 1. JSON-LD Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.mainImage?.url || "/fallback.jpg"],
    description: product.shortDescription || "",
    sku: product.sku || id,
    mpn: product.sku || id,
    brand: { "@type": "Brand", name: "ClayOria" },
    offers: {
      "@type": "Offer",
      url: `https://www.clayoria.com/product/${product.slug || id}`,
      priceCurrency: "USD",
      price: String(product.discountPrice || product.price),
      priceValidUntil: "2027-12-31",
      availability:
        product.stock === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  // 2. JSON-LD Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Atelier",
        item: "https://www.clayoria.com/product",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category || "Ceramics",
        item: `https://www.clayoria.com/product`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `https://www.clayoria.com/product/${product.slug || id}`,
      },
    ],
  };

  return (
    <div className="bg-[#F9F6F0] min-h-screen text-[#2D2522] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <nav
        aria-label="Breadcrumb"
        className="max-w-6xl mx-auto px-6 pt-27 pb-4 text-[10px] font-bold uppercase tracking-widest text-[#2D2522]/40"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              href="/product"
              className="hover:text-[#C87A53] transition-colors"
            >
              Atelier
            </Link>
          </li>
          <li className="opacity-70">/</li>
          <li>
            <span className="opacity-70">{product.category}</span>
          </li>
          <li className="opacity-70">/</li>
          <li>
            <span className="text-[#2D2522]" aria-current="page">
              {product.title}
            </span>
          </li>
        </ol>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ProductGallery
            mainImage={product.mainImage}
            gallery={product.gallery}
            title={product.title}
            hasDiscount={hasDiscount}
            discountPrice={product.discountPrice}
            price={product.price}
          />
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-32 space-y-6 lg:pl-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#C87A53]/10 text-[#C87A53] px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-[#2C3E35] text-[9px] font-bold uppercase tracking-wider bg-[#2C3E35]/5 px-2.5 py-1 rounded-lg">
                  <Sparkles size={11} className="text-[#C87A53]" />
                  <span>Safi Certified Variant</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-[#2D2522] leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 pt-3 border-t border-[#D9C3B0]/30">
                <span className="text-3xl font-serif font-light tracking-tight text-[#2D2522]">
                  ${hasDiscount ? product.discountPrice : product.price}
                </span>
                {hasDiscount && (
                  <span className="text-base text-[#2D2522]/40 line-through decoration-[#C87A53]/40">
                    ${product.price}
                  </span>
                )}
                <span className="text-[10px] font-bold text-[#2D2522]/40 uppercase tracking-wider">
                  / FOB Casablanca
                </span>
              </div>

              <div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium border ${
                    product.stock === "in_stock"
                      ? "bg-white border-[#2C3E35]/20 text-[#2C3E35]"
                      : "bg-red-50/50 border-red-200 text-red-700"
                  }`}
                >
                  <CheckCircle
                    size={13}
                    className={
                      product.stock === "in_stock"
                        ? "text-[#C87A53]"
                        : "text-red-500"
                    }
                  />
                  <span className="text-[11px] font-medium">
                    {product.stock === "in_stock"
                      ? "Queue Active — Ready to Crate"
                      : "Allocation Full"}
                  </span>
                </div>
              </div>

              <p className="text-[#2D2522]/80 text-sm md:text-base leading-relaxed border-l border-[#C87A53] pl-4 italic font-medium">
                {product.shortDescription}
              </p>

              <div className="pt-2 max-w-md">
                <AddToCartButton product={product} />
              </div>

              {/* Minimal Trust Features */}
              <div className="pt-6 border-t border-[#D9C3B0]/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-xl border border-[#D9C3B0]/30 text-[#C87A53] flex-shrink-0">
                    <Box size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[#2D2522]">
                      Fragile Freight Guard
                    </p>
                    <p className="text-[11px] text-[#2D2522]/50 font-normal leading-tight">
                      Multi-layer custom sorting and structural shockproof
                      crating.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-xl border border-[#D9C3B0]/30 text-[#C87A53] flex-shrink-0">
                    <ShieldCheck size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[#2D2522]">
                      Lead-Free Glaze
                    </p>
                    <p className="text-[11px] text-[#2D2522]/50 font-normal leading-tight">
                      Tested non-toxic mineral chemistry compliant with global
                      laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full Materiality Rich Text Description */}
        <section className="mt-32 pt-14 border-t border-[#D9C3B0]/30 max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-light mb-10 text-center text-[#2D2522]">
            Architectural Elements & Materiality
          </h2>
          <article
            className="prose prose-neutral max-w-none prose-p:text-[#2D2522]/80 prose-p:leading-8 prose-p:font-medium prose-p:text-sm md:prose-p:text-base prose-headings:font-serif prose-headings:font-light prose-strong:font-bold prose-li:text-[#2D2522]/80 tracking-wide"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
