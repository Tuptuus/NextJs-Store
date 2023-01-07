import { configureStore } from "@reduxjs/toolkit";
import likedReducer from "./features/liked/LikedSlice";
import cartReducer from "./features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    likedProds: likedReducer,
    cartProds: cartReducer,
  },
});
