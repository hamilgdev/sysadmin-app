import { DialogFooter, Input, Label, Button, BasicDialog } from '@/components';
import { User } from '@/interfaces';
import { ReloadIcon } from '@radix-ui/react-icons';

interface UserUpdateDialogProps {
  user: User | null;
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UserUpdateDialog({
  isOpen,
  onOpenChange,
  isLoading,
  user,
  onChange,
  onConfirm,
}: UserUpdateDialogProps) {
  return (
    <BasicDialog
      title='Update User'
      description='Update the user information and save the changes.'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className='grid gap-4'>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              name='name'
              value={user?.name}
              className='col-span-3'
              onChange={onChange}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='last_name' className='text-right'>
              Last Name
            </Label>
            <Input
              id='last_name'
              name='last_name'
              value={user?.last_name}
              className='col-span-3'
              onChange={onChange}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={user?.email}
              className='col-span-3'
              onChange={onChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            Update changes
          </Button>
        </DialogFooter>
      </div>
    </BasicDialog>
  );
}
