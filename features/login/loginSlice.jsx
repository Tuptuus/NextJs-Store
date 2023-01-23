import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
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
    registerUser: async (state, action) => {
      await createUserWithEmailAndPassword(
        auth,
        action.payload.email,
        action.payload.pass
      );
      await updateProfile(auth.currentUser, {
        displayName: action.payload.nick,
      });
      console.log(auth.currentUser);
      // state.user = auth.currentUser;
    },
    logout: () => {
      signOut(auth);
    },
    setCurrentUser: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
  },
});

export const { registerUser, setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
