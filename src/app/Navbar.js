import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchNotificationsWebsocket,
  selectAllNotifications,
  selectAllNotificationsMetadata,
  useGetNotificationsQuery,
} from '../slices/notifications/notificationsSlice'
export const Navbar = () => {
  const dispatch = useDispatch()

  useGetNotificationsQuery()

  // const notifications = useSelector(selectAllNotifications)

  const notificationsMetadata = useSelector(selectAllNotificationsMetadata)
  const numUnreadNotifications = notificationsMetadata.filter(
    (n) => !n.read
  ).length

  const fetchNewNotification = () => {
    dispatch(fetchNotificationsWebsocket())
  }

  let unreadNotificationsBadge
  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essential Example</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotification}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
