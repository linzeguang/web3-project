import React from 'react'
import { Outlet } from 'react-router'

import { Button } from '@/components/ui/button'
import { Theme, useTheme } from '@/providers/ThemeProvider'

const RootLayout: React.FC = () => {
  const { setTheme } = useTheme()

  return (
    <>
      <header>
        <Button onClick={() => setTheme(Theme.LIGHT)}>{Theme.LIGHT}</Button>
        <Button onClick={() => setTheme(Theme.DARK)}>{Theme.DARK}</Button>
        <Button onClick={() => setTheme(Theme.SYSTEM)}>{Theme.SYSTEM}</Button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>header</footer>
    </>
  )
}

export default RootLayout
