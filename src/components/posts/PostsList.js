import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchPosts,
  // selectAllPosts,
  selectPostById,
  selectPostIds,
} from '../../slices/posts/postsSlice'
import { Spinner } from '../spinner/Spinner'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const orderPostIds = useSelector(selectPostIds)
  // const posts = useSelector(selectAllPosts)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // const orderPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date))
    // content = orderPosts.map((post) => {
    //   return <PostExcerpt post={post} key={post.id} />
    // })
    content = orderPostIds.map((postId) => {
      return <PostExcerpt postId={postId} key={postId} />
    })
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
