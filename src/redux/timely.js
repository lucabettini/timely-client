import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const timelyApi = createApi({
  reducerPath: 'timelyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('jwt');
      if (token) headers.set('jwt', token);
      return headers;
    },
  }),
  tagTypes: ['TimeUnit'],
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
    stopTimeUnit: builder.mutation({
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
  }),
});

export const {
  useGetActiveTimeUnitQuery,
  useStartTimeUnitMutation,
  useStopTimeUnitMutation,
} = timelyApi;