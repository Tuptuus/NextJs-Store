import { createSlice } from "@reduxjs/toolkit";
let initalUser = null;

const initialState = {
  user: initalUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log("działa");
    },
  },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
