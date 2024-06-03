import Link from 'next/link';

const links = [{ name: 'users', href: '/' }];

export const SidebarDashboardSection = () => {
  return (
    <div className='relative flex-1 flex flex-col min-h-0 borderR border-red-600 bg-white pt-0'>
      <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
        <div className='flex-1 px-3 bg-white divide-y space-y-1'>
          <ul className='space-y-2 pb-2'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='text-base capitalize text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group'
                >
                  <span className='ml-3'>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
