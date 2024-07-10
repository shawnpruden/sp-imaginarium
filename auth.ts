import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { getUserById } from './lib/utils';

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) return false;

      return true;
    },

    async jwt({ token }) {
      const prismaUser = await prisma.user.findFirst({
        where: { email: token.email },
      });

      if (!prismaUser) {
        const { sub, ...rest } = token;
        rest.id = sub as string;

        return rest;
      }

      if (!prismaUser.username) {
        await prisma.user.update({
          where: {
            id: prismaUser.id,
          },
          data: {
            username: prismaUser.name?.split(' ').join('').toLowerCase(),
          },
        });
      }

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.username,
        picture: prismaUser.image,
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
