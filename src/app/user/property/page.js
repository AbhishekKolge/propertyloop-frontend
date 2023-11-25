'use client';
import { useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import _ from 'lodash';

import UserPropertyCard from '@/components/property/UserPropertyCard';
import Pagination from '@/components/layout/Pagination';
import PropertyFilterCard from '@/components/property/PropertyFilterCard';
import PropertyCardLoading from '@/components/property/PropertyCardLoading';
import PropertyForm from '@/components/property/PropertyForm';

import {
  useGetUserPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from '@/features/property/propertyApiSlice';

import { omitEmptyKeys } from '@/utils/helper';
import { useDebounce } from '@/hooks/optimization';

const propertyValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(20, 'Too long')
    .min(3, 'Too short')
    .required('Required'),
  description: Yup.string()
    .trim()
    .max(500, 'Too long')
    .min(10, 'Too short')
    .required('Required'),
  location: Yup.string()
    .trim()
    .max(20, 'Too long')
    .min(3, 'Too short')
    .required('Required'),
  furnishStatus: Yup.string()
    .oneOf(['unfurnished', 'furnished'])
    .required('Required'),
  carpetArea: Yup.number().optional(),
  price: Yup.number().optional(),
  status: Yup.string().oneOf(['open', 'closed']).optional(),
  propertyImage: Yup.mixed().required('Required'),
});

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

const Property = () => {
  const [currentEditProperty, setCurrentEditProperty] = useState({});
  const [showPropertyForm, setShowPropertyForm] = useState(false);
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
  } = useGetUserPropertiesQuery(queryFilterState);
  const [createProperty, { isLoading: createPropertyIsLoading }] =
    useCreatePropertyMutation();
  const [updateProperty, { isLoading: updatePropertyIsLoading }] =
    useUpdatePropertyMutation();

  const propertyFormik = useFormik({
    initialValues: {
      name: currentEditProperty.name || '',
      description: currentEditProperty.description || '',
      location: currentEditProperty.location || '',
      furnishStatus: currentEditProperty.furnishStatus || '',
      carpetArea: currentEditProperty.carpetArea || '',
      price: currentEditProperty.price || '',
      status: currentEditProperty.status || '',
      propertyImage: currentEditProperty.propertyImage || '',
    },
    enableReinitialize: true,
    validationSchema: propertyValidationSchema,
    onSubmit: (values) => {
      const isEditMode = !!currentEditProperty._id;
      const formData = new FormData();
      const propertyDetails = structuredClone(omitEmptyKeys(values));
      for (const key in propertyDetails) {
        if (Object.hasOwnProperty.call(propertyDetails, key)) {
          const value = propertyDetails[key];
          if (isEditMode) {
            if (propertyFormik.initialValues[key] !== propertyDetails[key]) {
              formData.append(key, value);
            }
          } else {
            formData.append(key, value);
          }
        }
      }
      if (isEditMode) {
        updateProperty({ details: formData, id: currentEditProperty._id })
          .unwrap()
          .then(() => {
            toast.success('Property updated successfully');
            setCurrentEditProperty({});
            propertyFormik.resetForm();
          })
          .catch((error) => {
            if (error.data?.msg) {
              toast.error(error.data.msg);
            } else {
              toast.error('Something went wrong!, please try again');
            }
          });
        return;
      }
      createProperty(formData)
        .unwrap()
        .then(() => {
          toast.success('Property created successfully');
          propertyFormik.resetForm();
        })
        .catch((error) => {
          if (error.data?.msg) {
            toast.error(error.data.msg);
          } else {
            toast.error('Something went wrong!, please try again');
          }
        });
    },
  });

  let totalPageNumber = propertyData?.totalPages;
  let propertyList = propertyData?.results;

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
  };

  const resetFilterHandler = () => {
    dispatchQueryFilter({ type: 'RESET_FILTERS' });
    dispatchProperty({
      type: 'RESET_SEARCH',
    });
  };

  const statusHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_STATUS', status: value });
  };

  const furnishStatusHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_FURNISH_STATUS', furnishStatus: value });
  };

  const sortHandler = (value) => {
    dispatchQueryFilter({ type: 'SET_SORT', sort: value });
  };

  const editPropertyHandler = (values) => {
    setCurrentEditProperty(values);
    setShowPropertyForm(true);
  };

  const togglePropertyFormHandler = (state) => {
    setCurrentEditProperty({});
    setShowPropertyForm(state);
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

  const isFormUpdated = _.isEqual(
    propertyFormik.initialValues,
    propertyFormik.values
  );

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
      <div className='flex justify-end'>
        <PropertyForm
          onToggle={togglePropertyFormHandler}
          open={showPropertyForm}
          isLoading={createPropertyIsLoading || updatePropertyIsLoading}
          formik={propertyFormik}
          disabled={
            createPropertyIsLoading || updatePropertyIsLoading || isFormUpdated
          }
        />
      </div>
      {propertyIsLoading || propertyIsFetching ? (
        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {new Array(12).fill(0).map((item, index) => {
            return <PropertyCardLoading key={index} />;
          })}
        </div>
      ) : !!propertyList.length ? (
        <>
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {propertyList.map((property) => {
              return (
                <UserPropertyCard
                  onEdit={editPropertyHandler}
                  key={property._id}
                  property={property}
                />
              );
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

export default Property;
