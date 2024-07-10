'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthFormActions, AuthActionReturn } from '@/lib';
import { AuthFormSchemas } from '@/lib/schemas';
import { getAuthFormConfig } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export default function AuthForm({
  mode,
}: {
  mode: 'login' | 'signUp' | 'forgotPassword';
}) {
  const [isPending, startTransition] = useTransition();

  const formSchema = AuthFormSchemas[mode];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const formAction = AuthFormActions[mode] as (
    values: z.infer<typeof formSchema>
  ) => AuthActionReturn;
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() =>
      formAction(values).then(({ success, error }) => {
        if (success) toast.success(success);
        if (error) toast.error(error);
      })
    );
  }

  const authFormConfig = getAuthFormConfig(mode);

  return (
    <AlertDialog open>
      <AlertDialogContent className="outline-none">
        <div className="w-svw sm:w-full h-svh sm:h-fit px-16 sm:px-28 py-28 sm:py-12">
          <AlertDialogHeader>
            <AlertDialogTitle className="capitalize text-4xl flex justify-center">
              {mode === 'forgotPassword' ? (
                <p className="rounded-full p-4 border-2 border-black dark:border-white">
                  <Lock className="w-16 h-16" strokeWidth="1px" />
                </p>
              ) : (
                <span>imaginarium</span>
              )}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3 mt-8"
            >
              {mode === 'forgotPassword' && (
                <FormDescription>
                  Enter your email and we will send you a link to get back into
                  your account.
                </FormDescription>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        {...field}
                        disabled={isPending}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {mode !== 'forgotPassword' && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          disabled={isPending}
                          autoComplete={
                            mode === 'login'
                              ? 'current-password'
                              : 'new-password'
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {mode === 'signUp' && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                          disabled={isPending}
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isPending}
              >
                Continue
              </Button>
            </form>
          </Form>

          <div className="flex flex-col items-center gap-y-2 mt-3">
            {mode === 'login' && (
              <Link href="/forgot-password" className="text-sm auth_form_link">
                Forgot password?
              </Link>
            )}

            <AlertDialogDescription className="text-center">
              <span>{authFormConfig?.desc} </span>

              <Link
                href={authFormConfig?.href!}
                className="font-semibold auth_form_link"
              >
                {authFormConfig?.linkLabel}
              </Link>
            </AlertDialogDescription>
          </div>

          {mode !== 'forgotPassword' && (
            <>
              <div className="flex items-center justify-center my-2">
                <p className="grow border-t border-gray-200 dark:border-gray-700" />
                <span className="px-4 text-black dark:text-white">or</span>
                <p className="grow border-t border-gray-200 dark:border-gray-700" />
              </div>

              <Button
                className="w-full gap-x-2"
                variant="outline"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                disabled={isPending}
              >
                <Image
                  priority
                  src="/icons/google.svg"
                  alt="google"
                  width={20}
                  height={20}
                />

                <span>Continue with Google</span>
              </Button>
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
