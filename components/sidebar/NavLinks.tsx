'use client';

import {
  Clapperboard,
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const linksConfig = [
  { name: 'Home', href: '/dashboard', icon: Home },
  {
    name: 'Search',
    href: '/dashboard/search',
    icon: Search,
    hideOnMobile: true,
  },
  {
    name: 'Explore',
    href: '/dashboard/explore',
    icon: Compass,
  },
  {
    name: 'Reels',
    href: '/dashboard/reels',
    icon: Clapperboard,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageCircle,
    order: 'order-5 md:order-none',
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: 'Create',
    href: '/dashboard/create',
    icon: PlusSquare,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {linksConfig.map(({ name, href, icon, hideOnMobile, order }) => {
        const LinkIcon = icon;
        const isActive = pathname === href;

        return (
          <Link
            key={name}
            href={href}
            className={buttonVariants({
              variant: isActive ? 'secondary' : 'ghost',
              className: cn(
                'group navbar_item',
                hideOnMobile && 'hidden md:flex',
                order
              ),
              size: 'lg',
            })}
          >
            <LinkIcon className="navbar_item_icon" />

            <span
              className={cn('hidden lg:block', isActive && 'font-extrabold')}
            >
              {name}
            </span>
          </Link>
        );
      })}
    </>
  );
}
