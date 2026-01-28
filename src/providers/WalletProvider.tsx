import type { AppKitNetwork } from '@reown/appkit/networks'
import { AppKitProvider } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import React, { type PropsWithChildren } from 'react'
import { bscTestnet, mainnet } from 'viem/chains'

const projectId = import.meta.env.VITE_PROJECT_ID || ''

const metadata = {
  name: 'Web3 Project',
  description: 'My Web3 Application',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, bscTestnet]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppKitProvider
      adapters={[wagmiAdapter]}
      projectId={projectId}
      networks={networks}
      metadata={metadata}
      enableCoinbase={false}
      enableWalletGuide={false}
      debug={true}
      features={{
        analytics: false,
        email: false,
        socials: false
      }}
    >
      {children}
    </AppKitProvider>
  )
}

export default WalletProvider
