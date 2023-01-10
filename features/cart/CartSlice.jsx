import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
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
      const newIDs = state.cartIDs.filter((id) => id !== action.payload);
      state.cartIDs = newIDs;
      localStorage.setItem("cartList", JSON.stringify(state.cartIDs));
    },
    setNewState: (state, action) => {
      state.cartIDs == action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setNewState } = cartSlice.actions;

export default cartSlice.reducer;
