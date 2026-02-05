import React, { PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

import { fetcher } from '@/lib/services'

const SWRProvider: React.FC<PropsWithChildren> = (props) => {
  return (
    <SWRConfig
      {...props}
      value={{
        fetcher
      }}
    />
  )
}

export default SWRProvider
