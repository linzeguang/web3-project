import { Trans } from '@lingui/react/macro'
import { AppKitButton } from '@reown/appkit/react'
import React from 'react'

import { Button } from './components/ui/button'

const App: React.FC = () => {
  return (
    <div>
      <AppKitButton />
      <Button>
        <Trans>哈哈</Trans>
      </Button>
    </div>
  )
}

export default App
