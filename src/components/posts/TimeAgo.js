import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'
export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timeAgo}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
