import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter/counterSlice'
import postsReducer from './slices/posts/postsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
})
