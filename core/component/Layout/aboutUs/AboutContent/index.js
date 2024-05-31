import React from 'react'
import aboutBanner from '../../../../../public/assets/about_us_leaders.jpg'
import Image from 'next/image'

export default function AbooutContent() {
  return (
    <div className='bg-[#F4F8FB] text-[#212529]'>
      <div className='container mx-auto max-[991px]:max-w-full max-[1024px]:px-6 max-[834px]:h-[250px] max-[576px]:h-[175px] max-[479px]:h-[120px] max-[393px]:h-[100px] max-[320px]:h-[76px] '>
        <Image src={aboutBanner} className='relative bottom-24 mx-auto w-full rounded-2xl max-w-[92%]' alt='img' />
      </div>
    </div>
  )
}
