import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { apiSlice } from '../../features/api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
//   },
// })

// export const selectAllUsers = (state) => state.users

// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId)

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        // capture response data before it can store to cached
        // use adapter to change query data to {ids: [], entities: []}
        return usersAdapter.setAll(initialState, responseData)
      },
    }),
  }),
})

export const { useGetUsersQuery } = userApiSlice

export const selectUsersResult = userApiSlice.endpoints.getUsers.select()

const emptyUsers = []

// export const selectAllUsers = createSelector(
// selectUsersResult,
// ?? => nullist coalescing operator => return left hand only when it
// not equal underfined or null
// (usersResult) => usersResult?.data ?? emptyUsers
// )

// export const selectUserById = createSelector(
// selectAllUsers,
// (state, userId) => userId,
// (users, userId) => users.find((user) => user.id === userId)
// )

const selectUsersData = createSelector(selectUsersResult, (usersResult) => {
  return usersResult.data
})

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => {
    return selectUsersData(state) ?? initialState
  })

// export default usersSlice.reducer
