import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PropertyImage from './PropertyImage';

const PropertyForm = (props) => {
  const { formik, isLoading, disabled, open, onToggle } = props;

  const SelectFurnishStatusBlurHandler = () => {
    formik.setFieldTouched('furnishStatus', true);
  };

  const selectFurnishStatusChangeHandler = (value) => {
    formik.setFieldValue('furnishStatus', value);
  };

  const SelectStatusBlurHandler = () => {
    formik.setFieldTouched('status', true);
  };

  const selectStatusChangeHandler = (value) => {
    formik.setFieldValue('status', value);
  };

  const propertyImageUploadHandler = (file) => {
    formik.setFieldValue('propertyImage', file);
  };

  const propertyImageCancelHandler = (e) => {
    e.stopPropagation();
    formik.setFieldValue('propertyImage', '');
  };

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        <Button type='button' variant='outline'>
          Create New Property
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Property Information</DialogTitle>
        </DialogHeader>
        <form className='grid gap-4' noValidate onSubmit={formik.handleSubmit}>
          <div className='px-2 pb-2 grid w-full items-center gap-4 max-h-[70dvh] overflow-scroll'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='propertyImage'>Property Image</Label>
              <PropertyImage
                image={formik.values.propertyImage}
                name={formik.values.name}
                isLoading={isLoading}
                onUpload={propertyImageUploadHandler}
                onCancel={propertyImageCancelHandler}
              />
              {!!formik.touched.propertyImage &&
                !!formik.errors.propertyImage && (
                  <p className='text-red-700 text-sm'>
                    {formik.errors.propertyImage}
                  </p>
                )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter property name'
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              {!!formik.touched.name && !!formik.errors.name && (
                <p className='text-red-700 text-sm'>{formik.errors.name}</p>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                placeholder='Enter property description'
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              {!!formik.touched.description && !!formik.errors.description && (
                <p className='text-red-700 text-sm'>
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                name='location'
                placeholder='Enter property location'
                value={formik.values.location}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              {!!formik.touched.location && !!formik.errors.location && (
                <p className='text-red-700 text-sm'>{formik.errors.location}</p>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='furnishStatus'>Furnish Status</Label>
              <Select
                id='furnishStatus'
                value={formik.values.furnishStatus}
                onOpenChange={SelectFurnishStatusBlurHandler}
                onValueChange={selectFurnishStatusChangeHandler}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='unfurnished'>Unfurnished</SelectItem>
                  <SelectItem value='furnished'>Furnished</SelectItem>
                </SelectContent>
              </Select>
              {!!formik.touched.furnishStatus &&
                !!formik.errors.furnishStatus && (
                  <p className='text-red-700 text-sm'>
                    {formik.errors.furnishStatus}
                  </p>
                )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='carpetArea'>Carpet Area</Label>
              <Input
                id='carpetArea'
                name='carpetArea'
                type='number'
                placeholder='Enter carpet area'
                value={formik.values.carpetArea}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              {!!formik.touched.carpetArea && !!formik.errors.carpetArea && (
                <p className='text-red-700 text-sm'>
                  {formik.errors.carpetArea}
                </p>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='price'>Price</Label>
              <Input
                id='price'
                name='price'
                type='number'
                placeholder='Enter property price'
                value={formik.values.price}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
              {!!formik.touched.price && !!formik.errors.price && (
                <p className='text-red-700 text-sm'>{formik.errors.price}</p>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='status'>Status</Label>
              <Select
                id='status'
                value={formik.values.status}
                onOpenChange={SelectStatusBlurHandler}
                onValueChange={selectStatusChangeHandler}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='open'>Open</SelectItem>
                  <SelectItem value='closed'>Closed</SelectItem>
                </SelectContent>
              </Select>
              {!!formik.touched.status && !!formik.errors.status && (
                <p className='text-red-700 text-sm'>{formik.errors.status}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button disabled={disabled} className='w-full' type='submit'>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyForm;
