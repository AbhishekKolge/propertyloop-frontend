'use client';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import BookPropertyButton from '@/components/property/BookPropertyButton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Loading from './loading';
import Error from '../../error';

import { getInitials, formatCurrency } from '@/utils/helper';

import { useGetSinglePropertyQuery } from '@/features/property/propertyApiSlice';

const PropertyDetails = (props) => {
  const {
    params: { id },
  } = props;

  const {
    data: propertyData,
    isLoading: propertyIsLoading,
    isFetching: propertyIsFetching,
    isSuccess: propertyIsSuccess,
    error: propertyError,
  } = useGetSinglePropertyQuery({ id });

  if (propertyIsLoading) {
    return <Loading />;
  }

  if (propertyError) {
    let error = {
      message: `Something's went wrong!`,
    };
    if (propertyError.data?.msg) {
      error.message = propertyError.data.msg;
    }
    return <Error error={error} />;
  }

  return (
    <section className='grid grid-col-1 lg:grid-cols-3 gap-10'>
      <div className='lg:col-span-2 grid gap-3'>
        <Avatar className='w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-none'>
          <AvatarImage
            className='object-cover'
            src={propertyData.property.propertyImage}
            alt={`@${propertyData.property.name}`}
          />
          <AvatarFallback className='rounded-none text-4xl uppercase'>
            {getInitials(propertyData.property.name)}
          </AvatarFallback>
        </Avatar>
        <p className='text-4xl'>{propertyData.property.name}</p>
        <span className='flex items-center gap-2'>
          <Badge variant='outline' className='capitalize'>
            {propertyData.property.location}
          </Badge>
          <Badge
            className={`${
              propertyData.property.status === 'open'
                ? 'bg-green-600 hover:bg-green-600'
                : 'bg-red-600 hover:bg-red-600'
            } capitalize`}
          >
            {propertyData.property.status}
          </Badge>
          <Badge className='capitalize'>
            {propertyData.property.furnishStatus}
          </Badge>
        </span>
        <span className='text-muted-foreground'>{`${
          propertyData.property.price
            ? formatCurrency(propertyData.property.price)
            : 'Price not mentioned'
        } | ${
          propertyData.property.carpetArea
            ? `${propertyData.property.carpetArea} sq.ft.`
            : 'sq.ft. not mentioned'
        }`}</span>
        <div>{propertyData.property.description}</div>
      </div>
      <div>
        <Card className='lg:w-[450px]'>
          <CardHeader>
            <CardTitle className='flex flex-col gap-2 md:flex-row items-center justify-between mb-4'>
              Owner Profile
              <div className='grid grid-flow-row md:grid-flow-col gap-2'>
                {propertyData.property.owned && (
                  <Badge className='capitalize'>Owned by you</Badge>
                )}
                <Badge className='bg-green-600 hover:bg-green-600 capitalize'>
                  {`${propertyData.property.applications.length} tenant applied`}
                </Badge>
              </div>
            </CardTitle>
            <Avatar className='m-auto w-[200px] h-[200px]'>
              <AvatarImage
                className='object-cover'
                src={propertyData.property.landlord.profileImage}
                alt={`@${propertyData.property.landlord.name}`}
              />

              <AvatarFallback className='text-4xl'>
                {getInitials(propertyData.property.landlord.name)}
              </AvatarFallback>
            </Avatar>
          </CardHeader>

          <CardContent>
            <div className='flex flex-col space-y-1.5'>
              <span className='font-semibold'>Contact:</span>
              <Link href={`mailto:${propertyData.property.landlord.email}`}>
                {propertyData.property.landlord.email}
              </Link>
            </div>
          </CardContent>
          {!propertyData.property.owned && (
            <CardFooter className='grid gap-4'>
              <BookPropertyButton
                isSubmitted={propertyData.property.isApplicationSubmitted}
                propertyId={propertyData.property._id}
              />
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
};

export default PropertyDetails;
