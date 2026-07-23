"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProductsAPI } from "@/services/user.service";
import { ArrowRight, Loader2, Plus, Minus, ShoppingBag, ShieldCheck } from "lucide-react";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "@/redux/slices/cartSlice";

const PAGE_SIZE = 20;

function ProductsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getInitialProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllProductsAPI(1);
      setProducts(res.data || []);
      setHasMore((res.data?.length || 0) === PAGE_SIZE);
      setPage(1);
    } catch (err) {
      console.error("Error fetching atelier collection:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getInitialProducts();
  }, [getInitialProducts]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;
    const nextPage = page + 1;
    setIsFetchingMore(true);
    try {
      const res = await getAllProductsAPI(nextPage);
      const newProducts = res.data || [];
      if (newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(nextPage);
      }
      if (newProducts.length < PAGE_SIZE) setHasMore(false);
    } catch (err) {
      console.error("Error loading more pieces:", err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, hasMore, isFetchingMore]);

  const categories = useMemo(() => {
    if (products.length === 0) return ["All"];
    return ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="bg-[#F9F6F0] min-h-screen flex flex-col antialiased text-[#111111]">
      <Header />

      <main className="flex-1 pb-32 pt-28">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* 1. HERO HEADER */}
          <header className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Master Leathercraft Exhibition
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight tracking-tight text-[#111111]">
              The Zack Luxury <br />
              <span className="text-[#D4AF37] italic font-normal">
                Atelier Collection
              </span>
            </h1>
            <p className="text-xs text-[#626060] font-medium max-w-md mx-auto leading-relaxed pt-2">
              Bespoke, handcrafted full-grain Moroccan leather goods, tailored by master artisans and delivered directly from our workshops.
            </p>
          </header>

          {/* 2. CATEGORY FILTERS */}
          <nav
            className="flex flex-wrap justify-center gap-3 mb-16"
            aria-label="Product categories"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-[#111111] text-[#F9F6F0] border-[#111111] shadow-md shadow-[#111111]/10 scale-[1.02]"
                    : "bg-white text-[#626060] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* 3. PRODUCT GRID */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-36 space-y-4">
              <Loader2 className="animate-spin text-[#D4AF37]" size={36} />
              <p className="text-[11px] text-[#626060] uppercase tracking-widest animate-pulse font-semibold">
                Unveiling Atelier Artifacts...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock !== "in_stock";
                const cartItem = cartItems.find(
                  (item) => item.id === product._id
                );

                return (
                  <article
                    key={product._id}
                    className="group flex flex-col bg-white rounded-3xl p-5 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[#111111]/5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                  >
                    {/* 1. Image Studio Frame */}
                    <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F9F6F0] rounded-2xl mb-6">
                      <Image
                        src={product.mainImage?.url || "/placeholder.jpg"}
                        alt={`Zack Luxury Leathercraft - ${product.title}`}
                        fill
                        className="object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Floating Category Minimal Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#111111]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] shadow-xs border border-[#D4AF37]/30">
                          {product.category}
                        </span>
                      </div>

                      {/* Out of Stock Overlay */}
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-[#111111]/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                          <span className="bg-[#F9F6F0] text-[#111111] px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase shadow-lg border border-[#D4AF37]/40">
                            Allocation Reserved
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 2. Meta Details Area */}
                    <div className="flex flex-col grow px-1 space-y-4">
                      <div className="space-y-2">
                        {/* Title */}
                        <h2 className="text-[#111111] text-lg font-serif font-light tracking-wide line-clamp-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                          {product.title}
                        </h2>

                        {/* Minimalist Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {product.tags?.[0]
                            ?.split(",")
                            .slice(0, 2)
                            .map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] font-bold uppercase tracking-wider text-[#626060] bg-[#F9F6F0] border border-[#D4AF37]/20 px-2.5 py-1 rounded-md"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* 3. Pricing & Interaction Bar */}
                      <div className="pt-4 border-t border-[#D4AF37]/20 mt-auto flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <p className="text-[#626060] text-[9px] font-bold uppercase tracking-widest">
                            Atelier Value
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[#111111] text-2xl font-serif font-medium tracking-tight">
                              ${product.discountPrice || product.price}
                            </span>
                            <span className="text-[#626060] text-[10px] font-medium lowercase">
                              /
                              {product.category?.toLowerCase().includes("set")
                                ? "set"
                                : "item"}
                            </span>
                          </div>
                        </div>

                        {/* Cart Controller */}
                        <div className="flex items-center justify-end z-10">
                          {cartItem ? (
                            <div className="bg-[#111111] flex items-center gap-2.5 text-[#F9F6F0] rounded-xl p-1.5 shadow-md border border-[#D4AF37]/40 animate-in zoom-in duration-300">
                              <button
                                onClick={() =>
                                  dispatch(decreaseQty(product._id))
                                }
                                className="hover:text-[#D4AF37] transition-colors p-1"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} strokeWidth={2.5} />
                              </button>
                              <span className="font-bold text-xs min-w-3.5 text-center text-[#D4AF37]">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(increaseQty(product._id))
                                }
                                className="hover:text-[#D4AF37] transition-colors p-1"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} strokeWidth={2.5} />
                              </button>
                            </div>
                          ) : (
                            <button
                              disabled={isOutOfStock}
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    id: product._id,
                                    title: product.title,
                                    price:
                                      product.discountPrice || product.price,
                                    image: product.mainImage?.url,
                                    slug: product.slug,
                                  })
                                )
                              }
                              className="p-3 bg-[#F9F6F0] text-[#111111] rounded-xl border border-[#D4AF37]/40 hover:bg-[#111111] hover:text-[#D4AF37] hover:border-[#111111] transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 disabled:opacity-0 cursor-pointer"
                              aria-label={`Add ${product.title} to selection`}
                            >
                              <ShoppingBag size={18} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 4. Deep Link Specifications */}
                      <Link
                        href={`/product/${product.slug || product._id}`}
                        className="block pt-1"
                      >
                        <button className="w-full py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-[#D4AF37]/30 text-[#111111] hover:bg-[#111111] hover:text-[#F9F6F0] hover:border-[#111111] bg-[#F9F6F0]/50 shadow-xs cursor-pointer">
                          <span>View Craftsmanship Details</span>
                          <ArrowRight
                            size={13}
                            className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform"
                          />
                        </button>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* 4. LOAD MORE SECTION */}
          {hasMore && activeCategory === "All" && (
            <div className="text-center mt-20">
              <button
                onClick={handleLoadMore}
                disabled={isFetchingMore}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#111111] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest rounded-xl border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 shadow-md disabled:opacity-50 cursor-pointer"
              >
                <span>
                  {isFetchingMore
                    ? "Syncing Atelier..."
                    : "Expand Collection Catalog"}
                </span>
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductsPage;