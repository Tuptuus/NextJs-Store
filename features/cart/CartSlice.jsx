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
      let found = false;
      const items = JSON.parse(localStorage.getItem("cartList"));
      if (items === null) {
        state.cartIDs = state.cartIDs.concat(action.payload);
        localStorage.setItem("cartList", JSON.stringify(state.cartIDs));
      } else {
        items.forEach((item) => {
          if (item.id == action.payload.id) {
            item.qty = item.qty + 1;
            state.cartIDs = items;
            localStorage.setItem("cartList", JSON.stringify(items));
            found = true;
          }
        });
        if (!found) {
          state.cartIDs = state.cartIDs.concat(action.payload);
          localStorage.setItem("cartList", JSON.stringify(state.cartIDs));
        }
      }
    },
    removeFromCart: (state, action) => {
      const items = JSON.parse(localStorage.getItem("cartList"));
      const newItems = items.filter((item) => item.id !== action.payload);
      state.cartIDs = newItems;
      localStorage.setItem("cartList", JSON.stringify(newItems));
    },
    changeItemQty: (state, action) => {
      const items = JSON.parse(localStorage.getItem("cartList"));
      items.forEach((item) => {
        if (item.id == action.payload.id) {
          item.qty = action.payload.qty;
        }
      });
      state.cartIDs = items;
      localStorage.setItem("cartList", JSON.stringify(items));
    },
  },
});

export const { addToCart, removeFromCart, changeItemQty } = cartSlice.actions;

export default cartSlice.reducer;
