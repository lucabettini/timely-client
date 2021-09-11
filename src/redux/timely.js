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
    getTasksByWeek: builder.query({
      query: () => '/tasks/week',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit'],
    }),
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ['TimeUnit'],
    }),
    getOpenTasks: builder.query({
      query: () => '/tasks/open',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit'],
    }),
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
});

export const {
  useGetTasksByWeekQuery,
  useGetTaskByIdQuery,
  useGetOpenTasksQuery,
  useGetActiveTimeUnitQuery,
  useStartTimeUnitMutation,
  useEditTimeUnitMutation,
  useDeleteTimeUnitMutation,
} = timelyApi;
