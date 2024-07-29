'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 md:hidden bg-white dark:bg-neutral-950 flex gap-x-3 items-center justify-between w-full border-b border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:-ml-6">
      <Link href={'/dashboard'}>
        <span className="capitalize font-semibold text-xl">imaginarium</span>
      </Link>

      <div className="flex items-center gap-x-2">
        <SearchBar />

        <Button
          size="icon"
          variant="ghost"
          className="group"
          onClick={() => router.push('/dashboard/notifications')}
        >
          <Heart className="group-hover:scale-110 duration-300 transition-all" />
        </Button>
      </div>
    </header>
  );
}
