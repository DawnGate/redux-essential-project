import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

// define api slice object
export const apiSlice = createApi({
  // cache add in state.api
  reducerPath: 'api',
  // all request come from /fakeApi
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // specific some endpoint to request server
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
  }),
})

export const { useGetPostsQuery } = apiSlice
