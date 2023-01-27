import { createSlice } from "@reduxjs/toolkit";
let initalCartProds = [];
if (typeof window !== "undefined") {
  initalCartProds = JSON.parse(localStorage.getItem("cartList"));
}

if (initalCartProds === null) {
  initalCartProds = [];
  localStorage.setItem("cartList", JSON.stringify([]));
}

const initialState = {
  cartIDs: initalCartProds,
  summaryPrice: 0,
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
            item.qty = item.qty + action.payload.qty;
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
    setSummaryPrice: (state, action) => {
      state.summaryPrice = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, changeItemQty, setSummaryPrice } =
  cartSlice.actions;

export default cartSlice.reducer;
