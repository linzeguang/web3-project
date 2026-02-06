import './styles/index.css'
import './styles/common.css'

import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import Providers from './providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Providers>
      <App />
    </Providers>
  </>
)
