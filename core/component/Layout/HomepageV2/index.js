import React from 'react'
import HomeFeatured from './homeFeatured'
import HomeAdvisor from './homeAdvisor'
import HomePathSucess from './homePathSucess'
import HomePartners from './homePartners'
import HomeGetApp from './homeGetApp'
import FAQ from '../../common/FAQ/FAQ'
import dynamic from 'next/dynamic'


const HomeHeader = dynamic(() => import('./homeHeader'), {
  ssr: false
})

const HomeBanner = dynamic(() => import('./homeBanner'), {
  ssr: false
})


function HomePageV2({ faqdata }) {
  
  return (
    <>
      <HomeHeader />
      <HomeBanner />
      <div style={{ minHeight: 'auto' }}> 
        <HomeFeatured />
      </div>
      <div className='bg-white'>
        <HomeAdvisor />
      </div>
      <HomePathSucess />
      <div className='pt-[20px] bg-[#F4F8FB]'>
        <FAQ faqdata={faqdata} />
      </div>
      <HomePartners />
      <HomeGetApp />
    </>
  )
}

export default HomePageV2
