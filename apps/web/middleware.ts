import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(ADMIN_PREFIX)) {
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
