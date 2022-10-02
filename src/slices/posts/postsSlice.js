import { createSlice } from '@reduxjs/toolkit'
const initialState = [
  { id: '1', title: 'first Post!', content: 'Hello' },
  {
    id: '2',
    title: 'Second post!',
    content: 'Hello',
  },
]
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})
export default postSlice.reducer
