import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher({
  hideThemeSwitcher,
}: {
  hideThemeSwitcher: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
        <ChevronLeft
          size={18}
          className="cursor-pointer opacity-30"
          onClick={hideThemeSwitcher}
        />
        <p className="font-bold ml-3 select-none">Switch appearance</p>
        {theme === 'dark' ? (
          <Moon size={20} className="ml-auto" />
        ) : (
          <Sun size={20} className="ml-auto" />
        )}
      </div>

      <Label htmlFor="dark-mode" className="menu_btn_item hover:bg-accent">
        Dark Mode
        <DropdownMenuItem className="ml-auto !p-0">
          <Switch
            id="dark-mode"
            className="ml-auto"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => {
              setTheme(checked ? 'dark' : 'light');
            }}
          />
        </DropdownMenuItem>
      </Label>
    </>
  );
}
