import { timelyApi } from '../timely';

const getTasks = timelyApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasksByWeek: builder.query({
      query: () => '/tasks/week',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit', 'Tasks'],
    }),
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ['TimeUnit', 'Tasks'],
    }),
    getOpenTasks: builder.query({
      query: () => '/tasks/open',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit', 'Tasks'],
    }),
    getOverdueTasks: builder.query({
      query: () => '/tasks/overdue',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit', 'Tasks'],
    }),
    getAreas: builder.query({
      query: () => '/areas',
      transformResponse: (response) => response.data,
      providesTags: ['Areas'],
    }),
    getAreaWithBucketList: builder.query({
      query: (name) => `/area/?area=${encodeURIComponent(name)}`,
      transformResponse: (response) => response.data,
      providesTags: ['AreaWithBuckets'],
    }),
    getTasksByBucket: builder.query({
      query: ({ area, bucket }) =>
        `/bucket/?area=area=${encodeURIComponent(
          area
        )}&bucket=${encodeURIComponent(bucket)}`,
      transformResponse: (response) => response.data,
      providesTags: ['Bucket', 'Tasks'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksByWeekQuery,
  useGetTaskByIdQuery,
  useGetOpenTasksQuery,
  useGetOverdueTasksQuery,
  useGetAreasQuery,
  useGetAreaWithBucketListQuery,
  useGetTasksByBucketQuery,
} = getTasks;
