import { Skeleton } from '@/components/ui/skeleton';

const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='min-h-96'>{children}</div>;
};

const TableHeader = ({ headerItems = 5 }: { headerItems?: number }) => {
  const skeletonItems = Array.from({ length: headerItems }).map((_, i) => (
    <Skeleton key={i} className='h-8' />
  ));
  return <>{skeletonItems}</>;
};

const TableRows = ({ rows = 3 }: { rows?: number }) => {
  const skeletonRows = Array.from({ length: rows }).map((_, i) => (
    <div key={i} className='grid grid-cols-5 gap-4'>
      <Skeleton className='h-6' />
      <Skeleton className='h-6' />
      <Skeleton className='h-6' />
      <Skeleton className='h-6' />
      <Skeleton className='h-6' />
    </div>
  ));
  return <>{skeletonRows}</>;
};

export function TableSkeleton() {
  return (
    <TableContainer>
      <div className='grid grid-cols-5 gap-4 mb-3'>
        <TableHeader headerItems={5} />
      </div>
      <div className='grid gap-4'>
        <TableRows rows={10} />
      </div>
    </TableContainer>
  );
}
