import { I18nProvider } from '@lingui/react'
import { useAtomValue } from 'jotai/react'
import React, { PropsWithChildren, useEffect } from 'react'

import i18n, { importLocale } from '@/i18n'
import { localeAtom } from '@/stores/app'

const I18nLocaleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const locale = useAtomValue(localeAtom)

  useEffect(() => {
    importLocale(locale)
  }, [locale])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

export default I18nLocaleProvider
