import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components';

interface BasicDialogProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  children: React.ReactNode;
}

export const BasicDialog = ({
  title,
  description,
  isOpen,
  onOpenChange,
  children,
}: BasicDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
