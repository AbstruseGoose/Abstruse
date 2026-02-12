import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { env } from "@/lib/env";
import { isAdmin } from "@/lib/rbac";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/api/admin") || pathname.startsWith("/auth/change-password") || pathname.startsWith("/api/auth/change-password")) {
    const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });

    if (!token) {
      const signInUrl = new URL("/auth/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }

    const mustChangePassword = Boolean(token.mustChangePassword);
    const isPasswordRoute = pathname.startsWith("/auth/change-password") || pathname.startsWith("/api/auth/change-password");
    if (mustChangePassword && !isPasswordRoute) {
      const changeUrl = new URL("/auth/change-password", request.url);
      return NextResponse.redirect(changeUrl);
    }

    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      if (!isAdmin(token.role as string | undefined)) {
        const portalUrl = new URL("/portal", request.url);
        return NextResponse.redirect(portalUrl);
      }

      const needsMfa = isAdmin(token.role as string | undefined) && !token.mfaEnabled;
      const isMfaRoute = pathname.startsWith("/admin/mfa") || pathname.startsWith("/api/admin/mfa");

      if (needsMfa && !isMfaRoute) {
        const mfaUrl = new URL("/admin/mfa", request.url);
        return NextResponse.redirect(mfaUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/api/admin/:path*",
    "/auth/change-password",
    "/api/auth/change-password",
  ]
};
