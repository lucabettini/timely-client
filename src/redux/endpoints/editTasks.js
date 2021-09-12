import { timelyApi } from '../timely';

const editTasks = timelyApi.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (values) => ({
        url: `/tasks`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Tasks'],
    }),
    addRecurring: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tasks/${id}/recurring`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Tasks'],
    }),
    editTask: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
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
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
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
    toggleCompleteTask: builder.mutation({
      query: ({ id, complete }) => ({
        url: complete ? `/tasks/${id}/complete` : `/tasks/${id}/incomplete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks'],
    }),
    completeRecurringTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/recurring/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTaskMutation,
  useAddRecurringMutation,
  useEditTaskMutation,
  useEditRecurringMutation,
  useDeleteTaskMutation,
  useDeleteRecurringMutation,
  useToggleCompleteTaskMutation,
  useCompleteRecurringTaskMutation,
} = editTasks;
