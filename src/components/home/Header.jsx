"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/slices/cartSlice";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Get total items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Set mounted state to true after initial client render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "About Us", href: "/about-us" },
    { name: "Product", href: "/product" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[#F9F6F0]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#C9A24B]/25"
            : "bg-transparent py-5"
          }`}
      >
        <nav className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between ">
            {/* 1. LOGO */}
            <Link
              href="/"
              className="relative z-50 flex items-center"
              aria-label="Zack Luxury Homepage"
            >
              <Image
                src="/logo.png"
                alt="Zack Luxury Logo"
                width={140}
                height={80}
                className="h-auto w-[50px] lg:w-[70px] transition-transform duration-300 hover:scale-105"
                priority
              />
            </Link>

            {/* 2. DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[13px] font-medium capitalize tracking-wide text-[#1A1A1A] hover:text-[#C9A24B] transition-colors duration-300 pb-1 group"
                >
                  {link.name}
                  {/* Underline Animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A24B] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* 3. ACTIONS */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="group relative p-2.5 rounded-full text-[#1A1A1A] bg-[#EFE3C8] hover:bg-[#C9A24B] hover:text-white transition-all duration-300 ease-out"
                  aria-label={`Open Cart, ${totalItems} items`}
                  aria-expanded={isCartOpen}
                >
                  <ShoppingCart
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C9A24B] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md animate-bounce">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[-1]"
                      onClick={() => setIsCartOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-4 w-85 bg-[#F9F6F0] rounded-2xl shadow-xl border border-[#C9A24B]/30 z-50 overflow-hidden animate-in slide-in-from-top-3 duration-300">
                      <div className="p-5 border-b border-[#C9A24B]/25 flex justify-between items-center bg-white/50">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Curated Collection
                        </span>
                        <span className="text-xs text-[#C9A24B] font-medium">
                          {totalItems} Selected
                        </span>
                      </div>

                      <div className="max-h-80 overflow-y-auto p-3 space-y-2">
                        {cartItems.length === 0 ? (
                          <div className="py-12 text-center">
                            <p className="text-xs text-[#1A1A1A]/60 tracking-wide font-medium">
                              Your collection is empty.
                            </p>
                          </div>
                        ) : (
                          cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 p-3 hover:bg-white rounded-xl transition-all duration-200 group border border-transparent hover:border-[#C9A24B]/20"
                            >
                              <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#C9A24B]/30 bg-white shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-[#1A1A1A] truncate">
                                  {item.title}
                                </p>
                                <p className="text-[11px] text-[#1A1A1A]/70 mt-1">
                                  Qty: {item.quantity} ×{" "}
                                  <span className="text-[#C9A24B] font-medium">
                                    ${item.price}
                                  </span>
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                                aria-label={`Remove ${item.title} from cart`}
                                className="self-center p-2 text-[#1A1A1A]/40 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} aria-hidden="true" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {cartItems.length > 0 && (
                        <div className="p-4 bg-white border-t border-[#C9A24B]/25">
                          <Link
                            href="/cart"
                            onClick={() => setIsCartOpen(false)}
                            className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] text-[#C9A24B] py-3.5 rounded-xl text-xs font-medium tracking-wide hover:bg-[#000000] transition-all shadow-md active:scale-[0.98]"
                          >
                            Proceed to Checkout{" "}
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-[#1A1A1A] hover:text-[#C9A24B] transition-colors"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open mobile menu"
                aria-expanded={isMenuOpen}
              >
                <Menu size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 4. MOBILE NAVIGATION */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#F9F6F0] z-100 flex flex-col md:hidden animate-in fade-in slide-in-from-right duration-400">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A24B]/30 bg-white">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9A24B]">
              Explore Zack Luxury
            </p>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[#1A1A1A]"
              aria-label="Close mobile menu"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 px-8 py-10 flex flex-col space-y-6 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-light text-[#1A1A1A] flex justify-between items-center group border-b border-[#C9A24B]/20 pb-4 hover:text-[#C9A24B] transition-colors"
              >
                {link.name}
                <ArrowRight
                  size={20}
                  className="text-[#C9A24B] opacity-60"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="p-8 bg-white border-t border-[#C9A24B]/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] mb-1">
              Zack Luxury
            </p>
            <p className="text-xs text-[#1A1A1A]/70">
              Timeless Elegance, Modern Luxury.
            </p>
          </div>
        </div>
      )}
    </>
  );
}