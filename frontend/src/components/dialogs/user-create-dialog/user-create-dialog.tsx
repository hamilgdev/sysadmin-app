import { DialogFooter, Input, Label, Button, BasicDialog } from '@/components';
import { User } from '@/interfaces';
import { ReloadIcon } from '@radix-ui/react-icons';

interface UserCreateDialogProps {
  formData: {
    name: string;
    last_name: string;
    email: string;
  };
  isOpen: boolean;
  isDisabled?: boolean;
  isLoading: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UserCreateDialog({
  formData,
  isOpen,
  onOpenChange,
  isDisabled,
  isLoading,
  onChange,
  onConfirm,
}: UserCreateDialogProps) {
  return (
    <BasicDialog
      title='Create a new user'
      description='Fill in the user information and save the changes.'
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
              value={formData?.name}
              className='col-span-3'
              required
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
              value={formData?.last_name}
              className='col-span-3'
              required
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
              value={formData?.email}
              className='col-span-3'
              required
              onChange={onChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onConfirm} disabled={isDisabled || isLoading}>
            {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            Create user
          </Button>
        </DialogFooter>
      </div>
    </BasicDialog>
  );
}
