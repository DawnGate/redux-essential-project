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
    addReaction: builder.mutation({
      query: ({ reaction, postId }) => ({
        url: `/posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction },
      }),
      // this invalidate make api call new getPost api to update
      // posts current cache
      //   invalidatesTags: (result, error, arg) => [
      //     { type: 'Post', id: arg.postId },
      //   ],
      // this is a optimize approach call update optimise
      // this effect on user experience first
      async onQueryStarted({ reaction, postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((post) => post.id === postId)
            if (post) {
              post.reactions[reaction]++
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    // user api
    // getUsers: builder.query({
    //   query: () => '/users',
    // }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
  //   useGetUsersQuery,
} = apiSlice
