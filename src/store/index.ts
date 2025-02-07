import { configureStore } from "@reduxjs/toolkit";
// import { RootReducer } from "./slices";
import { authApi } from "@api/auth-api";
import authSlice from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
