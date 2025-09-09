"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { clearAuth, setCredentials } from "../../store/auth/authSlice";
import LoadingScreen from "../LoadingScreen";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        dispatch(setCredentials({ token, user: JSON.parse(user) }));
      } else {
        dispatch(clearAuth());
      }
    } catch {
      dispatch(clearAuth());
    } finally {
      setInitialized(true);
    }
  }, [dispatch]);

  // 🚀 Selama belum init, jangan render children (hindari hydration mismatch)
  if (!initialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
