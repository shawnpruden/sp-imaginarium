import { auth } from '@/auth';
import Logo from './Logo';
import MenuButton from './MenuButton';
import NavLinks from './NavLinks';
import ProfileLink from './ProfileLink';

export default async function SideNavbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-col px-3 md:px-2 py-4 h-full">
      <nav className="bg-white dark:bg-neutral-950 border-t md:border-none -ml-3 md:ml-0 fixed md:relative h-16 md:h-full flex flex-row md:flex-col gap-x-2 md:gap-x-0 md:gap-y-2 flex-1 justify-evenly md:justify-between bottom-0 w-full p-2 z-50">
        <Logo />
        <NavLinks />

        {user && <ProfileLink user={user} />}

        <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
          <MenuButton />
        </div>
      </nav>
    </div>
  );
}
