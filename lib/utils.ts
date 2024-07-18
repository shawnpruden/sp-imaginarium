import prisma from '@/lib/prisma';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AuthFormSchemas } from './schemas';
import { v4 as uuidv4 } from 'uuid';

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
      return {};
  }
}

// * user-related
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

// * verificationToken-related
export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// * tokens-related
export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // in one hour

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
}
