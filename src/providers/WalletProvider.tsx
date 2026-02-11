import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'

import { metadata, networks, projectId, wagmiAdapter } from '@/libs/reown'

const queryClient = new QueryClient()

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  enableCoinbase: false,
  enableWalletGuide: false
})

const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <appkit-button />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default WalletProvider
