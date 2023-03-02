import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import loginReducer from "../slice/loginSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  version: 1,
};

const rootReducer = combineReducers({
  loginState: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
