import VerificationForm from '@/components/auth/VerificationForm';
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  );
}
