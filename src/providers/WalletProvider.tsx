import type { AppKitNetwork } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type PropsWithChildren } from 'react'
import { bscTestnet } from 'viem/chains'
import { injected, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const projectId = import.meta.env.VITE_PROJECT_ID || ''

const metadata = {
  name: 'Web3 Project',
  description: 'My Web3 Application',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bscTestnet]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  connectors: [injected()]
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: bscTestnet,
  projectId,
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default WalletProvider
