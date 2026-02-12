import React from 'react'

import ConnectWallet from '@/components/ConnectWallet'
import NavDrawer from '@/components/NavDrawer'

const Header: React.FC = () => {
  return (
    <header className="viewport flex h-16 items-center justify-between border-b">
      <NavDrawer />
      <ConnectWallet />
    </header>
  )
}

export default Header
