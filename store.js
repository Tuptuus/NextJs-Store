import { configureStore } from "@reduxjs/toolkit";
import likedReducer from "./features/liked/LikedSlice";

export const store = configureStore({
  reducer: {
    likedProds: likedReducer,
  },
});
