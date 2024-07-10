import prisma from '@/lib/prisma';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AuthFormSchemas } from './schemas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthFormConfig(mode: 'login' | 'signUp' | 'forgotPassword') {
  switch (mode) {
    case 'login':
      return {
        schema: AuthFormSchemas.login,
        desc: "Don't have an account?",
        href: '/sign-up',
        linkLabel: 'Sign Up',
      };

    case 'signUp':
      return {
        schema: AuthFormSchemas.signUp,
        desc: 'Have an account?',
        href: '/login',
        linkLabel: 'Login',
      };

    case 'forgotPassword':
      return {
        schema: AuthFormSchemas.forgotPassword,
        href: '/sign-up',
        linkLabel: 'Create new account',
      };

    default:
      break;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserById(id?: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
