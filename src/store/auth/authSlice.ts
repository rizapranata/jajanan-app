import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./login.types";

const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const userFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

interface AuthState {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserType | null; token: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    rehydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("token");
          const user = localStorage.getItem("user");

          state.token = token;
          state.user = user ? JSON.parse(user) : null;
          state.isAuthenticated = !!token;
        } catch (err) {
          console.error("Failed to rehydrate auth", err);
        }
      }
    },
  },
});

export const { setCredentials, clearAuth, updateUser, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
