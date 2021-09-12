import { timelyApi } from '../timely';

const editRecurringTasks = timelyApi.injectEndpoints({
  endpoints: (builder) => ({
    addRecurring: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tasks/${id}/recurring`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Tasks'],
    }),

    editRecurring: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tasks/${id}/recurring`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: ['Tasks'],
    }),

    deleteRecurring: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/recurring`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

    completeRecurringTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/recurring/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks', 'AreaWithBuckets', 'Bucket'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddRecurringMutation,
  useEditRecurringMutation,
  useDeleteRecurringMutation,
  useCompleteRecurringTaskMutation,
} = editRecurringTasks;
