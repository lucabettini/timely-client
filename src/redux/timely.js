import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('jwt');
    if (token) headers.set('jwt', token);
    return headers;
  },
});

const baseQueryWithRedirect = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === '401') {
    document.location.href = '/login';
  } else if (result.error) {
    document.location.href = '/error';
  }
  return result;
};

export const timelyApi = createApi({
  reducerPath: 'timelyApi',
  baseQuery: baseQueryWithRedirect,
  tagTypes: ['TimeUnit', 'Tasks', 'Areas', 'AreaWithBuckets', 'Bucket'],
  endpoints: (builder) => ({}),
});
