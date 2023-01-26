export type TUserRole = 1 | 2; // 1 - Administrator / 2 - Content Creator
export type TUserStatus = 0 | 1; // 0 - inactive / 1- active
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
      status: TUserStatus;
      accessToken: string;
      createAt: string;
      updatedAt: string;
    };
  }
  interface Session {
    id: number;
    email: string;
    role: TUserRole;
    name: string;
    status: TUserStatus;
    accessToken: string;
    createAt: string;
    updatedAt: string;
  }
  interface User {
    id: number;
    email: string;
    role: TUserRole;
    name: string;
    status: TUserStatus;
    accessToken: string;
    createAt: string;
    updatedAt: string;
  }
  interface JWT {
    user: User;
  }
}
