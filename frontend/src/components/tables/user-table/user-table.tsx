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
  BasicSelect,
} from '@/components';
import {
  TrashIcon,
  Pencil2Icon,
  ReloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { DateFormats } from '@/constant';
import { dateFormatHandler } from '@/handlers';
import { Metadatos, User } from '@/interfaces';
import { useState } from 'react';
import { useDeleteUser, useUpdateUser } from '@/hooks';

interface UserTableProps {
  tableData: User[];
  metadata: Metadatos;
  dataRefresher: () => Promise<void>;
  currentPage: number;
  rowsPerPage: string;
  onAirTableData: boolean;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
}

export function UserTable({
  onAirTableData,
  tableData,
  dataRefresher,
  onChangePage,
  metadata,
  onChangeRowsPerPage,
  currentPage,
  rowsPerPage,
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

  const indexOfLastRow = currentPage * parseInt(rowsPerPage);

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
            <TableCell className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => onChangePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() => onChangePage(currentPage + 1)}
                disabled={indexOfLastRow >= metadata.total}
              >
                <ChevronRightIcon className='h-4 w-4' />
              </Button>
            </TableCell>
            <TableCell colSpan={3}>
              <span>
                Page: {metadata.page} of {metadata.last_page}
              </span>
            </TableCell>
            <TableCell className='flex items-center gap-2 text-right justify-end'>
              <span>Rows per page:</span>
              <BasicSelect
                value={rowsPerPage}
                onChange={onChangeRowsPerPage}
                options={[
                  { label: '10', value: '10' },
                  { label: '15', value: '15' },
                  { label: '20', value: '20' },
                ]}
              />
            </TableCell>
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
