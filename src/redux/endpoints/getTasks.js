import { timelyApi } from '../timely';

const getTasks = timelyApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodayTasks: builder.query({
      query: () => '/tasks/today',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit', 'Tasks'],
    }),
    getTomorrowTasks: builder.query({
      query: () => '/tasks/tomorrow',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit', 'Tasks'],
    }),
    getWeekTasks: builder.query({
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
      query: (name) => `/area/${encodeURIComponent(name)}`,
      transformResponse: (response) => response.data,
      providesTags: ['AreaWithBuckets'],
    }),
    getTasksByBucket: builder.query({
      query: ({ area, bucket }) =>
        `/area/${encodeURIComponent(area)}/bucket/${encodeURIComponent(
          bucket
        )}`,
      transformResponse: (response) => response.data,
      providesTags: ['Bucket', 'Tasks'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTodayTasksQuery,
  useGetTomorrowTasksQuery,
  useGetWeekTasksQuery,
  useGetTaskByIdQuery,
  useGetOpenTasksQuery,
  useGetOverdueTasksQuery,
  useGetAreasQuery,
  useGetAreaWithBucketListQuery,
  useGetTasksByBucketQuery,
} = getTasks;
