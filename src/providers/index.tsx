import React, { type PropsWithChildren } from 'react'

import I18nLocaleProvider from './I18nLocaleProvider'
import SWRProvider from './SWRProvider'
import WalletProvider from './WalletProvider'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nLocaleProvider>
      <SWRProvider>
        <WalletProvider>{children}</WalletProvider>
      </SWRProvider>
    </I18nLocaleProvider>
  )
}

export default Providers
