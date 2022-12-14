import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Navbar } from './app/Navbar'
import { NotificationsList } from './components/notifications/NotificationsList'
import { AddPostForm } from './components/posts/AddPostForm'
import { EditPostForm } from './components/posts/EditPostForm'

import { PostsList } from './components/posts/PostsList'
import { SinglePostPage } from './components/posts/SinglePostPage'
import { UserPage } from './components/users/UserPage'
import { UsersList } from './components/users/UsersList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                <PostsList />
                <AddPostForm />
              </React.Fragment>
            }
          />
          <Route exact path="/posts/:postId" element={<SinglePostPage />} />
          <Route exact path="/editPost/:postId" element={<EditPostForm />} />
          <Route exact path="/users" element={<UsersList />} />
          <Route exact path="/users/:userId" element={<UserPage />} />
          <Route exact path="/notifications" element={<NotificationsList />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
