import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Navbar } from './app/Navbar'
import { AddPostForm } from './components/posts/AddPostForm'

import { PostsList } from './components/posts/PostsList'

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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
