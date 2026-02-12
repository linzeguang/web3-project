import { Trans } from '@lingui/react/macro'
import { useAtom } from 'jotai/react'
import React from 'react'

import { Locale, LOCALES } from '@/i18n'
import { localeAtom } from '@/stores/app'

import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'

const LanguageDrawer: React.FC = () => {
  const [locale, setLocale] = useAtom(localeAtom)
  const currentLabel = LOCALES[locale].name

  const handleSelectLocale = async (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return
    }

    await setLocale(nextLocale)
  }

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button type="button" variant="outline" className="justify-between">
          <span>
            <Trans>当前语言</Trans>
          </span>
          <span className="text-muted-foreground text-xs">{currentLabel}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[70vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>
            <Trans>语言选择</Trans>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-4">
          {Object.values(LOCALES).map((item) => (
            <DrawerClose key={item.locale} asChild>
              <Button
                type="button"
                variant={item.locale === locale ? 'default' : 'outline'}
                className="justify-between"
                onClick={() => handleSelectLocale(item.locale)}
              >
                <span>{item.name}</span>
                {item.locale === locale ? (
                  <span className="text-xs">
                    <Trans>当前选择</Trans>
                  </span>
                ) : null}
              </Button>
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default LanguageDrawer
