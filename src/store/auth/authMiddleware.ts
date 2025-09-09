import { Middleware } from "@reduxjs/toolkit";
import { setCredentials, clearAuth, updateUser } from "./authSlice";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== "undefined") {
    if (setCredentials.match(action)) {
      const { user, token } = action.payload;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }

    if (clearAuth.match(action)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    if (updateUser.match(action)) {
      const state = store.getState().auth;
      if (state.user) {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    }
  }

  return result;
};
