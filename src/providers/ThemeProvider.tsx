import { useAtomValue } from 'jotai/react'
import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react'

import { themeAtom } from '@/stores/app'
import { Theme } from '@/stores/constants'

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useAtomValue(themeAtom)

  const systemIsDark = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const shouldUseDark =
      theme === Theme.DARK || (theme === Theme.SYSTEM && systemIsDark)

    if (shouldUseDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [systemIsDark, theme])

  useEffect(() => {
    if (
      theme !== Theme.SYSTEM ||
      typeof window === 'undefined' ||
      !window.matchMedia
    ) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])

  return children
}

export default ThemeProvider
