// import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from '../../slices/posts/postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded(
          //   id: nanoid(),
          title,
          content,
          userId
        )
      )
      setTitle('')
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

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
