import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react'
import React, { useEffect } from 'react'
import { Address } from 'viem'
import { useBalance } from 'wagmi'

import { formatAddress } from '@/lib/format'

import { Button } from './ui/button'

const ConnectWallet: React.FC = () => {
  const { open } = useAppKit()
  const { address } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  const { data } = useBalance({
    address: address as Address
  })

  useEffect(() => {
    console.log('>>>>>> data: ', data)
  }, [data])

  if (!address) return <Button onClick={() => open()}>Connect Wallet</Button>

  return <Button onClick={() => disconnect()}>{formatAddress(address)}</Button>
}

export default ConnectWallet
