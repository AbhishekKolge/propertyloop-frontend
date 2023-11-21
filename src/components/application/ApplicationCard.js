import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { useDeleteApplicationMutation } from '@/features/application/applicationApiSlice';

import { getInitials, formatCurrency } from '@/utils/helper';
import { formatISTTime } from '@/utils/time';

const ApplicationCard = (props) => {
  const { application } = props;

  const [
    deleteApplication,
    {
      isLoading: deleteApplicationIsLoading,
      isSuccess: deleteApplicationIsSuccess,
    },
  ] = useDeleteApplicationMutation();

  const deleteApplicationHandler = () => {
    deleteApplication(application._id)
      .unwrap()
      .then(() => {
        toast.success('Booking cancelled successfully');
      })
      .catch((error) => {
        if (error.data?.msg) {
          toast.error(error.data.msg);
        } else {
          toast.error('Something went wrong!, please try again');
        }
      });
  };

  return (
    <Card className='w-full grid'>
      <CardHeader className='grid gap-2'>
        <Avatar className='w-full h-[150px] rounded-none'>
          <AvatarImage
            className='object-cover'
            src={application.property.propertyImage}
            alt={`@${application.property.name}`}
          />
          <AvatarFallback className='rounded-none text-4xl uppercase'>
            {getInitials(application.property.name)}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{application.property.name}</CardTitle>
        <span className='flex items-center gap-2'>
          <Badge variant='outline' className='capitalize'>
            {application.property.location}
          </Badge>
          <Badge
            className={`${
              application.property.status === 'open'
                ? 'bg-green-600 hover:bg-green-600'
                : 'bg-red-600 hover:bg-red-600'
            } capitalize`}
          >
            {application.property.status}
          </Badge>
          <Badge className='capitalize'>
            {application.property.furnishStatus}
          </Badge>
        </span>
        <span className='text-sm text-muted-foreground'>{`${
          application.property.price
            ? formatCurrency(application.property.price)
            : 'Price not mentioned'
        } | ${
          application.property.carpetArea
            ? `${application.property.carpetArea} sq.ft.`
            : 'sq.ft. not mentioned'
        }`}</span>
        <CardDescription>
          Applied on: {formatISTTime(application.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardFooter className='grid gap-3'>
        <Button variant='outline' className='w-full' asChild>
          <Link href={`/property/${application.property._id}`}>
            View Description
          </Link>
        </Button>
        <Button
          disabled={deleteApplicationIsLoading || deleteApplicationIsSuccess}
          type='button'
          variant='destructive'
          className='w-full'
          onClick={deleteApplicationHandler}
        >
          {deleteApplicationIsLoading && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
