'use client';

import { Button, UserTable, UserCreateDialog } from '@/components';
import { useCreateUser, useSearchUsers } from '@/hooks';
import { PersonIcon } from '@radix-ui/react-icons';
import { useCallback, useMemo, useState } from 'react';

const initialFormData = {
  name: '',
  last_name: '',
  email: '',
};

export const DashboardSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string>('10');

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);

  const { users, metadata, loading, handleGetUsers } = useSearchUsers({
    offset: currentPage,
    limit: parseInt(rowsPerPage),
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
      setError('Fields are required.');
      return;
    }
    handleCreateUser(formData);
  };

  const isInvalidInputs = useMemo(() => {
    const { email, last_name, name } = formData;
    if (!email || !last_name || !name) return true;
    return false;
  }, [formData]);

  const handleChangePage = useCallback(
    (newPage: number) => setCurrentPage(newPage),
    []
  );

  const handleChangeRowsPerPage = useCallback((value: string) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <section className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-BASE font-bold text-gray-800'>
              User Management System
            </h2>
            <p
              className='text-sm text-gray-500'
              aria-label='Description of the section'
            >
              List of users in the system. You can add, update, and delete
              users.
            </p>
          </div>

          <Button variant='outline' onClick={() => setIsOpenCreateDialog(true)}>
            <PersonIcon className='mr-2 h-4 w-4' /> Add a new user
          </Button>
        </div>
        <hr />
        <div className='mt-2'>
          <UserTable
            tableData={users}
            metadata={metadata}
            onAirTableData={loading}
            dataRefresher={handleGetUsers}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
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
