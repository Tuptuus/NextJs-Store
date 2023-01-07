import { createSlice } from "@reduxjs/toolkit";
let initalCartProds = [];
if (typeof window !== "undefined") {
  initalCartProds = JSON.parse(localStorage.getItem("cartList"));
}

if (initalCartProds === null) {
  initalCartProds = [];
}

const initialState = {
  cartIDs: initalCartProds,
};

export const cartSlice = createSlice({
  name: "cartProds",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartIDs = state.cartIDs.concat(action.payload);
      localStorage.setItem("cartList", JSON.stringify(state.cartIDs));
    },
    removeFromCart: (state, action) => {
      const newIDs = state.cartIDs.filter((id) => id !== action.payload);
      state.cartIDs = newIDs;
      localStorage.setItem("cartList", JSON.stringify(state.cartIDs));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
