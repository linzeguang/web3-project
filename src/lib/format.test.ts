import BigNumber from 'bignumber.js'
import { describe, expect, it } from 'vitest'

import { formatAddress, formatDate, formatShortNumber, formatThousands } from './format'

describe('formatAddress', () => {
  it('should format address with default parameters', () => {
    expect(formatAddress('0x1234567890abcdefghijklmnopqrstuvwxyz')).toBe('0x1234...wxyz')
  })

  it('should return original address if length is less than or equal to total chars', () => {
    expect(formatAddress('0x1234')).toBe('0x1234')
    expect(formatAddress('0x123456789')).toBe('0x1234...6789')
  })

  it('should handle custom start and end chars', () => {
    expect(formatAddress('0x1234567890abcdefghijklmnopqrstuvwxyz', 8, 6)).toBe('0x123456...uvwxyz')
  })

  it('should handle custom ellipsis', () => {
    expect(formatAddress('0x1234567890abcdefghijklmnopqrstuvwxyz', 6, 4, '•••')).toBe('0x1234•••wxyz')
  })

  it('should handle empty address', () => {
    expect(formatAddress('')).toBe('')
  })

  it('should handle all custom parameters', () => {
    expect(formatAddress('0x1234567890abcdefghijklmnopqrstuvwxyz', 4, 3, ' - ')).toBe('0x12 - xyz')
  })
})

describe('formatDate', () => {
  it('should format date with default format', () => {
    const date = new Date('2024-12-25T15:30:45')
    const result = formatDate(date)
    expect(result).toMatch(/\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/)
  })

  it('should format date with timestamp', () => {
    const timestamp = 1735128645000
    const result = formatDate(timestamp, 'YYYY-MM-DD')
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/)
  })

  it('should format date string', () => {
    const result = formatDate('2024-12-25', 'YYYY年MM月DD日')
    expect(result).toBe('2024年12月25日')
  })

  it('should format with custom format', () => {
    const date = new Date('2024-12-25T15:30:45')
    const result = formatDate(date, 'HH:mm:ss')
    expect(result).toMatch(/\d{2}:\d{2}:\d{2}/)
  })

  it('should format with different patterns', () => {
    const date = new Date('2024-01-05T09:05:03')
    expect(formatDate(date, 'YYYY/MM/DD')).toBe('2024/01/05')
    expect(formatDate(date, 'DD-MM-YYYY')).toBe('05-01-2024')
  })
})

describe('formatThousands', () => {
  it('should format number with default decimal places', () => {
    expect(formatThousands(1234567.8)).toBe('1,234,567.80')
    expect(formatThousands('9876543.456')).toBe('9,876,543.45')
  })

  it('should format integer', () => {
    expect(formatThousands(1000000)).toBe('1,000,000.00')
    expect(formatThousands('5000')).toBe('5,000.00')
  })

  it('should handle custom decimal places', () => {
    expect(formatThousands('9876543.456', 3)).toBe('9,876,543.456')
    expect(formatThousands(1234567.8, 0)).toBe('1,234,567')
  })

  it('should handle large numbers with BigNumber', () => {
    const bigNum = new BigNumber('999999999999999999.99')
    expect(formatThousands(bigNum, 2)).toBe('999,999,999,999,999,999.99')
  })

  it('should handle small numbers', () => {
    expect(formatThousands(100)).toBe('100.00')
    expect(formatThousands(10)).toBe('10.00')
  })

  it('should handle zero', () => {
    expect(formatThousands(0)).toBe('0.00')
  })
})

describe('formatShortNumber', () => {
  it('should format thousands as K', () => {
    expect(formatShortNumber(1000)).toBe('1.00K')
    expect(formatShortNumber(12345)).toBe('12.35K')
  })

  it('should format millions as M', () => {
    expect(formatShortNumber(1000000)).toBe('1.00M')
    expect(formatShortNumber(12345678)).toBe('12.35M')
  })

  it('should format billions as B', () => {
    expect(formatShortNumber(1000000000)).toBe('1.00B')
    expect(formatShortNumber(9876543210)).toBe('9.88B')
  })

  it('should format less than 1 with subscript', () => {
    expect(formatShortNumber(0.000001)).toBe('0.0₅1')
    expect(formatShortNumber(0.0000123)).toBe('0.0₄123')
    expect(formatShortNumber(0.00000001)).toBe('0.0₇1')
    expect(formatShortNumber('0.00000099')).toBe('0.0₆99')
  })

  it('should format normal numbers', () => {
    expect(formatShortNumber(123.456)).toBe('123.46')
    expect(formatShortNumber(0)).toBe('0.00')
    expect(formatShortNumber(-1234)).toBe('-1.23K')
  })

  it('should handle BigNumber input', () => {
    expect(formatShortNumber(new BigNumber('1000000'))).toBe('1.00M')
    expect(formatShortNumber(new BigNumber('0.000001'))).toBe('0.0₅1')
  })

  it('should respect decimalPlaces parameter', () => {
    expect(formatShortNumber(12345, 1)).toBe('12.3K')
    expect(formatShortNumber(0.000012345, 4)).toBe('0.0₄12345')
  })
})
