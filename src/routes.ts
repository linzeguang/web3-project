import React from 'react'
import { createBrowserRouter } from 'react-router'

export enum RuotePath {
  HOME = '/'
}

export const router = createBrowserRouter([
  {
    Component: React.lazy(() => import('./layouts/RootLayout')),
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/home'))
      }
    ]
  }
])
