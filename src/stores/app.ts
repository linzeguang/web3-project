import { atomWithStorage } from 'jotai/utils'

import { Locale } from '@/i18n'

import { Theme, THEME_STORAGE_KEY } from './constants'

export const themeAtom = atomWithStorage(
  THEME_STORAGE_KEY,
  Theme.SYSTEM,
  undefined,
  {
    getOnInit: true
  }
)

export const localeAtom = atomWithStorage<Locale>(
  'locale',
  Locale.ZH,
  undefined,
  {
    getOnInit: true
  }
)
