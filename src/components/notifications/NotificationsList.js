import classNames from 'classnames'
import { formatDistanceToNow, parseISO } from 'date-fns'
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  allNotificationsRead,
  selectAllNotifications,
  useGetNotificationsQuery,
  selectMetadatEntities,
} from '../../slices/notifications/notificationsSlice'
import { selectAllUsers } from '../../slices/users/usersSlice'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  // const notifications = useSelector(selectAllNotifications)
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useSelector(selectMetadatEntities)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown Users',
    }

    const metadata = notificationsMetadata[notification.id]

    const notificationClassname = classNames('notification', {
      new: metadata.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
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
