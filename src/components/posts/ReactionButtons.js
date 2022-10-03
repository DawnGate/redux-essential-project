import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from '../../slices/posts/postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emojj]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
        className="muted-button reaction-button"
      >
        {emojj} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}
