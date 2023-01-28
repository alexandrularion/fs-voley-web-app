import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { USER_ROLE } from './constants/Enums';
import { authRoutes, navigationRoutes } from './constants/Navigation';

export async function middleware(req: NextRequest) {
  const { nextFolder } = {
    nextFolder: '/_next',
  };

  if (!req.nextUrl.pathname.startsWith(nextFolder)) {
    const session: any = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const isTryingToAccessAuthenticationRoute: boolean = req.nextUrl.pathname.localeCompare(authRoutes.signIn.url) === 0;
    const isTryingToAccessAdminRoute: boolean = req.nextUrl.pathname.includes('/a/');

    if (isTryingToAccessAuthenticationRoute) {
      if (session) {
        return NextResponse.redirect(new URL(navigationRoutes.home.url, req.url));
      }
    }
    if (isTryingToAccessAdminRoute) {
      if (!session && session?.user?.role !== USER_ROLE.ADMIN) {
        return NextResponse.redirect(new URL(navigationRoutes.home.url, req.url));
      }
    }
    return NextResponse.next();
  }
}
