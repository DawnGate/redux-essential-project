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
      providesTags: (result = [], error, arg) => {
        return [
          'Post',
          ...result.map((post) => ({ type: 'Post', id: post.id })),
        ]
      },
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'Post', id: arg }]
      },
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: (updatePost) => ({
        url: `/posts/${updatePost.id}`,
        method: 'PATCH',
        body: updatePost,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    // user api
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useGetUsersQuery,
} = apiSlice
