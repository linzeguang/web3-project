import { AppKitNetwork, bscTestnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = import.meta.env.VITE_PROJECT_ID || ''

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'Web3 Project',
  description: 'My Web3 Application',
  url: 'https://reown.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bscTestnet]

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
