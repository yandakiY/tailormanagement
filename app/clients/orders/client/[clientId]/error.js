"use client"

import Link from 'next/link'
import React from 'react'

const error = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='font-bold text-3xl'>
        Unable to find this page
      </div>
      <div className='mt-4 border-b'>
        <Link href={'/'}>Go back home</Link>
      </div>
    </div>
  )
}

export default error