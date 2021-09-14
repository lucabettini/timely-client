import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_SERVER_URL}/api`
    : '/api';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('jwt');
    if (token) headers.set('jwt', token);
    return headers;
  },
});

const baseQueryWithRedirect = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === '401') {
    document.location.href = '/login';
  }
  return result;
};

export const timelyApi = createApi({
  reducerPath: 'timelyApi',
  baseQuery: baseQueryWithRedirect,
  tagTypes: ['TimeUnit', 'Tasks', 'Areas', 'AreaWithBuckets', 'Bucket'],
  endpoints: (builder) => ({}),
});
