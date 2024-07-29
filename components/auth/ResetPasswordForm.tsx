'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useOptimisticSubmit, useToast } from '@/hooks';
import { resetPassword } from '@/lib/actions';
import { ResetPasswordSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormWrapper from '../shared/FormWrapper';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AuthForm() {
  const { isPending, handleAction } = useOptimisticSubmit();
  const { handleToast } = useToast();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    handleAction(() =>
      resetPassword(values, token).then((message) => handleToast(message))
    );
  }

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="outline-none">
        <FormWrapper>
          <AlertDialogHeader>
            <AlertDialogTitle className="capitalize text-4xl flex justify-center">
              <p className="rounded-full p-4 border-2 border-black dark:border-white">
                <Lock className="w-16 h-16" strokeWidth="1px" />
              </p>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3 mt-8"
            >
              <FormDescription>Enter a new password.</FormDescription>

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
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isPending}
              >
                Continue
              </Button>
            </form>
          </Form>

          <div className="flex justify-center mt-10">
            <Link
              href="/login"
              className={buttonVariants({ variant: 'outline' })}
            >
              Back to login
            </Link>
          </div>
        </FormWrapper>
      </AlertDialogContent>
    </AlertDialog>
  );
}
