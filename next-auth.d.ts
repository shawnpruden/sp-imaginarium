import type { JWT } from 'next-auth/jwt';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username?: string | null;
  }
}

declare module 'next-auth' {
  interface User {
    username?: string | null;
  }
  interface Session {
    user: User & DefaultSession['user'];
  }
}
