import { t } from '@lingui/core/macro'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Link } from 'react-router'

import logoSrc from '@/assets/react.svg'
import { RuotePath } from '@/routes'

import LanguageDrawer from './LanguageDrawer'
import ThemeToggle from './ThemeToggle'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'

const NavDrawer: React.FC = () => {
  const items = [
    { label: t`首页`, to: RuotePath.HOME },
    { label: t`池子`, to: RuotePath.POOL }
  ]

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <HamburgerMenuIcon className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle>
            <img src={logoSrc} alt="Logo" className="h-6 w-auto" />
          </DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 p-3">
          {items.map((item) => (
            <DrawerClose key={item.to} asChild>
              <Link
                to={item.to}
                className="hover:bg-muted rounded-md px-3 py-2 text-sm"
              >
                <div className="font-medium">{item.label}</div>
              </Link>
            </DrawerClose>
          ))}
        </nav>
        <DrawerFooter className="border-t">
          <ThemeToggle />
          <LanguageDrawer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NavDrawer
