import apiSlice from '../../state/api/apiSlice';
import { omitNullishKeys } from '../../utils/helper';

const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (propertyDetails) => ({
        url: '/property',
        method: 'POST',
        body: propertyDetails,
      }),
      invalidatesTags: [
        'Properties',
        'Property',
        'UserProperties',
        'UserApplication',
      ],
    }),
    updateProperty: builder.mutation({
      query: ({ id, details }) => ({
        url: `/property/${id}`,
        method: 'PATCH',
        body: details,
      }),
      invalidatesTags: [
        'Properties',
        'Property',
        'UserProperties',
        'UserApplication',
      ],
    }),
    getAllProperties: builder.query({
      query: (queries) => ({
        url: '/property',
        params: omitNullishKeys(queries),
      }),
      providesTags: ['Properties'],
    }),
    getSingleProperty: builder.query({
      query: ({ queries, id }) => ({
        url: `/property/${id}`,
        params: omitNullishKeys(queries),
      }),
      providesTags: ['Property'],
    }),
    getUserProperties: builder.query({
      query: (queries) => ({
        url: '/property/my',
        params: omitNullishKeys(queries),
      }),
      providesTags: ['UserProperties'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/property/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'Properties',
        'Property',
        'UserProperties',
        'UserApplication',
      ],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetAllPropertiesQuery,
  useGetSinglePropertyQuery,
  useGetUserPropertiesQuery,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
} = propertyApiSlice;
