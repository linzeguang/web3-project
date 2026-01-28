import { describe, expect, it } from 'vitest'

import { add, divide, multiply, subtract } from './math'

describe('Math operations', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 2)).toBe('3')
      expect(add('100', '200')).toBe('300')
    })

    it('should handle large numbers', () => {
      expect(add('999999999999999999', '1')).toBe('1000000000000000000')
    })

    it('should handle decimal numbers', () => {
      expect(add('1.5', '2.3')).toBe('3.8')
    })
  })

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe('2')
      expect(subtract('500', '200')).toBe('300')
    })

    it('should handle negative results', () => {
      expect(subtract(3, 5)).toBe('-2')
    })

    it('should handle decimal numbers', () => {
      expect(subtract('5.5', '2.3')).toBe('3.2')
    })
  })

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).toBe('12')
      expect(multiply('10', '20')).toBe('200')
    })

    it('should handle large numbers', () => {
      expect(multiply('999999999999999999', '2')).toBe('1999999999999999998')
    })

    it('should handle decimal numbers', () => {
      expect(multiply('2.5', '4')).toBe('10')
    })
  })

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe('5.000000000000000000')
      expect(divide('100', '4')).toBe('25.000000000000000000')
    })

    it('should handle decimal results', () => {
      expect(divide(1, 3, 4)).toBe('0.3333')
    })

    it('should respect decimal places parameter', () => {
      expect(divide('1', '3', 2)).toBe('0.33')
      expect(divide('1', '3', 6)).toBe('0.333333')
    })

    it('should default to 18 decimal places', () => {
      const result = divide('1', '3')
      expect(result).toMatch(/^0\.\d{18}$/)
    })
  })
})
