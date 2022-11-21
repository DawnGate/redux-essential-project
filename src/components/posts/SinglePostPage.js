import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from '../../slices/posts/postsSlice'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'

import { Spinner } from '../spinner/Spinner'
import { useGetPostQuery } from '../../features/api/apiSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = useParams()

  const { data: post, isFetching, isSuccess, isError } = useGetPostQuery(postId)

  // const post = useSelector((state) => selectPostById(state, postId))

  if (!post && isError) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  if (isFetching) {
    return (
      <section>
        <Spinner text="Loading..." />
      </section>
    )
  } else if (isSuccess) {
    return (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <div>
            <PostAuthor userId={post.user} />
          </div>
          <p className="post-content">{post.content}</p>
          <ReactionButtons post={post} />
          <Link to={`/editPost/${postId}`} className="button">
            Edit Post
          </Link>
        </article>
      </section>
    )
  } else {
    return <section></section>
  }
}
