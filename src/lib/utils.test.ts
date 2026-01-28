import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('should handle conditional classes', () => {
    expect(cn('px-2', true && 'py-1')).toBe('px-2 py-1')
    expect(cn('px-2', false && 'py-1')).toBe('px-2')
  })

  it('should merge conflicting tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('should handle objects', () => {
    expect(cn({ 'px-2': true, 'py-1': false })).toBe('px-2')
  })

  it('should handle arrays', () => {
    expect(cn(['px-2', 'py-1'])).toBe('px-2 py-1')
  })

  it('should handle empty input', () => {
    expect(cn()).toBe('')
  })

  it('should handle undefined and null', () => {
    expect(cn('px-2', undefined, null, 'py-1')).toBe('px-2 py-1')
  })
})
