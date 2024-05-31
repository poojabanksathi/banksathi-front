import React from 'react'
import Image from 'next/image'
import { mockImageData } from '../data'

const CareerSlider = () => {
  return (
    <div className='mt-[3.75rem] mb-[50px]'>
      <div className='overflow-x-auto'>
        <div className='careerSliderClass'>
          {mockImageData?.map((imageData) => {
            return (
              <div className='pr-6' key=''>
                <Image src={imageData?.image} width={300} height={200} alt='img' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CareerSlider
