import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, navigationRoutes } from './constants/Navigation';

export async function middleware(req: NextRequest) {
  const { nextFolder } = {
    nextFolder: '/_next',
  };

  if (!req.nextUrl.pathname.startsWith(nextFolder)) {
    const session: any = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const isTryingToAccessAuthenticationRoute: boolean = req.nextUrl.pathname.localeCompare(authRoutes.signIn.url) === 0;

    if (isTryingToAccessAuthenticationRoute) {
      if (session) {
        return NextResponse.redirect(new URL(navigationRoutes.home.url, req.url));
      }
    }
    return NextResponse.next();
  }
}
