import React from 'react'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { router } from './routes'

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        hideProgressBar
        closeOnClick
        draggable
      />
    </>
  )
}

export default App
