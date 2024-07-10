import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Aperture } from 'lucide-react';

export default function Logo() {
  return (
    <Link
      href="/dashboard"
      className={buttonVariants({
        className:
          'navbar_item hidden md:flex mb-10 lg:hover:bg-transparent lg:!p-0',
        size: 'lg',
        variant: 'ghost',
      })}
    >
      <Aperture className="w-7 h-7 hover:scale-110 duration-300 transition-all lg:hidden shrink-0" />
      <span className="capitalize font-semibold text-xl hidden lg:block">
        imaginarium
      </span>
    </Link>
  );
}
