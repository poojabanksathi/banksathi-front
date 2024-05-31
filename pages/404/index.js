import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'

const DynamicNotFound = dynamic(() => import('@/core/component/Layout/pageNotFound'), {
  ssr: false
});
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
});
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
});
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
});

export default function Index({businessCategorydata }) {
  return (
    <>
      <div>
        <div className='bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata}/>
        </div>
        <div className='bg-[#fff]'>
          <DynamicNotFound />
          <MobileFooter />
          <DynamicFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}


