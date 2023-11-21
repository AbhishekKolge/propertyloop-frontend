import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PropertyCardLoading = () => {
  return (
    <Card className='w-full grid'>
      <CardHeader className='grid gap-2'>
        <Skeleton className='h-[150px] w-full' />
        <CardTitle>
          <Skeleton className='h-[20px] w-full' />
        </CardTitle>
        <span className='flex items-center gap-2'>
          <Skeleton className='h-6 w-14 rounded-full' />
          <Skeleton className='h-6 w-14 rounded-full' />
        </span>
        <Skeleton className='h-[20px] w-full' />
        <Skeleton className='h-[30px] w-full' />
      </CardHeader>
      <CardFooter className='flex justify-between'>
        <Skeleton className='h-[40px] w-full' />
      </CardFooter>
    </Card>
  );
};

export default PropertyCardLoading;
