'use server';

import { signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { AuthFormSchemas } from './schemas';
import { getUserByEmail } from './utils';

export const login = async (values: z.infer<typeof AuthFormSchemas.login>) => {
  const validatedFields = AuthFormSchemas.login.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'AccessDenied') {
        return { error: 'Please verify your email address before logging in.' };
      }

      return {
        error:
          'The email address or password you entered is incorrect. Please try again.',
      };
    }

    throw error;
  }

  return { success: 'Verification email sent' };
};

export const signUp = async (
  values: z.infer<typeof AuthFormSchemas.signUp>
) => {
  const validatedFields = AuthFormSchemas.signUp.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { email, password } = validatedFields.data;
  const name = email.split('@')[0];
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'This email address already exists.' };

  await prisma.user.create({ data: { name, email, password: hashedPassword } });

  // todo: send verification email
  return { success: 'User created' };
};

export const forgotPassword = async (
  values: z.infer<typeof AuthFormSchemas.forgotPassword>
) => {
  const validatedFields = AuthFormSchemas.login.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  return { success: 'Verification email sent' };
};
