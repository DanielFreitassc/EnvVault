import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./services/secure/publicRoutes";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (/^\/(_next|static|api|favicon\.ico)/.test(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("token")?.value;

  const isAuth = !!accessToken;

  if (!isAuth && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/" && isAuth) {
    return NextResponse.redirect(new URL("/envs", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
