import apiSlice from '../../state/api/apiSlice';
import { omitNullishKeys } from '../../utils/helper';

const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: (applicationDetails) => ({
        url: '/application',
        method: 'POST',
        body: applicationDetails,
      }),
      invalidatesTags: [
        'Properties',
        'Property',
        'UserApplication',
        'UserProperties',
      ],
    }),
    getUserApplications: builder.query({
      query: (queries) => ({
        url: '/application',
        params: omitNullishKeys(queries),
      }),
      providesTags: ['UserApplication'],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/application/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'Properties',
        'Property',
        'UserApplication',
        'UserProperties',
      ],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetUserApplicationsQuery,
  useDeleteApplicationMutation,
} = applicationApiSlice;
