// import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddNewPostMutation } from '../../features/api/apiSlice'
import { addNewPost } from '../../slices/posts/postsSlice'
import { selectAllUsers } from '../../slices/users/usersSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  // const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  // const dispatch = useDispatch()

  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const users = useSelector(selectAllUsers)

  // const canSave =
  // [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // setAddRequestStatus('pending')
        //upwrap is a new promise of thunk, using for create state of post request, it using for try catch block when error occur
        // await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        //

        await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('Fail to save post: ', err)
      } finally {
        // setAddRequestStatus('idle')
      }
    }
  }

  //   const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          value={title}
          name="postTitle"
          onChange={onTitleChanged}
        ></input>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          id="postContent"
          value={content}
          name="postContent"
          onChange={onContentChanged}
        ></textarea>

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
