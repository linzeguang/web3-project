import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react'
import { useLocalStorage } from 'react-use'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

// Key to store the theme preference in localStorage
export const THEME_STORAGE_KEY = 'theme'

interface ThemeContextState {
  theme?: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme | undefined>>
}

const ThemeContext = React.createContext<ThemeContextState>(
  {} as ThemeContextState
)

export const useTheme = () => React.useContext(ThemeContext)

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    THEME_STORAGE_KEY,
    Theme.SYSTEM
  )

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
