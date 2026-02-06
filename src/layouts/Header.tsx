import React from 'react'

import NavDrawer from '@/components/common/NavDrawer'

const Header: React.FC = () => {
  return (
    <header className="viewport flex h-16 items-center justify-between border-b">
      <NavDrawer />
      <appkit-button />
    </header>
  )
}

export default Header
