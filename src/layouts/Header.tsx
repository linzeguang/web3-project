import React from 'react'

import NavDrawer from '@/components/common/NavDrawer'
import ConnectWallet from '@/components/ConnectWallet'

const Header: React.FC = () => {
  return (
    <header className="viewport flex h-16 items-center justify-between border-b">
      <NavDrawer />
      <ConnectWallet />
    </header>
  )
}

export default Header
