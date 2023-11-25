import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PropertyFilterCard = (props) => {
  const {
    onSearch,
    onReset,
    onStatus,
    onFurnishStatus,
    onSort,
    filters,
    search,
  } = props;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='search'>Search</Label>
            <Input
              id='search'
              placeholder='Property name or location'
              onChange={onSearch}
              value={search}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='furnishStatus'>Furnish Status</Label>
            <Select
              onValueChange={onFurnishStatus}
              value={filters.furnishStatus}
            >
              <SelectTrigger id='furnishStatus'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem value='furnished'>Furnished</SelectItem>
                <SelectItem value='unfurnished'>Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='status'>Status</Label>
            <Select onValueChange={onStatus} value={filters.status}>
              <SelectTrigger id='status'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem value='open'>Open</SelectItem>
                <SelectItem value='closed'>Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='sort'>Sort</Label>
            <Select onValueChange={onSort} value={filters.sort}>
              <SelectTrigger id='sort'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem value='latest'>Latest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
                <SelectItem value='highest'>Highest Price</SelectItem>
                <SelectItem value='lowest'>Lowest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type='button' onClick={onReset} className='w-full'>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilterCard;
