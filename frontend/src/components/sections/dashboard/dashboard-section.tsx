'use client';

import { UserTable } from '@/components';
import { useSearchUsers } from '@/hooks';

export const DashboardSection = () => {
  const { users, loading, handleGetUsers } = useSearchUsers({
    offset: 1,
    limit: 10,
  });
  return (
    <section className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
      <h2 className='text-BASE font-bold text-gray-800 pb-2'>
        Management System
      </h2>
      <hr />

      <div className='mt-2'>
        <UserTable
          tableData={users}
          onAirTableData={loading}
          dataRefresher={handleGetUsers}
        />
      </div>
    </section>
  );
};
