import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || "guest";
  const url = req.nextUrl.clone();

  // Admin hanya boleh ke /admin/*
  if (role === "admin" && url.pathname.startsWith("/customer")) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // User hanya boleh ke /customer/*
  if (role === "user" && url.pathname.startsWith("/admin")) {
    url.pathname = "/customer/products";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
