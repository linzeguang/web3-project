import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useMemo } from 'react'
import { Address, erc20Abi } from 'viem'
import { useReadContract, useReadContracts } from 'wagmi'

export const useToken = (address: Address) => {
  const network = useAppKitNetwork()

  const { data } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address,
        functionName: 'decimals'
      },
      {
        abi: erc20Abi,
        address,
        functionName: 'symbol'
      },
      {
        abi: erc20Abi,
        address,
        functionName: 'name'
      }
    ]
  })

  return useMemo(() => {
    if (!data || !network.chainId) return null
    const [{ result: decimals }, { result: symbol }, { result: name }] = data
    if (!decimals) return null

    return new Token(
      network.chainId as number,
      address,
      decimals as number,
      symbol,
      name
    )
  }, [address, data, network.chainId])
}

export const useCurrencyAmount = (address: Address) => {
  const account = useAppKitAccount()
  const token = useToken(address)

  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address,
    functionName: 'balanceOf',
    args: [account.address as Address],
    query: {
      enabled: Boolean(account.address)
    }
  })

  return useMemo(() => {
    if (!token) return null
    return CurrencyAmount.fromRawAmount(token, balance?.toString() || '0')
  }, [token, balance])
}
