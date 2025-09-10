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

  // 🔒 Admin tidak boleh masuk ke /products/*
  if (role === "admin" && url.pathname.startsWith("/products")) {
    url.pathname = "/";
    return NextResponse.redirect(url.toString());
  }

  // 🔒 User tidak boleh masuk ke /admin/*
  if (role === "user" && url.pathname.startsWith("/admin")) {
    url.pathname = "/";
    return NextResponse.redirect(url.toString());
  }

  // 👤 Guest (belum login) tidak boleh masuk /admin/* atau /products/*
  if (role === "guest") {
    if (url.pathname.startsWith("/admin")) {
      url.pathname = "/";
      url.searchParams.set("debug-role", role);
      return NextResponse.redirect(url.toString());
    }
  }

  return res; // pakai res yang sudah diberi header
}

export const config = {
  matcher: ["/admin/:path*", "/products/:path*", "/profile/:path*"],
};
