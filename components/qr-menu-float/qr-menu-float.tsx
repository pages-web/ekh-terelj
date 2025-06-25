"use client"

import React, { useState } from "react"
import Image from "next/image"

const QRMenuFloat = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='fixed bottom-4 right-4 z-50 group'>
      <div className='relative bg-white rounded-lg shadow-lg p-3 max-w-[200px] sm:max-w-[250px] hover:shadow-xl transition-all duration-300 border border-gray-200'>
        <button
          onClick={() => setIsVisible(false)}
          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200'
          aria-label='Хаах'
        >
          ×
        </button>

        <div className='text-center'>
          <div className='relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mx-auto mb-2'>
            <Image
              src='/images/qrmenu.png'
              alt='QR Menu'
              fill
              className='object-contain'
              sizes='(max-width: 640px) 120px, 150px'
            />
          </div>

          <div className='text-center'>
            <p className='text-xs sm:text-sm font-medium text-gray-800 leading-tight'>
              СЭТГЭЛ ХАНАМЖИЙН
              <br />
              СУДАЛГААНЫ
            </p>
            <p className='text-xs text-gray-600 mt-1'>QR код уншуулна уу</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRMenuFloat
