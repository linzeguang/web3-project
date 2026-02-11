import { bsc, bscTestnet } from '@reown/appkit/networks'
import { Currency, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import { Address } from 'viem'

export class Native extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'BNB', 'Binance Chain Native Token')
  }

  public get wrapped(): Token {
    const WBNB = WETH9[bsc.id]
    return new Token(
      bscTestnet.id,
      '0xae13d989dac2f0debff460ac112a837c89baa7cd', // WBNB testnet address
      WBNB.decimals,
      WBNB.symbol,
      WBNB.name
    )
  }

  private static _etherCache: { [chainId: number]: Native } = {}

  public static onChain(chainId: number): Native {
    return (
      this._etherCache[chainId] ??
      (this._etherCache[chainId] = new Native(chainId))
    )
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}

export const BNB = Native.onChain(bscTestnet.id)
export const WBNB = BNB.wrapped

export const SUPPORT_TOKEN = [
  WBNB.address, // wbnb
  '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee', // busd
  '0x64544969ed7ebf5f083679233325356ebe738930', // usdc
  '0xfa60d973f7642b748046464e165a65b7323b0dee' // cake
] as Address[]
