import { I18nProvider } from '@lingui/react'
import { useAtomValue } from 'jotai/react'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import i18n, { importLocale } from '@/i18n'
import { localeAtom } from '@/stores/app'

const I18nLocaleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const locale = useAtomValue(localeAtom)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const loadLocale = async () => {
      await importLocale(locale)
      setReady(true)
    }

    loadLocale()

    return () => {
      setReady(false)
    }
  }, [locale])

  if (!ready) return null

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

export default I18nLocaleProvider
