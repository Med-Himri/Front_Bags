"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Zap } from "lucide-react";
import { addToCart } from "@/redux/slices/cartSlice";

// Same composite key cartSlice uses (id + color + size)
const getCartItemKey = (id, color, size) => `${id}__${color || ""}__${size || ""}`;

/**
 * "Buy Now": makes sure the product (with the selected variant) is in the
 * cart, then goes straight to /checkout where the customer enters their
 * details and the order is sent via WhatsApp.
 */
export default function BuyNowButton({ product, selectedVariant, disabled }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const color = selectedVariant?.color || "";
  const size = selectedVariant?.size || "";
  const cartKey = getCartItemKey(product._id, color, size);

  const alreadyInCart = useSelector((state) =>
    state.cart.items.some(
      (item) => `${item.id}__${item.color || ""}__${item.size || ""}` === cartKey
    )
  );

  const isOutOfStock = product.stock !== "in_stock";
  const isDisabled = isOutOfStock || disabled;

  const handleBuyNow = () => {
    // Don't add a second unit if the customer already added it to the cart
    if (!alreadyInCart) {
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
    }
    router.push("/checkout");
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={isDisabled}
      className="w-full bg-gradient-to-r from-[#C9A24B] to-[#E0BE6A] text-[#111111]
        disabled:opacity-50 disabled:cursor-not-allowed py-4 px-8 rounded-xl font-bold text-xs
        uppercase tracking-widest hover:shadow-[0_6px_20px_rgba(201,162,75,0.5)] hover:-translate-y-0.5
        active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3
        shadow-md cursor-pointer"
    >
      <Zap size={18} />
      <span>Buy Now</span>
    </button>
  );
}