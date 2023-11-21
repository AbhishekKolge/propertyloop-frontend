import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  getShortDescription,
  getInitials,
  formatCurrency,
} from '@/utils/helper';

import { useDeletePropertyMutation } from '@/features/property/propertyApiSlice';

const UserPropertyCard = (props) => {
  const { property, onEdit } = props;
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [deleteProperty, { isLoading: deletePropertyIsLoading }] =
    useDeletePropertyMutation();

  const deletePropertyHandler = () => {
    deleteProperty(property._id)
      .unwrap()
      .then(() => {
        toast.success('Property deleted successfully');
        setOpenDeleteAlert(false);
      })
      .catch((error) => {
        if (error.data?.msg) {
          toast.error(error.data.msg);
        } else {
          toast.error('Something went wrong!, please try again');
        }
        setOpenDeleteAlert(false);
      });
  };

  const toggleDeleteAlert = () => {
    setOpenDeleteAlert((prevState) => !prevState);
  };

  return (
    <Card className='w-full grid'>
      <CardHeader className='grid gap-2'>
        <Avatar className='w-full h-[150px] rounded-none'>
          <AvatarImage
            className='object-cover'
            src={property.propertyImage}
            alt={`@${property.name}`}
          />
          <AvatarFallback className='rounded-none text-4xl uppercase'>
            {getInitials(property.name)}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{property.name}</CardTitle>
        <span className='flex items-center gap-2'>
          <Badge variant='outline' className='capitalize'>
            {property.location}
          </Badge>
          <Badge
            className={`${
              property.status === 'open'
                ? 'bg-green-600 hover:bg-green-600'
                : 'bg-red-600 hover:bg-red-600'
            } capitalize`}
          >
            {property.status}
          </Badge>
          <Badge className='capitalize'>{property.furnishStatus}</Badge>
        </span>
        <span className='text-sm text-muted-foreground'>{`${
          property.price
            ? formatCurrency(property.price)
            : 'Price not mentioned'
        } | ${
          property.carpetArea
            ? `${property.carpetArea} sq.ft.`
            : 'sq.ft. not mentioned'
        }`}</span>
        <CardDescription>
          {getShortDescription(property.description)}
        </CardDescription>
      </CardHeader>
      <CardFooter className='grid gap-2'>
        <Button asChild>
          <Link href={`/property/${property._id}`}>View</Link>
        </Button>
        <Button
          onClick={onEdit.bind(null, property)}
          type='button'
          variant='outline'
        >
          Edit
        </Button>
        <Button onClick={toggleDeleteAlert} type='button' variant='destructive'>
          Delete
        </Button>
        <AlertDialog open={openDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                property and remove data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={toggleDeleteAlert}
                type='button'
                variant='outline'
                disabled={deletePropertyIsLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={deletePropertyHandler}
                type='button'
                variant='destructive'
                disabled={deletePropertyIsLoading}
              >
                {deletePropertyIsLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default UserPropertyCard;
