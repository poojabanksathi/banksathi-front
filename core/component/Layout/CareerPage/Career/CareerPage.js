import React from 'react'
import dynamic from 'next/dynamic'

const CareerSlider = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/CareerSlider/CareerSlider'), {
  ssr: false
})
const CareerBanner = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/CareerBanner/CareerBanner'), {
  ssr: false
})
const AbooutContent = dynamic(() => import('@/core/component/Layout/aboutUs/AboutContent'), {
  ssr: false
})
const WorkLife = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/WorkLife/WorkLife'), {
  ssr: false
})
const ViewOpenings = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/ViewOpenings/ViewOpenings'), {
  ssr: false
})
const WhyBankSathi = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/WhyBankSathi/WhyBankSathi'), {
  ssr: false
})
const Reviews = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/Reviews/Reviews'), {
  ssr: false
})
const CurrentOpenings = dynamic(() => import('@/core/component/Layout/CareerPage/CareerMain/CurrentOpenings/CurrentOpenings'), {
  ssr: false
})
const CareerPage = () => {
  return (
    <div>
      <div className='bg-[#844FCF]'>
        <CareerBanner />
      </div>
      <div className='bg-[#F4F8FB]'>
        <AbooutContent />
        <WorkLife />
        <CareerSlider />
        <ViewOpenings />
        <div className='mb-[60px]'>
          <WhyBankSathi />
        </div>
        <Reviews />
        <div className='bg-[#FFF] h-auto w-full pb-[80px]'>
          <CurrentOpenings />
        </div>
      </div>
    </div>
  )
}

export default CareerPage
