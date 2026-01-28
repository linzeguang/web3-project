import React, { type PropsWithChildren } from 'react'

import WalletProvider from './WalletProvider'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>
}

export default Providers
