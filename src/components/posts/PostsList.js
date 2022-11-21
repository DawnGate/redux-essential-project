import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  // fetchPosts,
  // selectAllPosts,
  selectPostById,
  // selectPostIds,
} from '../../slices/posts/postsSlice'
import { Spinner } from '../spinner/Spinner'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import classnames from 'classnames'

import { useGetPostsQuery } from '../../features/api/apiSlice'

const PostExcerpt = ({ post }) => {
  // const post = useSelector((state) => selectPostById(state, postId))
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
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    // if some error occur
    error,
    refetch,
  } = useGetPostsQuery()

  // const dispatch = useDispatch()
  // const orderPostIds = useSelector(selectPostIds)
  // const posts = useSelector(selectAllPosts)
  // const postStatus = useSelector((state) => state.posts.status)
  // const error = useSelector((state) => state.posts.error)

  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postStatus, dispatch])

  const sortedPosts = useMemo(() => {
    // memo the sorted posts list
    const sortedPosts = posts.slice()
    // sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    // const orderPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date))
    // content = orderPosts.map((post) => {
    //   return <PostExcerpt post={post} key={post.id} />
    // })
    const renderedPosts = sortedPosts.map((post) => {
      return <PostExcerpt post={post} key={post.id} />
    })

    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
