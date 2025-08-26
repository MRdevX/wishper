import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib';

const PROTECTED_ROUTES = [
  ROUTES.dashboard,
  ROUTES.profile,
  ROUTES.settings,
  ROUTES.wishes,
  ROUTES.wishlists,
];

const ADMIN_ROUTES = [
  ROUTES.admin.root,
  ROUTES.admin.users,
  ROUTES.admin.wishes,
  ROUTES.admin.wishlists,
  ROUTES.admin.settings,
];

const PUBLIC_ROUTES = [ROUTES.home, ROUTES.auth];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));

  const isPublicRoute = PUBLIC_ROUTES.some(
    route => pathname === route || pathname.startsWith(route)
  );

  const accessToken =
    request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (isProtectedRoute && !accessToken) {
    const authUrl = new URL(ROUTES.auth, request.url);
    authUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(authUrl);
  }

  if (isAdminRoute) {
    if (!accessToken) {
      const authUrl = new URL(ROUTES.auth, request.url);
      authUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(authUrl);
    }
  }

  if (isPublicRoute && pathname === ROUTES.auth && accessToken) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
