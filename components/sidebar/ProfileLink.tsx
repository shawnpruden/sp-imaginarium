'use client';

import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';

export default function ProfileLink({ user }: { user: User }) {
  const pathname = usePathname();
  const href = `/dashboard/${user.name}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? 'secondary' : 'ghost',
        className: cn('navbar_item group order-last md:order-none'),
        size: 'lg',
      })}
    >
      <div className="flex-1 lg:flex-none flex justify-center">
        <Avatar
          className={cn(
            'relative h-7 w-7 group-hover:scale-110 duration-300 transition-all',
            isActive && 'border-2 border-white'
          )}
        >
          <Image
            priority
            src={user?.image || '/images/no-avatar.jpg'}
            fill
            alt={`${user?.name}'s profile picture`}
            className="rounded-full object-cover"
          />
        </Avatar>
      </div>

      <span className={cn('hidden lg:block', isActive && 'font-extrabold')}>
        Profile
      </span>
    </Link>
  );
}
