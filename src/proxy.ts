/**
 * Proxy (Next.js 16 — formerly Middleware).
 * Performs optimistic auth checks: redirects unauthenticated users
 * away from /admin routes to /login.
 */

import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("perkins_session")?.value;
  const session = await decrypt(token);

  if (!session?.userId) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
