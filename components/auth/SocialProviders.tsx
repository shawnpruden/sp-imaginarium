import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

export default function SocialProviders({ isPending }: { isPending: boolean }) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Account with this email is already associated with a different provider.'
      : null;

  return (
    <>
      <div className="flex items-center justify-center my-2">
        <p className="grow border-t border-gray-200 dark:border-gray-700" />
        <span className="px-4 text-black dark:text-white">or</span>
        <p className="grow border-t border-gray-200 dark:border-gray-700" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Button
          className="w-full gap-x-2"
          variant="secondary"
          onClick={() =>
            signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT })
          }
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

        <Button
          className="w-full gap-x-2"
          variant="secondary"
          onClick={() => {
            try {
              signIn('github', { callbackUrl: DEFAULT_LOGIN_REDIRECT });
            } catch (error) {
              console.error(error);
            }
          }}
          disabled={isPending}
        >
          <Image
            priority
            src={
              theme === 'light'
                ? '/icons/github-light.svg'
                : '/icons/github-dark.svg'
            }
            alt="github"
            width={20}
            height={20}
          />

          <span>Continue with GitHub</span>
        </Button>

        {urlError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{urlError}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
