'use client';

import { Button, UserTable, UserCreateDialog } from '@/components';
import { useCreateUser, useSearchUsers } from '@/hooks';
import { PersonIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';

const initialFormData = {
  name: '',
  last_name: '',
  email: '',
};

export const DashboardSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);

  const { users, loading, handleGetUsers } = useSearchUsers({
    offset: 1,
    limit: 10,
  });

  const { handleCreateUser, loading: isLoadingCreate } = useCreateUser({
    refetch: handleGetUsers,
    onClose: setIsOpenCreateDialog,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCloseCreateDialog = () => {
    setIsOpenCreateDialog((prev) => !prev);
    setFormData(initialFormData);
  };

  const onConfirmCreate = () => {
    const { email, last_name, name } = formData;
    if (!email || !last_name || !name) {
      setError('All fields are required.');
      return;
    }
    handleCreateUser(formData);
  };

  const isInvalidInputs = useMemo(() => {
    const { email, last_name, name } = formData;
    if (!email || !last_name || !name) return true;
    return false;
  }, [formData]);

  return (
    <>
      <section className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-BASE font-bold text-gray-800'>
            Management System
          </h2>
          <Button variant='outline' onClick={() => setIsOpenCreateDialog(true)}>
            <PersonIcon className='mr-2 h-4 w-4' /> Add a new user
          </Button>
        </div>
        <hr />
        <div className='mt-2'>
          <UserTable
            tableData={users}
            onAirTableData={loading}
            dataRefresher={handleGetUsers}
          />
        </div>
      </section>

      <UserCreateDialog
        formData={formData}
        isDisabled={isInvalidInputs}
        isOpen={isOpenCreateDialog}
        isLoading={isLoadingCreate}
        onOpenChange={onCloseCreateDialog}
        onChange={onChange}
        onConfirm={onConfirmCreate}
      />
    </>
  );
};
