import { timelyApi } from '../timely';

const getTasks = timelyApi.injectEndpoints({
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
    getOverdueTasks: builder.query({
      query: () => '/tasks/overdue',
      transformResponse: (response) => response.data,
      providesTags: ['TimeUnit'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksByWeekQuery,
  useGetTaskByIdQuery,
  useGetOpenTasksQuery,
  useGetOverdueTasksQuery,
} = getTasks;
