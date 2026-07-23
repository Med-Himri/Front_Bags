import { configureStore } from "@reduxjs/toolkit";
import adminSlice  from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
      admin: adminSlice,
      cart: cartReducer,
    },
  });
  
  export default store;
  