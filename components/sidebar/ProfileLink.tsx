'use client';

import { cn } from '@/lib/utils';
import type { User } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import UserAvatar from '../shared/UserAvatar';

export default function ProfileLink({ user }: { user: User }) {
  const pathname = usePathname();
  const href = `/dashboard/${user.name}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? 'secondary' : 'ghost',
        className: cn(
          'navbar_item group order-last md:order-none !justify-center lg:!justify-start'
        ),
        size: 'lg',
      })}
    >
      <UserAvatar
        user={user}
        className={cn(
          'relative h-7 w-7 group-hover:scale-110 duration-300 transition-all',
          isActive && 'border-2 border-white'
        )}
      />

      <span className={cn('hidden lg:block', isActive && 'font-extrabold')}>
        Profile
      </span>
    </Link>
  );
}
