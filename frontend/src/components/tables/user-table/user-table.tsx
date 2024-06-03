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
  BasicDialog,
} from '@/components';
import { TrashIcon, Pencil2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { DateFormats } from '@/constant';
import { dateFormatHandler } from '@/handlers';
import { User } from '@/interfaces';
import { useState } from 'react';
import { useDeleteUser } from '@/hooks';

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

  const { handleDeleteUser, loading: isLoadingDelete } = useDeleteUser({
    refetch: dataRefresher,
  });

  if (onAirTableData) return <TableSkeleton />;

  const onConfirmDelete = async () => {
    if (!selectedUser) return;

    handleDeleteUser(selectedUser.guid);
  };

  const handleEdit = (id: string) => {};

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
                  <Button variant='outline' size='icon'>
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

      <BasicDialog
        title='Delete User'
        description='Are you sure you want to delete this user?'
        isOpen={isOpenDeleteDialog}
        setIsOpen={setIsOpenDeleteDialog}
        onConfirm={onConfirmDelete}
        onCancel={() => {}}
      />
    </>
  );
}
