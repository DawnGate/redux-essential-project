import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// define api slice object
export const apiSlice = createApi({
  // cache add in state.api
  reducerPath: 'api',
  tagTypes: ['Post'],
  // all request come from /fakeApi
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // specific some endpoint to request server
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } =
  apiSlice
