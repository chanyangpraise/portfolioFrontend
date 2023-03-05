import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import loginReducer from "../slice/loginSlice";
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    ProfileUserEmail: null,
    userProfileImg: null
  },
  reducers: {
    setProfileUserEmail(state, action) {
      state.ProfileUserEmail = action.payload;
    },
    setUserProfileImg(state, action) {
      state.userProfileImg = action.payload;
    }
  }
});

export const { setProfileUserEmail, setUserProfileImg } = profileSlice.actions;

//solbin - editorBid 값 전달
const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    editorBid: null
  },
  reducers: {
    setEditorBid(state, action) {
      state.editorBid = action.payload;
    }
  }
});

export const { setEditorBid } = editorSlice.actions;


const persistConfig = {
  key: "root",
  storage: storageSession,
  version: 1,
};


const rootReducer = combineReducers({
  loginState: loginReducer,
  editorState: editorSlice.reducer,
  profileState: profileSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
