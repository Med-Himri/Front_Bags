// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { Plus, Minus, Trash2, ArrowLeft, ShieldCheck, ShoppingBag } from "lucide-react";
// import {
//   increaseQty,
//   decreaseQty,
//   removeFromCart,
// } from "@/redux/slices/cartSlice";
// import { Header } from "@/components/home/Header";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-[#F9F6F0] pt-36 pb-24 text-[#111111]">
//       <Header />

//       <div className="max-w-7xl mx-auto px-6">
//         {/* Back Button */}
//         <Link
//           href="/product"
//           className="inline-flex items-center gap-2 text-[#626060] hover:text-[#D4AF37] mb-8 transition-colors text-sm font-semibold tracking-wide uppercase"
//         >
//           <ArrowLeft size={16} />
//           <span>Continue Exploring Atelier</span>
//         </Link>

//         <div className="flex items-center justify-between mb-10 border-b border-[#D4AF37]/20 pb-4">
//           <h1 className="text-3xl md:text-4xl font-serif font-light text-[#111111]">
//             Your Selection
//           </h1>
//           <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
//             {cartItems.length} {cartItems.length === 1 ? "Creation" : "Creations"}
//           </span>
//         </div>

//         {cartItems.length === 0 ? (
//           /* EMPTY CART */
//           <div className="bg-white rounded-3xl p-16 md:p-24 text-center shadow-xl shadow-[#111111]/5 border border-[#D4AF37]/30 max-w-2xl mx-auto">
//             <div className="w-16 h-16 bg-[#F9F6F0] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/40 text-[#D4AF37]">
//               <ShoppingBag size={28} />
//             </div>
//             <h2 className="text-2xl font-serif font-light text-[#111111] mb-3">
//               Your bag is currently empty
//             </h2>
//             <p className="text-[#626060] text-sm mb-8 max-w-md mx-auto leading-relaxed">
//               Explore our collection of authentic handmade Moroccan leather goods and select your bespoke piece.
//             </p>
//             <Link
//               href="/product"
//               className="inline-block bg-[#111111] text-[#F9F6F0] px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all shadow-lg"
//             >
//               Discover Collection
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//             {/* LEFT — ITEMS */}
//             <div className="lg:col-span-8 space-y-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 shadow-sm border border-[#D4AF37]/20 transition-all hover:shadow-md"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-[#F9F6F0] shrink-0 border border-gray-100">
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       className="object-contain p-3"
//                     />
//                   </div>

//                   {/* INFO */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <div className="flex justify-between items-start gap-4">
//                         <h3 className="text-lg font-serif font-medium text-[#111111]">
//                           {item.title}
//                         </h3>
//                         <p className="text-lg font-medium text-[#111111]">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                       <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase mt-1">
//                         Full-Grain Leathercraft
//                       </p>
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
//                       <div className="flex items-center gap-2 bg-[#F9F6F0] border border-[#D4AF37]/30 rounded-full p-1">
//                         <button
//                           onClick={() => dispatch(decreaseQty(item.id))}
//                           className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#111111] hover:text-[#D4AF37] transition-all shadow-xs"
//                           aria-label="Decrease quantity"
//                         >
//                           <Minus size={14} />
//                         </button>

//                         <span className="w-8 text-center font-bold text-xs text-[#111111]">
//                           {item.quantity}
//                         </span>

//                         <button
//                           onClick={() => dispatch(increaseQty(item.id))}
//                           className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#111111] hover:text-[#D4AF37] transition-all shadow-xs"
//                           aria-label="Increase quantity"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>

//                       <button
//                         onClick={() => dispatch(removeFromCart(item.id))}
//                         className="text-[#626060] hover:text-red-600 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
//                       >
//                         <Trash2 size={15} />
//                         <span className="hidden sm:inline">Remove</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT — SUMMARY */}
//             <div className="lg:col-span-4">
//               <div className="bg-[#111111] text-[#F9F6F0] rounded-3xl p-8 shadow-2xl sticky top-36 border border-[#D4AF37]/30">
//                 <h2 className="text-xl font-serif font-light mb-6 border-b border-white/10 pb-4 text-[#F9F6F0]">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between text-[#F9F6F0]/80">
//                     <span>Subtotal</span>
//                     <span className="font-medium text-[#F9F6F0]">
//                       ${subtotal.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-[#F9F6F0]/80">
//                     <span>Atelier Express Transit</span>
//                     <span className="text-[#D4AF37] font-bold tracking-wide text-xs">
//                       COMPLIMENTARY
//                     </span>
//                   </div>

