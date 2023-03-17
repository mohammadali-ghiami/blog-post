import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router, routerV2 } from './routes'
import { Provider } from "react-redux"
import { store } from "./store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routerV2} />
    </Provider>
  </React.StrictMode>,
)