/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  nick: "",
  email: "",
  uimg: null,
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin || state.isLogin;
      state.userId = action.payload.userId || state.userId;
      state.nick = action.payload.nick || state.nick;
      state.email = action.payload.email || state.email;
      state.uimg = action.payload.uimg || state.uimg;
    },
    reset: (state) => {
      state.nick = "";
      state.userId = "";
      state.email = "";
      state.uimg = null;
      state.isLogin = false;
    }
  },
});

export const { login, reset } = loginSlice.actions;

export default loginSlice.reducer;
