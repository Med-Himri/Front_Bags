"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateCart } from "@/redux/slices/cartSlice";

// Renders nothing — just runs once after mount to load the cart from
// localStorage into Redux. Runs client-side only, after the initial
// server-rendered HTML has already matched (empty cart), so there's no
// hydration mismatch. The cart badge/items will "pop in" a moment after
// page load instead of being there on first paint — this is expected and
// unavoidable with localStorage-backed state in SSR apps.
export function CartHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        dispatch(hydrateCart(JSON.parse(stored)));
      } catch (err) {
        console.error("Failed to parse stored cart:", err);
      }
    }
  }, [dispatch]);

  return null;
}