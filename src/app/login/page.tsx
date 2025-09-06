"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (role: "admin" | "user") => {
    dispatch(
      login({
        role,
        user: { id: "1", name: "Riza", email: "riza@mail.com" },
      })
    );

    // simpan role ke cookie biar middleware bisa baca
    document.cookie = `role=${role}; path=/`;

    // redirect otomatis
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "user") {
      router.push("/customer/products");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <button
        onClick={() => handleLogin("admin")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Login as Admin
      </button>
      <button
        onClick={() => handleLogin("user")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login as Customer
      </button>
    </div>
  );
}
