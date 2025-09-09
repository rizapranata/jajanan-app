import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import authReducer from "./auth/authSlice";
import { authMiddleware } from "./auth/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
