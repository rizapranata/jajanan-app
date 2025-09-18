import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || "guest";
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // Kalau tidak ada token → redirect ke /login
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // default response (inject header debug)
  const res = NextResponse.next();
  if (process.env.NEXT_PUBLIC_ENV === "development") {
    res.headers.set("x-debug-role", role);
    res.headers.set("x-debug-path", url.pathname);
  }

  // 🔒 User tidak boleh masuk ke /users/*
  if (role === "user" && url.pathname.startsWith("/users")) {
    url.pathname = "/";
    return NextResponse.redirect(url.toString());
  }

  // 👤 Guest (belum login) tidak boleh masuk /admin/* atau /products/*
  if (
    role === "guest" &&
    (url.pathname.startsWith("/admin") || url.pathname.startsWith("/profile"))
  ) {
    url.pathname = "/";
    url.searchParams.set("debug-role", role);
    return NextResponse.redirect(url.toString());
  }

  if (role === "guest" && url.pathname.startsWith("/users")) {
    url.pathname = "/";
    url.searchParams.set("debug-role", role);
    return NextResponse.redirect(url.toString());
  }

  return res; // pakai res yang sudah diberi header
}

// tambahkan matcher untuk path yang butuh proteksi
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/profile",
    "/profile/:path*",
    "/users/:path*",
    "/manage-product/:path*",
    "/users",
  ],
};
