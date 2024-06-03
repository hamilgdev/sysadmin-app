'use client';

import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  BasicAlertDialog as UserDeleteAlertDialog,
  TablePlaceholder,
  UserUpdateDialog,
} from '@/components';
import { TrashIcon, Pencil2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { DateFormats } from '@/constant';
import { dateFormatHandler } from '@/handlers';
import { User } from '@/interfaces';
import { useState } from 'react';
import { useDeleteUser, useUpdateUser } from '@/hooks';

interface UserTableProps {
  tableData: User[];
  dataRefresher: () => Promise<void>;
  onAirTableData: boolean;
}

export function UserTable({
  onAirTableData,
  tableData,
  dataRefresher,
}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

  const { handleDeleteUser, loading: isLoadingDelete } = useDeleteUser({
    refetch: dataRefresher,
  });

  const { handleUpdateUser, loading: isLoadingUpdate } = useUpdateUser({
    refetch: dataRefresher,
    onClose: setIsOpenUpdateDialog,
  });

  if (onAirTableData) return <TableSkeleton />;

  if (!onAirTableData && !tableData.length)
    return (
      <TablePlaceholder
        title='No data found.'
        description='There are no users available to display.'
      />
    );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser((prev) => {
      if (!prev) return null;
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onCloseDeleteDialog = () => {
    setIsOpenDeleteDialog((prev) => !prev);
    if (selectedUser) setSelectedUser(null);
  };

  const onCloseUpdateDialog = () => {
    setIsOpenUpdateDialog((prev) => !prev);
    if (selectedUser) setSelectedUser(null);
  };

  const onConfirmDelete = () => {
    if (!selectedUser) return;
    handleDeleteUser(selectedUser.guid);
  };

  const onConfirmUpdate = () => {
    if (!selectedUser) return;

    handleUpdateUser(selectedUser.guid, {
      name: selectedUser.name.trim(),
      last_name: selectedUser.last_name.trim(),
      email: selectedUser.email.trim(),
    });
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((user) => (
            <TableRow key={user.guid}>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell className='font-medium'>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {dateFormatHandler(
                  user.created_at,
                  DateFormats.simplifiedWithYear
                )}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex gap-2 justify-end'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => {
                      setSelectedUser(user);
                      setIsOpenUpdateDialog(true);
                    }}
                  >
                    <Pencil2Icon className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    disabled={
                      isLoadingDelete && selectedUser?.guid === user.guid
                    }
                    onClick={() => {
                      if (isLoadingDelete) return;
                      setSelectedUser(user);
                      setIsOpenDeleteDialog(true);
                    }}
                  >
                    {isLoadingDelete && selectedUser?.guid === user.guid ? (
                      <ReloadIcon className='h-4 w-4 animate-spin' />
                    ) : (
                      <TrashIcon className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <UserDeleteAlertDialog
        title='Delete User'
        description='Are you sure you want to delete this user?'
        isOpen={isOpenDeleteDialog}
        onOpenChange={onCloseDeleteDialog}
        onConfirm={onConfirmDelete}
      />

      <UserUpdateDialog
        user={selectedUser}
        isOpen={isOpenUpdateDialog}
        isLoading={isLoadingUpdate}
        onOpenChange={onCloseUpdateDialog}
        onChange={onChange}
        onConfirm={onConfirmUpdate}
      />
    </>
  );
}
