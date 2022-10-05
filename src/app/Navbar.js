import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications } from '../slices/notifications/notificationsSlice'
export const Navbar = () => {
  const dispatch = useDispatch()

  const fetchNewNotification = () => {
    dispatch(fetchNotifications())
  }
  return (
    <nav>
      <section>
        <h1>Redux Essential Example</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications</Link>
          </div>
          <button className="button" onClick={fetchNewNotification}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
