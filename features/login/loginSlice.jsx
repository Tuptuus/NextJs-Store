import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase-config";
let initialUser = null;

if (typeof window !== "undefined") {
  initialUser = auth.currentUser;
}

const initialState = {
  user: initialUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
