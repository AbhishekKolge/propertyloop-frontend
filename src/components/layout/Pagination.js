import { Button } from '@/components/ui/button';

const Pagination = (props) => {
  const { isLoading, onNext, onPrev, pageNumber, totalPageNumber } = props;

  return totalPageNumber > 1 ? (
    <div className='flex justify-end space-x-3'>
      <Button
        className='w-32'
        disabled={isLoading || pageNumber <= 1}
        onClick={onPrev}
      >
        Previous
      </Button>
      <Button
        className='w-32'
        disabled={isLoading || pageNumber >= totalPageNumber}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  ) : (
    <></>
  );
};

export default Pagination;
