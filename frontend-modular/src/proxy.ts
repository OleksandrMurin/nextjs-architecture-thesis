import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PAGES = ["/my-posts", "/new-post"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const isAuth = Boolean(accessToken);

  const isProtected = PROTECTED_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const isAuthPage = AUTH_PAGES.includes(pathname);
  if (isAuthPage && isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/my-posts";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-posts/:path*", "/new-post/:path*", "/login", "/register"],
};
