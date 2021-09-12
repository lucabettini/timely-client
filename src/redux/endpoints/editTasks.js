import { timelyApi } from '../timely';

const editTasks = timelyApi.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (values) => ({
        url: `/tasks`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Tasks', 'Areas', 'AreaWithBuckets', 'Bucket'],
    }),

    editTask: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: ['Tasks', 'Areas', 'AreaWithBuckets', 'Bucket'],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks', 'Areas', 'AreaWithBuckets', 'Bucket'],
    }),

    toggleCompleteTask: builder.mutation({
      query: ({ id, complete }) => ({
        url: complete ? `/tasks/${id}/complete` : `/tasks/${id}/incomplete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks', 'AreaWithBuckets', 'Bucket'],
    }),

    editAreaName: builder.mutation({
      query: (values) => ({
        url: '/area',
        method: 'PATCH',
        body: values,
      }),
      invalidatesTags: ['Areas', 'AreaWithBuckets', 'Bucket'],
    }),

    editBucketName: builder.mutation({
      query: (values) => ({
        url: '/bucket',
        method: 'PATCH',
        body: values,
      }),
      invalidatesTags: ['AreaWithBuckets', 'Bucket'],
    }),

    deleteByBucket: builder.mutation({
      query: ({ area, bucket }) => ({
        url: `/bucket/?area=${encodeURIComponent(
          area
        )}&bucket=${encodeURIComponent(bucket)}`,
        method: 'DELETE',
      }),
    }),
    invalidatesTags: ['Areas', 'AreaWithBuckets', 'Bucket'],
  }),
  overrideExisting: false,
});

export const {
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useToggleCompleteTaskMutation,
  useEditAreaNameMutation,
  useEditBucketNameMutation,
  useDeleteByBucketMutation,
} = editTasks;
