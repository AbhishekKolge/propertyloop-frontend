'use client';
import { useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ApplicationCard from '@/components/application/ApplicationCard';
import ApplicationCardLoading from '@/components/application/ApplicationCardLoading';
import Pagination from '@/components/layout/Pagination';

import { useGetUserApplicationsQuery } from '@/features/application/applicationApiSlice';

const initialQueryFilterState = {
  sort: '',
  pageNumber: 1,
};

const initialApplicationState = {
  totalPages: 0,
};

const queryFilterReducer = (state, action) => {
  if (action.type === 'CHANGE_PAGE') {
    return {
      ...state,
      pageNumber: action.pageNumber,
    };
  }
  if (action.type === 'SET_SORT') {
    return {
      ...state,
      pageNumber: initialQueryFilterState.pageNumber,
      sort: action.sort,
    };
  }
  if (action.type === 'RESET_FILTERS') {
    return {
      ...initialQueryFilterState,
    };
  }
  return initialQueryFilterState;
};

const applicationReducer = (state, action) => {
  if (action.type === 'SET_TOTAL_COUNT') {
    return {
      ...state,
      totalPages: action.totalPages,
    };
  }
  return initialApplicationState;
};

const Application = () => {
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [applicationState, dispatchApplication] = useReducer(
    applicationReducer,
    initialApplicationState
  );

  const {
    data: applicationData,
    isLoading: applicationIsLoading,
    isFetching: applicationIsFetching,
    isSuccess: applicationIsSuccess,
    error: applicationError,
  } = useGetUserApplicationsQuery(queryFilterState);

  let totalPageNumber = applicationData?.totalPages;
  let applicationList = applicationData?.results;

  const nextPageHandler = () => {
    if (queryFilterState.pageNumber < totalPageNumber) {
      dispatchQueryFilter({
        type: 'CHANGE_PAGE',
        pageNumber: queryFilterState.pageNumber + 1,
      });
    }
  };
  const prevPageHandler = () => {
    if (queryFilterState.pageNumber > 1) {
      dispatchQueryFilter({
        type: 'CHANGE_PAGE',
        pageNumber: queryFilterState.pageNumber - 1,
      });
    }
  };
  const resetFilterHandler = () => {
    dispatchQueryFilter({ type: 'RESET_FILTERS' });
  };
  const sortHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_SORT', sort: value });
  };

  useEffect(() => {
    if (applicationError) {
      if (applicationError.data?.msg) {
        toast.error(applicationError.data.msg);
      } else {
        toast.error('Something went wrong!, please try again');
      }
    }

    if (applicationIsSuccess) {
      dispatchApplication({
        type: 'SET_TOTAL_COUNT',
        totalPages: applicationData.totalPages,
      });
    }
  }, [applicationError, applicationIsSuccess, applicationData]);

  return (
    <section>
      <div className='grid gap-5'>
        <div className='ml-auto w-[100px]'>
          <Select onValueChange={sortHandler} value={queryFilterState.sort}>
            <SelectTrigger id='sort'>
              <SelectValue placeholder='Sort' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value='latest'>Latest</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(applicationIsLoading || applicationIsFetching) &&
        !applicationIsSuccess ? (
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {new Array(12).fill(0).map((item, index) => {
              return <ApplicationCardLoading key={index} />;
            })}
          </div>
        ) : !!applicationList.length ? (
          <>
            <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {applicationList.map((application) => {
                return (
                  <ApplicationCard
                    key={application._id}
                    application={application}
                  />
                );
              })}
            </div>
            <Pagination
              isLoading={applicationIsLoading || applicationIsFetching}
              onNext={nextPageHandler}
              onPrev={prevPageHandler}
              pageNumber={queryFilterState.pageNumber}
              totalPageNumber={totalPageNumber}
            />
          </>
        ) : (
          <p className='m-auto text-lg'>No Applications Found</p>
        )}
      </div>
    </section>
  );
};

export default Application;