//                   <div className="pt-6 mt-6 border-t border-white/10 flex justify-between text-2xl font-serif">
//                     <span>Total</span>
//                     <span className="text-[#D4AF37] font-medium">
//                       ${subtotal.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   className="w-full mt-8 bg-[#D4AF37] text-[#111111] py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg active:scale-[0.98]"
//                 >
//                   Proceed to Checkout
//                 </button>

//                 <div className="flex items-center justify-center gap-2 mt-6 text-[#F9F6F0]/60 text-[11px]">
//                   <ShieldCheck size={14} className="text-[#D4AF37]" />
//                   <span>Encrypted & Guaranteed Checkout</span>
//                 </div>
//               </div>

//               {/* Trust Badge */}
//               <div className="mt-6 p-4 border border-dashed border-[#D4AF37]/40 rounded-2xl text-center bg-white/60">
//                 <p className="text-xs text-[#626060] italic">
//                   Hand-stitched full-grain leather crafted by master Moroccan artisans.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Minus, Trash2, ArrowLeft, ShieldCheck, ShoppingBag } from "lucide-react";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { Header } from "@/components/home/Header";

const getCartItemKey = (item) => `${item.id}__${item.color || ""}__${item.size || ""}`;

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-36 pb-24 text-[#111111]">
      <Header />

      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-[#626060] hover:text-[#D4AF37] mb-8 transition-colors text-sm font-semibold tracking-wide uppercase"
        >
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </Link>

        <div className="flex items-center justify-between mb-10 border-b border-[#D4AF37]/20 pb-4">
          <h1 className="text-3xl md:text-4xl font-serif font-light text-[#111111]">
            Your Cart
          </h1>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* EMPTY CART */
          <div className="bg-white rounded-3xl p-16 md:p-24 text-center shadow-xl shadow-[#111111]/5 border border-[#D4AF37]/30 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#F9F6F0] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/40 text-[#D4AF37]">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-2xl font-serif font-light text-[#111111] mb-3">
              Your bag is currently empty
            </h2>
            <p className="text-[#626060] text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Explore our collection and select your piece.
            </p>
            <Link
              href="/product"
              className="inline-block bg-[#111111] text-[#F9F6F0] px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all shadow-lg"
            >
              Discover Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT — ITEMS */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const key = getCartItemKey(item);
                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 shadow-sm border border-[#D4AF37]/20 transition-all hover:shadow-md"
                  >
                    {/* IMAGE */}
                    <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-[#F9F6F0] shrink-0 border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-lg font-serif font-medium text-[#111111]">
                            {item.title}
                          </h3>
                          <p className="text-lg font-medium text-[#111111]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        {(item.color || item.size) && (
                          <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase mt-1">
                            {[item.color, item.size && `Size ${item.size}`]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-[#F9F6F0] border border-[#D4AF37]/30 rounded-full p-1">
                          <button
                            onClick={() => dispatch(decreaseQty(key))}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#111111] hover:text-[#D4AF37] transition-all shadow-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-8 text-center font-bold text-xs text-[#111111]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => dispatch(increaseQty(key))}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#111111] hover:text-[#D4AF37] transition-all shadow-xs"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => dispatch(removeFromCart(key))}
                          className="text-[#626060] hover:text-red-600 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          <Trash2 size={15} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — SUMMARY */}
            <div className="lg:col-span-4">
              <div className="bg-[#111111] text-[#F9F6F0] rounded-3xl p-8 shadow-2xl sticky top-36 border border-[#D4AF37]/30">
                <h2 className="text-xl font-serif font-light mb-6 border-b border-white/10 pb-4 text-[#F9F6F0]">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-[#F9F6F0]/80">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#F9F6F0]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#F9F6F0]/80">
                    <span>Shipping</span>
                    <span className="text-[#D4AF37] font-bold tracking-wide text-xs">
                      CALCULATED AT CONFIRMATION
                    </span>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex justify-between text-2xl font-serif">
                    <span>Total</span>
                    <span className="text-[#D4AF37] font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full mt-8 bg-[#D4AF37] text-[#111111] py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center gap-2 mt-6 text-[#F9F6F0]/60 text-[11px]">
                  <ShieldCheck size={14} className="text-[#D4AF37]" />
                  <span>Order via WhatsApp — No Online Payment Needed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}