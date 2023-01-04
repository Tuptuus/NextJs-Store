import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/liked/LikedSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
