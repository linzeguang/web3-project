import { ExitIcon } from '@radix-ui/react-icons'
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo
} from '@reown/appkit/react'
import { CopyIcon } from 'lucide-react'
import React from 'react'
import { Address } from 'viem'

import { SUPPORT_TOKEN } from '@/constants/tokens'
import { useCurrencyAmount } from '@/hooks/useToken'
import { formatAddress } from '@/libs/format'

import Dialog from './common/Dialog'
import { Flex } from './ui/box'
import { Button } from './ui/button'

const TokenBalance: React.FC<{ address: Address }> = ({ address }) => {
  const currencyAmount = useCurrencyAmount(address)

  if (!currencyAmount) return null

  return (
    <Flex className="items-center justify-between">
      <div>
        <div className="text-sm">{currencyAmount?.currency.symbol}</div>
        <div className="text-xs text-gray-500">
          {currencyAmount?.currency.name}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm">{currencyAmount?.toSignificant(6)}</div>
        <Flex className="items-center space-x-1 text-gray-500">
          <div className="text-xs">{formatAddress(address)}</div>
          <CopyIcon className="size-3" />
        </Flex>
      </div>
    </Flex>
  )
}

const ConnectWallet: React.FC = () => {
  const { open } = useAppKit()
  const { address } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const { walletInfo } = useWalletInfo()

  if (!address) return <Button onClick={() => open()}>Connect Wallet</Button>

  return (
    <Dialog
      trigger={{
        asChild: true,
        children: (
          <Button>
            <img
              src={walletInfo?.icon}
              alt={walletInfo?.name}
              className="size-4"
            />
            <span>{formatAddress(address)}</span>
          </Button>
        )
      }}
      title={
        <Flex className="justify-between space-x-2">
          <Button variant="outline" className="rounded-full">
            <img
              src={walletInfo?.icon}
              alt={walletInfo?.name}
              className="size-5"
            />
            <span>{formatAddress(address)}</span>
            <CopyIcon className="size-3" />
          </Button>
          <Button
            variant="outline"
            className="text-destructive size-9 rounded-full"
            onClick={() => disconnect()}
          >
            <ExitIcon className="size-3" />
          </Button>
        </Flex>
      }
    >
      <div className="space-y-2">
        {SUPPORT_TOKEN.map((tokenAddress) => (
          <TokenBalance key={tokenAddress} address={tokenAddress} />
        ))}
      </div>
    </Dialog>
  )
}

export default ConnectWallet
