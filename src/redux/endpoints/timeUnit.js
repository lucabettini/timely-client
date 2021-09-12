import { timelyApi } from '../timely';

const timeUnit = timelyApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveTimeUnit: builder.query({
      query: () => '/time_unit',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit'],
    }),
    startTimeUnit: builder.mutation({
      query: ({ taskId, startTime }) => ({
        url: `/tasks/${taskId}/time_unit`,
        method: 'POST',
        body: {
          start_time: startTime,
        },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['TimeUnit'],
    }),
    editTimeUnit: builder.mutation({
      query: ({ id, startTime, endTime }) => ({
        url: `/time_unit/${id}`,
        method: 'PUT',
        body: {
          start_time: startTime,
          end_time: endTime,
        },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['TimeUnit'],
    }),
    deleteTimeUnit: builder.mutation({
      query: (id) => ({
        url: `/time_unit/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TimeUnit'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveTimeUnitQuery,
  useStartTimeUnitMutation,
  useEditTimeUnitMutation,
  useDeleteTimeUnitMutation,
} = timeUnit;
