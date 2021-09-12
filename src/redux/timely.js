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
  tagTypes: ['TimeUnit', 'Tasks'],
  endpoints: (builder) => ({}),
});
