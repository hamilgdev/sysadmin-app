import { HeaderDashboardSection, SidebarDashboardSection } from '@/components';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <header className='bg-white border-b border-gray-200 fixed z-30 w-full'>
        <HeaderDashboardSection />
      </header>

      <main className='flex overflow-hidden bg-white pt-16'>
        <aside
          id='sidebar'
          className='fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75'
          aria-label='Sidebar'
        >
          <SidebarDashboardSection />
        </aside>
        <div
          className='bg-gray-900 opacity-50 hidden fixed inset-0 z-10'
          id='sidebarBackdrop'
        ></div>
        <div className='h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64'>
          <div className='py-6 px-4'>
            <div className='w-full min-h-[calc(100vh-112px)]'>{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};
