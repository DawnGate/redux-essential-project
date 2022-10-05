import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter/counterSlice'
import postsReducer from './slices/posts/postsSlice'
import usersReducer from './slices/users/usersSlice'
import notificationsReducer from './slices/notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})
