import NextAuth, { Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';
import { authRoutes } from '../../../constants/Navigation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const nextAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const maxAge: number = 60 * 60 * 168 * 4; // expires after 28 days
  let currentUser: User | null = null;

  return NextAuth(req, res, {
    providers: [
      Credentials({
        name: 'credentials',
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
        },
        async authorize(credentials: any) {
          const { email, password } = credentials!;
          try {
            const [user]: any[] = await prisma.user.findMany({
              where: { email },
            });

            if (!user) {
              return null;
            }

            const validatePassword = await bcrypt.compare(password, user.password);
            if (!validatePassword) {
              return null;
            }

            const accessToken: string = jwt.sign(
              user,
              process.env.JWT_SECRET_TOKEN as string,
              { expiresIn: 60 * 60 * 168 * 4 } // 30 days
            );
            currentUser = { ...user, firstName: user.first_name, lastName: user.last_name, accessToken } as User;
            return currentUser;
          } catch (error: any) {
            return null;
          }
        },
      }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge,
    },
    jwt: {
      secret: process.env.NEXT_AUTH_SECRET,
      maxAge,
    },
    callbacks: {
      /**
       * JWT function runs one time when sign in happens
       * The token from here is used at getToken function in middleware
       */
      async jwt({ token, account, user }) {
        if (account) {
          token.user = user;
        }
        return token;
      },

      /**
       * Session function runs everytime a page is requested, every 10 minutes (declared in provider) and at window visibility change
       * The user is checked on BE and if something has changed, it updates the session object
       * The token user object is set for getToken function that runs in middleware
       */
      async session({ session, token }) {
        const { accessToken, id } = token.user as User;

        if (session.user) {
          try {
            const [user]: any[] = await prisma.user.findMany({
              where: { id },
            });
            const isJWTValid = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN as string);

            if (isJWTValid) {
              currentUser = user;
              return {
                ...user,
                accessToken,
                firstName: user.first_name,
                lastName: user.last_name,
              } as Session;
            }
          } catch (e: any) {
            return session;
          }
        }
        return session;
      },
    },
    pages: {
      signIn: authRoutes.signIn.url,
      error: authRoutes.signIn.url,
    },
  });
};

export default nextAuth;
