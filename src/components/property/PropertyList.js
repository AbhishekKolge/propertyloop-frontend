'use client';
import { useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';

import PropertyCard from './PropertyCard';
import Pagination from '../layout/Pagination';
import PropertyFilterCard from './PropertyFilterCard';
import PropertyCardLoading from './PropertyCardLoading';

import { useGetAllPropertiesQuery } from '@/features/property/propertyApiSlice';

import { useDebounce } from '@/hooks/optimization';

const initialQueryFilterState = {
  search: '',
  furnishStatus: '',
  status: '',
  sort: '',
  pageNumber: 1,
};

const initialPropertyState = {
  totalPages: 0,
  firstRender: true,
  search: '',
};

const queryFilterReducer = (state, action) => {
  if (action.type === 'CHANGE_PAGE') {
    return {
      ...state,
      pageNumber: action.pageNumber,
    };
  }
  if (action.type === 'SEARCH') {
    return {
      ...state,
      pageNumber: initialQueryFilterState.pageNumber,
      search: action.search,
    };
  }
  if (action.type === 'SET_FILTERS') {
    return {
      ...state,
      ...action.filters,
    };
  }
  if (action.type === 'SET_STATUS') {
    return {
      ...state,
      pageNumber: initialQueryFilterState.pageNumber,
      status: action.status,
    };
  }
  if (action.type === 'SET_FURNISH_STATUS') {
    return {
      ...state,
      pageNumber: initialQueryFilterState.pageNumber,
      furnishStatus: action.furnishStatus,
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

const propertyReducer = (state, action) => {
  if (action.type === 'SET_TOTAL_COUNT') {
    return {
      ...state,
      totalPages: action.totalPages,
    };
  }
  if (action.type === 'DISABLE_FIRST_RENDER') {
    return {
      ...state,
      firstRender: false,
    };
  }
  if (action.type === 'SEARCH') {
    return {
      ...state,
      search: action.search,
    };
  }
  if (action.type === 'RESET_SEARCH') {
    return {
      ...state,
      search: '',
    };
  }
  return initialPropertyState;
};

const PropertyList = (props) => {
  const { results, totalPages } = props;
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [propertyState, dispatchProperty] = useReducer(
    propertyReducer,
    initialPropertyState
  );

  const {
    data: propertyData,
    isLoading: propertyIsLoading,
    isFetching: propertyIsFetching,
    isSuccess: propertyIsSuccess,
    error: propertyError,
  } = useGetAllPropertiesQuery(queryFilterState);

  let totalPageNumber = propertyData?.totalPages;
  let propertyList = propertyData?.results;

  if (propertyState.firstRender) {
    totalPageNumber = totalPages;
    propertyList = results;
  }

  const debounceSearch = useDebounce(dispatchQueryFilter);

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

  const searchHandler = (e) => {
    const search = e.target.value;
    debounceSearch({ type: 'SEARCH', search });
    dispatchProperty({
      type: 'SEARCH',
      search,
    });
    dispatchProperty({
      type: 'DISABLE_FIRST_RENDER',
    });
  };

  const resetFilterHandler = () => {
    dispatchQueryFilter({ type: 'RESET_FILTERS' });
    dispatchProperty({
      type: 'RESET_SEARCH',
    });
    dispatchProperty({
      type: 'DISABLE_FIRST_RENDER',
    });
  };

  const statusHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_STATUS', status: value });
    dispatchProperty({
      type: 'DISABLE_FIRST_RENDER',
    });
  };

  const furnishStatusHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_FURNISH_STATUS', furnishStatus: value });
    dispatchProperty({
      type: 'DISABLE_FIRST_RENDER',
    });
  };

  const sortHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_SORT', sort: value });
    dispatchProperty({
      type: 'DISABLE_FIRST_RENDER',
    });
  };

  useEffect(() => {
    if (propertyError) {
      if (propertyError.data?.msg) {
        toast.error(propertyError.data.msg);
      } else {
        toast.error('Something went wrong!, please try again');
      }
    }

    if (propertyIsSuccess) {
      dispatchProperty({
        type: 'SET_TOTAL_COUNT',
        totalPages: propertyData.totalPages,
      });
      dispatchProperty({
        type: 'DISABLE_FIRST_RENDER',
      });
    }
  }, [propertyError, propertyIsSuccess, propertyData]);

  return (
    <div className='grid gap-5'>
      <PropertyFilterCard
        onSearch={searchHandler}
        onReset={resetFilterHandler}
        onStatus={statusHandler}
        onSort={sortHandler}
        onFurnishStatus={furnishStatusHandler}
        filters={queryFilterState}
        search={propertyState.search}
      />
      {(propertyIsLoading || propertyIsFetching) &&
      !propertyState.firstRender ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {new Array(12).fill(0).map((item, index) => {
            return <PropertyCardLoading key={index} />;
          })}
        </div>
      ) : !!propertyList.length ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {propertyList.map((property) => {
              return <PropertyCard key={property._id} property={property} />;
            })}
          </div>
          <Pagination
            isLoading={propertyIsLoading || propertyIsFetching}
            onNext={nextPageHandler}
            onPrev={prevPageHandler}
            pageNumber={queryFilterState.pageNumber}
            totalPageNumber={totalPageNumber}
          />
        </>
      ) : (
        <p className='m-auto text-lg'>No Properties Found</p>
      )}
    </div>
  );
};

export default PropertyList;
