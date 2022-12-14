import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { worker } from './api/server'
import { fetchUsers } from './slices/users/usersSlice'
import { userApiSlice } from './slices/users/usersSlice'

const container = document.getElementById('root')
const root = createRoot(container)

async function start() {
  await worker.start({ onUnhandleRequest: 'bypass' })
  // store.dispatch(fetchUsers())
  store.dispatch(userApiSlice.endpoints.getUsers.initiate())
  return root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

start()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
