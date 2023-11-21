'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useCreateApplicationMutation } from '@/features/application/applicationApiSlice';

const BookPropertyButton = (props) => {
  const { propertyId, isSubmitted } = props;
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const router = useRouter();

  const [
    createApplication,
    {
      isLoading: createApplicationIsLoading,
      isSuccess: createApplicationIsSuccess,
    },
  ] = useCreateApplicationMutation();

  const bookPropertyHandler = () => {
    if (!isLoggedIn) {
      return router.push('/auth/login');
    }

    if (role === 'landlord') {
      return toast.error('Please use tenant account');
    }

    createApplication({ id: propertyId })
      .unwrap()
      .then(() => {
        toast.success('Booked successfully');
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
    <Button
      disabled={createApplicationIsSuccess || isSubmitted}
      onClick={bookPropertyHandler}
      type='button'
    >
      {createApplicationIsLoading && (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      )}
      {createApplicationIsSuccess || isSubmitted ? 'Booked' : 'Book Property'}
    </Button>
  );
};

export default BookPropertyButton;
