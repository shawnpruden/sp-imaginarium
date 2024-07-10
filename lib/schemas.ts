import { z } from 'zod';

// * posts
export const PostsSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
});

export const CreatePostFormSchema = PostsSchema.omit({ id: true });
export const UpdatePostFormSchema = PostsSchema;
export const DeletePostFormSchema = PostsSchema.pick({ id: true });

// * auth form
const BaseAuthFormSchemas = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const LoginSchema = BaseAuthFormSchemas.omit({ confirmPassword: true }).extend({
  password: z.string().min(1, { message: 'Password is required' }),
});

const SignUpSchema = BaseAuthFormSchemas.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  }
);

const ForgotPasswordSchema = BaseAuthFormSchemas.omit({
  password: true,
  confirmPassword: true,
});

export const AuthFormSchemas = {
  login: LoginSchema,
  signUp: SignUpSchema,
  forgotPassword: ForgotPasswordSchema,
};
