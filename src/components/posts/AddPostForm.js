import React, { useState } from 'react'
export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

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
        <label htmlFor="postContent">Post Content: </label>
        <input
          type="text"
          id="postContent"
          value={content}
          name="postContent"
          onChange={onContentChanged}
        ></input>
        <button type="button">Save Post</button>
      </form>
    </section>
  )
}
