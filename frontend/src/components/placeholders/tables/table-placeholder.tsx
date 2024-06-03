import { Alert, AlertDescription, AlertTitle } from '@/components';
import { RocketIcon } from '@radix-ui/react-icons';

export const TablePlaceholder = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className='flex justify-center  min-h-96'>
      <Alert>
        <div className='flex flex-col items-center justify-center mt-8'>
          <div className='flex gap-2'>
            <RocketIcon className='h-4 w-4' />
            <AlertTitle>{title}</AlertTitle>
          </div>
          <AlertDescription>{description}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
