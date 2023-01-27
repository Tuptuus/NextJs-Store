import { createSlice } from "@reduxjs/toolkit";
let initalLikedProds = [];
if (typeof window !== "undefined") {
  initalLikedProds = JSON.parse(localStorage.getItem("shopList"));
}

console.log(initalLikedProds);

if (initalLikedProds === null) {
  initalLikedProds = [];
  localStorage.setItem("shopList", JSON.stringify([]));
}

const initialState = {
  likedIDs: initalLikedProds,
};

export const likedSlice = createSlice({
  name: "likedProds",
  initialState,
  reducers: {
    addToLiked: (state, action) => {
      console.log(state.likedIDs);
      if (state.likedIDs.includes(action.payload)) {
        return;
      } else {
        state.likedIDs = state.likedIDs.concat(action.payload);
        localStorage.setItem("shopList", JSON.stringify(state.likedIDs));
      }
    },
    removeFromLiked: (state, action) => {
      const newIDs = state.likedIDs.filter((id) => id !== action.payload);
      state.likedIDs = newIDs;
      localStorage.setItem("shopList", JSON.stringify(state.likedIDs));
    },
  },
});

export const { addToLiked, removeFromLiked } = likedSlice.actions;

export default likedSlice.reducer;
