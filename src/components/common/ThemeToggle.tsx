import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { useAtom } from 'jotai/react'
import React from 'react'

import { themeAtom } from '@/stores/app'
import { Theme } from '@/stores/constants'

import { Button } from '../ui/button'

const themeOrder: Theme[] = [Theme.SYSTEM, Theme.LIGHT, Theme.DARK]

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const currentTheme = theme ?? Theme.SYSTEM
  const currentIndex = themeOrder.indexOf(currentTheme)
  const nextTheme =
    themeOrder[(currentIndex + 1) % themeOrder.length] ?? Theme.SYSTEM

  const themeLabels: Record<Theme, string> = {
    [Theme.SYSTEM]: t`跟随系统`,
    [Theme.LIGHT]: t`浅色`,
    [Theme.DARK]: t`深色`
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="justify-between"
      onClick={() => setTheme(nextTheme)}
    >
      <span>
        <Trans>主题</Trans>
      </span>
      <span className="text-muted-foreground text-xs">
        {themeLabels[currentTheme]}
      </span>
    </Button>
  )
}

export default ThemeToggle
