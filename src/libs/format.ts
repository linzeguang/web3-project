import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

/**
 * 格式化钱包地址
 * @param address - 完整的钱包地址
 * @param startChars - 前面显示的字符数，默认为 6
 * @param endChars - 后面显示的字符数，默认为 4
 * @param ellipsis - 省略号，默认为 "..."
 * @returns 格式化后的地址，如 "0x1234...abcd"
 */
export function formatAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4,
  ellipsis: string = '...'
): string {
  if (!address) return ''

  const totalChars = startChars + endChars
  if (address.length <= totalChars) {
    return address
  }

  const start = address.slice(0, startChars)
  const end = address.slice(-endChars)
  return `${start}${ellipsis}${end}`
}

/**
 * 格式化时间
 * @param date - 日期对象、时间戳或日期字符串
 * @param format - 格式字符串，默认为 "MM-DD-YYYY HH:mm:ss"
 * @returns 格式化后的时间字符串
 */
export function formatDate(
  date: string | number | Date,
  format: string = 'MM-DD-YYYY HH:mm:ss'
): string {
  return dayjs(date).format(format)
}

/**
 * 格式化千分位
 * @param num - 要格式化的数字
 * @param decimalPlaces - 保留小数位数，默认为 2
 * @returns 格式化后的字符串，如 "1,234,567.89"
 */
export function formatThousands(
  num: BigNumber.Value,
  decimalPlaces: number = 2,
  roundingMode = BigNumber.ROUND_DOWN
): string {
  const bigNum = new BigNumber(num).toFixed(decimalPlaces, roundingMode)
  const [integerPart, decimalPart] = bigNum.split('.')

  // 格式化整数部分
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 处理小数部分
  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`
  }

  return formattedInteger
}

/**
 * 格式化数字为简写（K/M/B），小于 1 时用下标显示有效数字位
 * @param value - 要格式化的数字
 * @param decimalPlaces - 保留小数位数，默认为 2
 * @returns 格式化后的字符串，如 "1.23K", "4.56M", "7.89B", "0.0₅1"
 */
export function formatShortNumber(
  value: BigNumber.Value,
  decimalPlaces: number = 2
): string {
  const num = new BigNumber(value)
  const absNum = num.abs()

  if (absNum.gte(1e9)) {
    return num.div(1e9).toFixed(decimalPlaces) + 'B'
  }
  if (absNum.gte(1e6)) {
    return num.div(1e6).toFixed(decimalPlaces) + 'M'
  }
  if (absNum.gte(1e3)) {
    return num.div(1e3).toFixed(decimalPlaces) + 'K'
  }
  if (absNum.lt(1) && !num.isZero()) {
    // 例如 0.000001 => 0.0₅1
    const str = num.toFixed()
    const match = str.match(/^0\.0*(\d)(\d*)$/)
    if (match) {
      const zeros = str.match(/^0\.0*/)?.[0].length ?? 2
      const firstNonZeroIndex = zeros - 2 // 小数点后0的个数
      const subscriptMap: Record<string, string> = {
        '0': '₀',
        '1': '₁',
        '2': '₂',
        '3': '₃',
        '4': '₄',
        '5': '₅',
        '6': '₆',
        '7': '₇',
        '8': '₈',
        '9': '₉'
      }
      const subscript = String(firstNonZeroIndex)
        .split('')
        .map((c) => subscriptMap[c] || c)
        .join('')
      return `0.0${subscript}${match[1]}${match[2]}`
    }
    return num.toFixed(decimalPlaces)
  }
  return num.toFixed(decimalPlaces)
}
