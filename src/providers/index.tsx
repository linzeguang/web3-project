import React, { type PropsWithChildren } from 'react'

import I18nLocaleProvider from './I18nLocaleProvider'
import SWRProvider from './SWRProvider'
import ThemeProvider from './ThemeProvider'
import WalletProvider from './WalletProvider'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nLocaleProvider>
      <ThemeProvider>
        <SWRProvider>
          <WalletProvider>{children}</WalletProvider>
        </SWRProvider>
      </ThemeProvider>
    </I18nLocaleProvider>
  )
}

export default Providers
