import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllNotifications } from '../../slices/notifications/notificationsSlice'
import { selectAllUsers } from '../../slices/users/usersSlice'

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  const renderedNotifications = notifications.map((notification) => {
    console.log(notification)
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown Users',
    }
    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
