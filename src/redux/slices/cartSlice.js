// import { createSlice } from "@reduxjs/toolkit";

// // Load cart from localStorage
// const getInitialCart = () => {
//   if (typeof window !== "undefined") {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   }
//   return [];
// };

// const initialState = {
//   items: getInitialCart(), 
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;

//       const existingItem = state.items.find(
//         (i) => i.id === item.id
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...item, quantity: 1 });
//       }

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.id !== action.payload
//       );
//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     increaseQty: (state, action) => {
//       const item = state.items.find(
//         (i) => i.id === action.payload
//       );
//       if (item) item.quantity += 1;
//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     decreaseQty: (state, action) => {
//       const item = state.items.find(
//         (i) => i.id === action.payload
//       );
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cart");
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   increaseQty,
//   decreaseQty,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

// IMPORTANT: initial state must be identical on server and client to avoid
// hydration mismatches. localStorage doesn't exist during server rendering,
// so we can NOT read it here — that caused the server to render "0 items"
// while the client immediately rendered the real count, mismatching.
// Instead, the cart starts empty and gets hydrated from localStorage in a
// useEffect (see CartHydrator component) AFTER the initial mount.
const initialState = {
  items: [],
  hydrated: false, // tracks whether we've loaded from localStorage yet
};

// A product can be added multiple times with different color/size —
// each combination needs to be its own line in the cart, not merged.
// This builds a stable key from id + color + size for matching.
const getCartItemKey = (item) =>
  `${item.id}__${item.color || ""}__${item.size || ""}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const key = getCartItemKey(item);

      const existingItem = state.items.find(
        (i) => getCartItemKey(i) === key
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      // payload is now the cart item key (id__color__size), not just id
      state.items = state.items.filter(
        (item) => getCartItemKey(item) !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => getCartItemKey(i) === action.payload
      );
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => getCartItemKey(i) === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    // Called once, client-side only, after mount — loads whatever was
    // already in localStorage into Redux state without affecting the
    // server-rendered HTML.
    hydrateCart: (state, action) => {
      state.items = action.payload;
      state.hydrated = true;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export const getCartItemKeyUtil = getCartItemKey;

export default cartSlice.reducer;