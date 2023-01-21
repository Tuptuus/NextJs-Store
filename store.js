import { configureStore } from "@reduxjs/toolkit";
import likedReducer from "./features/liked/LikedSlice";
import cartReducer from "./features/cart/CartSlice";
import userReducer from "./features/login/loginSlice";

export const store = configureStore({
  reducer: {
    likedProds: likedReducer,
    cartProds: cartReducer,
    user: userReducer,
  },
});
