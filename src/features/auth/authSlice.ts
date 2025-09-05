import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Role = "guest" | "customer" | "admin";

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  user: { id: string; name: string; email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: "guest",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ role: Role; user: AuthState["user"] }>
    ) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "guest";
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
