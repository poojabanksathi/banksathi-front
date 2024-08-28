import React from 'react'
import dynamic from 'next/dynamic'

const DynamicNotFound = dynamic(() => import('@/core/component/Layout/pageNotFound'), {
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
        <div className='bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata}/>
        </div>
        <div className='bg-[#fff]'>
          <DynamicNotFound />
          <MobileFooter />
       
        </div>


    </>
  )
}


