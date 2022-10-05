import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [lastestNotification] = allNotifications
    const lastestTimestamp = lastestNotification ? lastestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${lastestTimestamp}`
    )
    return response.data
  }
)

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      //   state.push(...action.payload)
      notificationsAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach((notification) => {
        // all read notification will not isNew again
        notification.isNew = !notification.read
      })
      //   state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

// export const selectAllNotifications = (state) => state.notifications

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications)
