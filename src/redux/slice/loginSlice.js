/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  nick: "",
  email: "",
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.userId = action.payload.userId;
      state.nick = action.payload.nick;
      state.email = action.payload.email;
    },
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
