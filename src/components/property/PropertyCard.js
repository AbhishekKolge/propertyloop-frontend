import Link from 'next/link';

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
  getShortDescription,
  getInitials,
  formatCurrency,
} from '@/utils/helper';

const PropertyCard = (props) => {
  const { property } = props;

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
      <CardFooter className='flex justify-between'>
        <Button variant='outline' className='w-full' asChild>
          <Link href={`/property/${property._id}`}>View Description</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
