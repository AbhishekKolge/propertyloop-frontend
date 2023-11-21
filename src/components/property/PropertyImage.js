import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { DROPZONE_IMAGE_FORMAT, MAX_FILE_SIZE } from '@/utils/defaults';
import { validateDropzoneSingleFile, getInitials } from '@/utils/helper';

const PropertyImage = (props) => {
  const { image, name, isLoading, onUpload, onCancel } = props;
  const [imageUrl, setImageUrl] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...DROPZONE_IMAGE_FORMAT,
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      validateDropzoneSingleFile(rejectedFiles, MAX_FILE_SIZE);
      if (acceptedFiles[0]) {
        onUpload(acceptedFiles[0]);
      }
    },
    disabled: isLoading,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  useEffect(() => {
    if (image) {
      if (typeof image === 'object') {
        setImageUrl(URL.createObjectURL(image));
        return;
      }
      setImageUrl(image);
      return;
    }

    setImageUrl('');
  }, [image]);

  return (
    <div className='w-32 h-32 relative m-auto' {...getRootProps({})}>
      {!isLoading && imageUrl && (
        <Button
          onClick={onCancel}
          variant='destructive'
          className='rounded-full absolute top-0 right-0 z-10'
          size='icon'
          type='button'
        >
          <X color='#fff' className='w-5 h-5' />
        </Button>
      )}
      <Avatar className='m-auto w-full h-full'>
        <AvatarImage
          className='object-cover'
          src={imageUrl}
          alt='@property-image'
        />
        <AvatarFallback className='text-4xl uppercase'>
          {getInitials(name || '')}
        </AvatarFallback>
      </Avatar>
      <input {...getInputProps()} />
    </div>
  );
};

export default PropertyImage;
