'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import MenuItems from './MenuItems';
import ThemeSwitcher from './ThemeSwitcher';

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return;
      if (
        menuContentRef.current &&
        !menuContentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setShowThemeSwitcher(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setShowThemeSwitcher(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [menuContentRef]);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group navbar_item focus:invisible"
          size="lg"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <Menu className="navbar_item_icon" />

          <span className="hidden lg:block">More</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={menuContentRef}
        className={cn(
          'dark:bg-neutral-800 w-64 !rounded-xl !p-0',
          !open && 'opacity-0'
        )}
        align="start"
      >
        {showThemeSwitcher ? (
          <ThemeSwitcher
            hideThemeSwitcher={() => setShowThemeSwitcher(false)}
          />
        ) : (
          <MenuItems
            showThemeSwitcher={() => setShowThemeSwitcher(true)}
            signOut={signOut}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
