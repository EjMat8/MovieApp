import { createSlice } from "@reduxjs/toolkit";

const authInit = {
  isLoggedIn: false,
  isGuest: false,
  sessionID: "",
  expiresAt: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    signIn(state, action) {
      state.isLoggedIn = true;
      state.isGuest = action.payload.isGuest;
      state.sessionID = action.payload.sessionID;
      state.expiresAt = action.payload.expiresAt;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.isGuest = false;
      state.sessionID = "";
      state.expiresAt = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
