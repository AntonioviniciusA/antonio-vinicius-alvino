import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "auth_token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/projetos/adcionar-projeto") ||
    pathname.startsWith("/profile");

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Cookie existe, permite acesso (validação JWT será feita nas páginas)
  console.log("🔐 Cookie de auth encontrado para:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/projetos/adcionar-projeto/:path*", "/profile/:path*"],
};
