import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'

const NotAuthorized = dynamic(() => import('../../core/component/Layout/NotAuthorized'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

export default function Index({ businessCategorydata }) {

  return (
    <>
      <div className='bg-[#844FCF]'>
        <DynamicHeader />
      </div>
      <div className='bg-[#fff]'>
        <NotAuthorized />
        <MobileFooter />

      </div>
  
    </>
  )
}
