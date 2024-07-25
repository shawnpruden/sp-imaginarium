import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Activity, Bookmark, LogOut, Sun, Moon, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export default function MenuItems({
  showThemeSwitcher,
  signOut,
}: {
  showThemeSwitcher: () => void;
  signOut: () => void;
}) {
  const { theme } = useTheme();

  const menuItemsConfig = [
    {
      name: 'Settings',
      icon: Settings,
    },
    { name: 'Your activity', icon: Activity },
    {
      name: 'Saved',
      icon: Bookmark,
    },
    {
      name: 'Switch appearance',
      icon: theme === 'dark' ? Moon : Sun,
      onClick: showThemeSwitcher,
    },
    {
      name: 'Log out',
      icon: LogOut,
      onClick: signOut,
    },
  ];

  return (
    <ul>
      {menuItemsConfig.map(({ name, icon, onClick }, index) => {
        const MenuIcon = icon;
        const hasSeparator = ['Log out'].includes(name);

        return (
          <li key={`${name}-${index}`}>
            {hasSeparator && (
              <DropdownMenuSeparator className="bg-gray-300 dark:bg-neutral-700" />
            )}
            <DropdownMenuItem className="menu_btn_item" onClick={onClick}>
              <MenuIcon size={20} />
              <span>{name}</span>
            </DropdownMenuItem>
          </li>
        );
      })}
    </ul>
  );
}
