// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { ShoppingCart, Plus, Minus } from "lucide-react";
// import {
//   addToCart,
//   increaseQty,
//   decreaseQty,
// } from "@/redux/slices/cartSlice";

// /* ================= Types ================= */
// /**
//  * @typedef {{ url?: string, alt?: string }} MainImage
//  */

// /**
//  * @typedef {{
//  *   _id: string,
//  *   title: string,
//  *   price: number,
//  *   discountPrice?: number,
//  *   mainImage?: MainImage,
//  *   slug: string,
//  *   stock?: "in_stock" | "out_of_stock" | string,
//  * }} Product
//  */

// /**
//  * @typedef {{
//  *   id: string,
//  *   title: string,
//  *   price: number,
//  *   image?: string,
//  *   slug: string,
//  *   quantity: number,
//  * }} CartItem
//  */

// /**
//  * @param {{ product: Product }} props
//  */
// export default function AddToCartButton({ product }) {
//   const dispatch = useDispatch();

//   // Get item from cart
//   const cartItem = useSelector((state) =>
//     state.cart.items.find((item) => item.id === product._id)
//   );

//   const handleAdd = () => {
//     dispatch(
//       addToCart({
//         id: product._id,
//         title: product.title,
//         price: product.discountPrice || product.price,
//         image: product.mainImage?.url,
//         slug: product.slug,
//       })
//     );
//   };

//   const increase = () => dispatch(increaseQty(product._id));
//   const decrease = () => dispatch(decreaseQty(product._id));

//   /* ================= UI: Item in Cart ================= */
//   if (cartItem) {
//     return (
//       <div className="w-full bg-[#F9F6F0] rounded-xl p-3 border border-[#D4AF37]/20 flex items-center justify-between">
//         {/* Decrease Button */}
//         <button
//           type="button"
//           onClick={decrease}
//           className="w-11 h-11 rounded-xl bg-white border border-[#D4AF37]/30 text-[#111111]
//             flex items-center justify-center hover:bg-[#111111] hover:text-[#F9F6F0] hover:border-[#111111]
//             transition-all duration-200 cursor-pointer shadow-xs"
//           aria-label="Decrease quantity"
//         >
//           <Minus size={18} />
//         </button>

//         {/* Quantity Display */}
//         <div className="text-center px-4">
//           <div className="text-lg font-serif font-bold text-[#111111]">
//             {cartItem.quantity} {cartItem.quantity === 1 ? "Piece" : "Pieces"}
//           </div>
//           <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
//             In Selection
//           </div>
//         </div>

//         {/* Increase Button */}
//         <button
//           type="button"
//           onClick={increase}
//           className="w-11 h-11 rounded-xl bg-[#111111] text-[#F9F6F0] border border-[#D4AF37]/40
//             flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37]
//             transition-all duration-200 cursor-pointer shadow-xs"
//           aria-label="Increase quantity"
//         >
//           <Plus size={18} />
//         </button>
//       </div>
//     );
//   }

//   /* ================= UI: Default Add To Cart ================= */
//   const isOutOfStock = product.stock !== "in_stock";

//   return (
//     <button
//       type="button"
//       onClick={handleAdd}
//       disabled={isOutOfStock}
//       className="w-full bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed
//         text-[#F9F6F0] py-4 px-8 rounded-xl font-bold text-xs uppercase tracking-widest
//         border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37]
//         transition-all duration-300 flex items-center justify-center gap-3 shadow-md cursor-pointer"
//     >
//       <ShoppingCart size={18} className="text-[#D4AF37] group-hover:text-[#111111]" />
//       <span>{isOutOfStock ? "Out of Stock" : "Acquire Artifact"}</span>
//     </button>
//   );
// }

"use client";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "@/redux/slices/cartSlice";

/* ================= Types ================= */
/**
 * @typedef {{ url?: string, alt?: string }} MainImage
 */

/**
 * @typedef {{
 *   _id: string,
 *   title: string,
 *   price: number,
 *   discountPrice?: number,
 *   mainImage?: MainImage,
 *   slug: string,
 *   stock?: "in_stock" | "out_of_stock" | string,
 * }} Product
 */

/**
 * @typedef {{ _id: string, color?: string, size?: string, stock: number, available?: boolean }} Variant
 */

/**
 * Builds the same composite key cartSlice uses internally, so this
 * component's useSelector lookup matches what's actually in the store.
 */
const getCartItemKey = (id, color, size) => `${id}__${color || ""}__${size || ""}`;

/**
 * @param {{ product: Product, selectedVariant?: Variant, disabled?: boolean }} props
 */
export default function AddToCartButton({ product, selectedVariant, disabled }) {
  const dispatch = useDispatch();

  const color = selectedVariant?.color || "";
  const size = selectedVariant?.size || "";
  const cartKey = getCartItemKey(product._id, color, size);

  // Get item from cart — matches on product + variant, not just product id
  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (item) => `${item.id}__${item.color || ""}__${item.size || ""}` === cartKey
    )
  );

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.discountPrice || product.price,
        image: product.mainImage?.url,
        slug: product.slug,
        color,
        size,
      })
    );
  };

  const increase = () => dispatch(increaseQty(cartKey));
  const decrease = () => dispatch(decreaseQty(cartKey));

  /* ================= UI: Item in Cart ================= */
  if (cartItem) {
    return (
      <div className="w-full bg-[#F9F6F0] rounded-xl p-3 border border-[#D4AF37]/20 flex items-center justify-between">
        {/* Decrease Button */}
        <button
          type="button"
          onClick={decrease}
          className="w-11 h-11 rounded-xl bg-white border border-[#D4AF37]/30 text-[#111111]
            flex items-center justify-center hover:bg-[#111111] hover:text-[#F9F6F0] hover:border-[#111111]
            transition-all duration-200 cursor-pointer shadow-xs"
          aria-label="Decrease quantity"
        >
          <Minus size={18} />
        </button>

        {/* Quantity Display */}
        <div className="text-center px-4">
          <div className="text-lg font-serif font-bold text-[#111111]">
            {cartItem.quantity} {cartItem.quantity === 1 ? "Piece" : "Pieces"}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
            In Selection
          </div>
        </div>

        {/* Increase Button */}
        <button
          type="button"
          onClick={increase}
          className="w-11 h-11 rounded-xl bg-[#111111] text-[#F9F6F0] border border-[#D4AF37]/40
            flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37]
            transition-all duration-200 cursor-pointer shadow-xs"
          aria-label="Increase quantity"
        >
          <Plus size={18} />
        </button>
      </div>
    );
  }

  /* ================= UI: Default Add To Cart ================= */
  // A product with variants that hasn't had one selected yet is blocked
  // via the `disabled` prop passed down from ProductPurchaseBox — separate
  // from the base out-of-stock check.
  const isOutOfStock = product.stock !== "in_stock";
  const isDisabled = isOutOfStock || disabled;

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isDisabled}
      className="w-full bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed
        text-[#F9F6F0] py-4 px-8 rounded-xl font-bold text-xs uppercase tracking-widest
        border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37]
        transition-all duration-300 flex items-center justify-center gap-3 shadow-md cursor-pointer"
    >
      <ShoppingCart size={18} className="text-[#D4AF37] group-hover:text-[#111111]" />
      <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
    </button>
  );
}