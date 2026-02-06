import React from 'react'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'

const RootLayout: React.FC = () => {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />
      <Main />
      <Footer />
    </section>
  )
}

export default RootLayout
