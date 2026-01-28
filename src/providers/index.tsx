import React, { type PropsWithChildren } from 'react'

import I18nLocaleProvider from './I18nLocaleProvider'
import WalletProvider from './WalletProvider'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nLocaleProvider>
      <WalletProvider>{children}</WalletProvider>
    </I18nLocaleProvider>
  )
}

export default Providers
