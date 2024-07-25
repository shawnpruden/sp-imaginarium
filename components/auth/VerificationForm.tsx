'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { verifyToken } from '@/lib/actions';
import { AlertCircle, CircleCheck, MailCheck, MailWarning } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import FormWrapper from '../shared/FormWrapper';

type Message = {
  type: 'success' | 'error' | null;
  text: string;
};

export default function VerificationForm() {
  const [message, setMessage] = useState<Message>({ type: null, text: '' });
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    verifyToken(token)
      .then((data) => {
        if (data.success) {
          setMessage({ type: 'success', text: data.success });
        }

        if (data.error) {
          setMessage({ type: 'error', text: data.error });
        }
      })
      .catch(() =>
        setMessage({ type: 'error', text: 'Something went wrong!' })
      );
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="outline-none">
        <FormWrapper>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center">
              <p className="rounded-full p-4 border-2 border-black dark:border-white">
                {message.type === 'success' ? (
                  <MailCheck className="w-16 h-16" strokeWidth="1px" />
                ) : (
                  <MailWarning className="w-16 h-16" strokeWidth="1px" />
                )}
              </p>
            </AlertDialogTitle>

            <div className="!mt-5">
              {!message.type ? (
                <AlertDialogDescription className="text-base text-center animate-pulse">
                  Confirming your verification...
                </AlertDialogDescription>
              ) : (
                <Alert
                  variant={
                    message.type === 'success' ? 'default' : 'destructive'
                  }
                >
                  {message.type === 'success' ? (
                    <CircleCheck className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{message.text}</AlertTitle>
                </Alert>
              )}
            </div>
          </AlertDialogHeader>

          <div className="flex justify-center mt-10">
            <Link href="/login" className={buttonVariants()}>
              Back to login
            </Link>
          </div>
        </FormWrapper>
      </AlertDialogContent>
    </AlertDialog>
  );
}
