import SideNavbar from '@/components/sidebar/SideNavbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      <aside className="w-20 lg:w-64 flex-none md:border-r">
        <SideNavbar />
      </aside>

      <aside className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </aside>
    </main>
  );
}
