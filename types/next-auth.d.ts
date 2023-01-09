import { StaticImageData } from './image';

export type TUserRole = 0 | 1 | 2;
interface IUser {}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface DefaultJWT {
    user: {
      id: number;
      email: string;
      role: TUserRole;
      name: string;
      image: string | StaticImageData;
      address: string;
      accessToken: string;
      isEnrolled: boolean;
      isEmailVerified: boolean;
      providerId: string;
      enrolledAt: string;
      updatedAt: string;
    };
  }
  interface Session {
    user: {
      id: number;
      accessToken: string;
      email: string;
      role: TUserRole;
      name: string;
      image: string | StaticImageData;
      address: string;
      isEnrolled: boolean;
      isEmailVerified: boolean;
      providerId: string;
      enrolledAt: string;
      updatedAt: string;
    };
  }
  interface User {
    id: number;
    email: string;
    role: TUserRole;
    name: string;
    image: string | StaticImageData;
    accessToken: string;
    address: string;
    isEnrolled: boolean;
    isEmailVerified: boolean;
    providerId: string;
    enrolledAt: string;
    updatedAt: string;
  }
  interface JWT {
    user: User;
  }
}
