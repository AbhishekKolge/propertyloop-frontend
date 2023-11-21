import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section className='grid grid-col-1 lg:grid-cols-3 gap-10'>
      <div className='lg:col-span-2 grid gap-3'>
        <Skeleton className='w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-none' />
        <Skeleton className='h-[50px] w-1/2' />
        <span className='flex items-center gap-2'>
          <Skeleton className='h-6 w-14 rounded-full' />
          <Skeleton className='h-6 w-14 rounded-full' />
          <Skeleton className='h-6 w-14 rounded-full' />
        </span>
        <Skeleton className='h-6 w-36' />
        <Skeleton className='h-[40px] w-full' />
      </div>
      <div>
        <Card className='lg:w-[450px]'>
          <CardHeader>
            <CardTitle className='flex flex-col gap-2 md:flex-row items-center justify-between mb-4'>
              <Skeleton className='h-6 w-1/2' />
            </CardTitle>
            <Skeleton className='m-auto w-[200px] h-[200px] rounded-full' />
          </CardHeader>

          <CardContent>
            <Skeleton className='h-6 w-1/2' />
          </CardContent>
          <CardFooter className='grid gap-4'>
            <Skeleton className='h-10 w-full' />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Loading;
