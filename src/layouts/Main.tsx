import React from 'react'
import { Outlet } from 'react-router'

const Main: React.FC = () => {
  return (
    <main className="viewport flex-1">
      <Outlet />
    </main>
  )
}

export default Main
