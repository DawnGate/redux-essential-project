import { createSelector } from '@reduxjs/toolkit'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useGetPostsQuery } from '../../features/api/apiSlice'
import {
  // selectAllPosts,
  selectPostByUser,
} from '../../slices/posts/postsSlice'
import { selectUserById } from '../../slices/users/usersSlice'

export const UserPage = () => {
  const { userId } = useParams()

  const user = useSelector((state) => selectUserById(state, userId))

  //   const postsForUser = useSelector((state) => {
  //     const allPosts = selectAllPosts(state)
  //     return allPosts.filter((post) => post.user === userId)
  //   })

  const selectPostsForUser = useMemo(() => {
    const emptyArray = []
    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    )
  }, [])

  const emptyArray = []

  const test = createSelector(
    (res) => res.data,
    (res, userId) => userId,
    (data, userId) => data?.filter((post) => post.user === userId) ?? emptyArray
  )

  // const postsForUser = useSelector((state) => selectPostByUser(state, userId))

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => {
      console.log(result)

      return {
        ...result,
        postsForUser: selectPostsForUser(result, userId),
        // postsForUser: test(result, userId),
      }
    },
  })

  console.log(postsForUser)

  const postsTitle = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postsTitle}</ul>
    </section>
  )
}
