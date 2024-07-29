'use server';

import { auth, signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sendPasswordResetEmail, sendVerificationEmail } from './mail';
import {
  AuthFormSchemas,
  CreatePostFormSchema,
  DeletePostFormSchema,
  LikeSchema,
  ResetPasswordSchema,
} from './schemas';
import {
  generateResetPasswordToken,
  generateVerificationToken,
  getResetPasswordTokenByToken,
  getUserByEmail,
  getVerificationTokenByToken,
} from './utils';

async function getUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  return userId;
}

// * authentication
export const login = async (values: z.infer<typeof AuthFormSchemas.login>) => {
  const validatedFields = AuthFormSchemas.login.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Verification email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'AccessDenied') {
        return {
          error: 'Please verify your email address before logging in.',
        };
      }

      return {
        error:
          'The email address or password you entered is incorrect. Please try again.',
      };
    }

    throw error;
  }

  return { success: 'Verification email sent!' };
};

export const signUp = async (
  values: z.infer<typeof AuthFormSchemas.signUp>
) => {
  const validatedFields = AuthFormSchemas.signUp.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { email, password } = validatedFields.data;
  const name = email.split('@')[0];
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'This email address already exists.' };

  await prisma.user.create({ data: { name, email, password: hashedPassword } });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Verification email sent!' };
};

export const forgotPassword = async (
  values: z.infer<typeof AuthFormSchemas.forgotPassword>
) => {
  const validatedFields = AuthFormSchemas.forgotPassword.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid email!' };

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: 'Email not found!' };

  const passwordResetToken = await generateResetPasswordToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Password reset email sent!' };
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: 'Token not found!' };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) return { error: 'Invalid token!' };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: 'Password updated!' };
};

export const verifyToken = async (token: string | null) => {
  if (!token) return { error: 'Token not found!' };

  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: 'Token does not exist!' };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: 'Token has expired!' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: 'Email does not exist!' };

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date() }, // in case that user changes the email in settings
  });
  await prisma.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: 'Email verified!' };
};

// * posting
export const createPost = async (
  values: z.infer<typeof CreatePostFormSchema>
) => {
  const userId = await getUserId();
  if (!userId) return { error: 'You must be signed in to use this feature.' };

  const validatedFields = CreatePostFormSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { fileUrl, caption } = validatedFields.data;

  try {
    await prisma.post.create({
      data: { fileUrl, caption, user: { connect: { id: userId } } },
    });

    revalidatePath('/dashboard');
    return { success: 'Post created!' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to create post. Please try again later.' };
  }
};

export async function deletePost(formData: FormData) {
  const userId = await getUserId();
  if (!userId) return { error: 'You must be signed in to use this feature.' };

  const validatedFields = DeletePostFormSchema.safeParse({
    id: formData.get('id'),
  });
  if (!validatedFields.success) return { error: 'Something went wrong!' };

  const { id } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!post) return { error: 'Post not found!' };

  try {
    await prisma.post.delete({ where: { id } });

    revalidatePath('/dashboard');
    return { success: 'Post deleted!' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete post. Please try again later.' };
  }
}

export async function likePost(formData: FormData) {
  const userId = await getUserId();
  if (!userId) return { error: 'You must be signed in to use this feature.' };

  const validatedFields = LikeSchema.safeParse({
    postId: formData.get('postId'),
  });
  if (!validatedFields.success) return { error: 'Something went wrong!' };

  const { postId } = validatedFields.data;

  const post = prisma.post.findUnique({ where: { id: postId } });
  if (!post) return { error: 'Post not found!' };

  const like = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (like) {
    try {
      console.log('delete', postId, userId);
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      revalidatePath('/dashboard');
      return {};
    } catch (error) {
      return { error: 'Something went wrong!' };
    }
  }

  try {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
}
