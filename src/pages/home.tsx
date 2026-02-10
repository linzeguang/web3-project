import React, { useEffect } from 'react'

import { findPetsByStatus, getInventory } from '@/services'

const Home: React.FC = () => {
  useEffect(() => {
    getInventory()
      .then((res) => {
        console.log('>>>>>> inventory: ', res)
      })
      .catch((err) => {
        console.error('>>>>>> getInventory error: ', err)
      })
    findPetsByStatus({
      query: { status: ['available', 'pending', 'sold'] }
    }).then((res) => {
      console.log('>>>>>> inventory: ', res)
    })
  }, [])
  return <div>home</div>
}

export default Home
