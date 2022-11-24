import React from 'react'
// import { useDispatch } from 'react-redux'
// import { reactionAdded } from '../../slices/posts/postsSlice'
import { useAddReactionMutation } from '../../features/api/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation()
  // const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          // dispatch(reactionAdded({ postId: post.id, reaction: name }))
          addReaction({ postId: post.id, reaction: name })
        }
        className="muted-button reaction-button"
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}
