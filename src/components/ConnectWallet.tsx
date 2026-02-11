import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react'
import React from 'react'

import { formatAddress } from '@/libs/format'

import { Button } from './ui/button'

const ConnectWallet: React.FC = () => {
  const { open } = useAppKit()
  const { address } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  if (!address) return <Button onClick={() => open()}>Connect Wallet</Button>

  return <Button onClick={() => disconnect()}>{formatAddress(address)}</Button>
}

export default ConnectWallet
