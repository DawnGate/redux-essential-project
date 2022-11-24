import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit'

import { createSelector } from '@reduxjs/toolkit'
import { forceGenerateNotifications } from '../../api/server'
import { apiSlice } from '../../features/api/apiSlice'

import { client } from '../../api/client'

const notificationsReceived = createAction(
  'notifications/notificationsReceived'
)

export const extendApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notifications',
    }),
    async onCachedEntryAdd(
      arg,
      { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
    ) {
      const ws = new WebSocket('ws://localhost')
      try {
        await cacheDataLoaded

        const listener = (event) => {
          const message = JSON.parse(event.data)
          switch (message.type) {
            case 'notifications':
              updateCachedData((draft) => {
                draft.push(...message.payload)
                draft.sort((a, b) => b.date.localeCompare(a.date))
              })
              dispatch(notificationsReceived(message.payload))
              break
            default:
              break
          }
        }

        ws.addEventListener('message', listener)
      } catch {}
      await cacheEntryRemoved
      ws.close()
    },
  }),
})

export const { useGetNotificationsQuery } = extendApi

const emptyNotifications = []

export const selectNotificationsResult =
  extendApi.endpoints.getNotifications.select()

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data ?? emptyNotifications
)

export const fetchNotificationsWebsocket = () => (dispatch, getState) => {
  const allNotifications = selectNotificationsData(getState())
  const [lastestNotification] = allNotifications
  const lastestTimestamp = lastestNotification?.date ?? ''
  console.log(lastestTimestamp)
  forceGenerateNotifications(lastestTimestamp)
}

// export const fetchNotifications = createAsyncThunk(
//   'notifications/fetchNotifications',
//   async (_, { getState }) => {
//     const allNotifications = selectAllNotifications(getState())
//     const [lastestNotification] = allNotifications
//     const lastestTimestamp = lastestNotification ? lastestNotification.date : ''
//     const response = await client.get(
//       `/fakeApi/notifications?since=${lastestTimestamp}`
//     )
//     return response.data
//   }
// )

const notificationsAdapter = createEntityAdapter()

const matchNotificationsReceived = isAnyOf(
  notificationsReceived,
  extendApi.endpoints.getNotifications.matchFulfilled
)

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
    // builder.addCase(fetchNotifications.fulfilled, (state, action) => {
    //   //   state.push(...action.payload)
    //   notificationsAdapter.upsertMany(state, action.payload)
    //   Object.values(state.entities).forEach((notification) => {
    //     // all read notification will not isNew again
    //     notification.isNew = !notification.read
    //   })
    //   //   state.sort((a, b) => b.date.localeCompare(a.date))
    // })
    builder.addMatcher(matchNotificationsReceived, (state, action) => {
      const notificationsMetadata = action.payload.map((notification) => ({
        id: notification.id,
        read: false,
        isNew: true,
      }))

      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })

      notificationsAdapter.upsertMany(state, notificationsMetadata)
    })
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

// export const selectAllNotifications = (state) => state.notifications

export const {
  selectAll: selectAllNotificationsMetadata,
  selectEntities: selectMetadatEntities,
} = notificationsAdapter.getSelectors((state) => state.notifications)
