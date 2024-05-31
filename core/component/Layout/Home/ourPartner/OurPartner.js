import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const KnowledgeBase = dynamic(() => import('@/core/component/common/CommonList/KnowledgeBase'), {
  ssr: false
})
const OurPartnerBrand = dynamic(() => import('@/core/component/common/OurPartnerBrand'), {
  ssr: false
})
const TutorialsBase = dynamic(() => import('@/core/component/common/CommonList/TutorialsBase'), {
  ssr: false
})
const MediaCovrage = dynamic(() => import('@/core/component/common/CommonList/MediaCovrage'), {
  ssr: false
})

function OurPartner() {
  return (
    <div className='bg-[#F4F8FB]'>
      <div className='container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pb-[50px] max-[576px]:px-6 max-[479px]:py-[30px] max-[479px]:px-0 partner-our-resolution max-[479px]:pt-0'>
        <div>
          <h2 className='head-text text-[#212529] font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[25px] max-[375px]:text-[24px] max-[320px]:text-[22px] leading-[64.4px] w-[48%] font-semibold text-center mx-auto pb-[60px] max-[1200px]:w-[90%] max-[479px]:w-full max-[479px]:leading-10 max-[479px]:pb-8  max-[479px]:px-4 max-[320px]:px-4'>
            Our partners from Leading Financial Industries
          </h2>
        </div>

        <div className='bg-white rounded-2xl py-[66px] px-[133px] max-[1440px]:px-[133px] max-[1200px]:px-12 max-[576px]:py-12 max-[479px]:py-8 max-[479px]:px-4  max-[479px]:rounded-none'>
          <div className='grid grid-cols-6 justify-around gap-5 max-[1024px]:grid-cols-5 max-[820px]:grid-cols-4 max-[576px]:grid-cols-4 max-[320px]:grid-cols-3 '>
            <OurPartnerBrand />
          </div>
        </div>
        <KnowledgeBase />
        <TutorialsBase />
        <MediaCovrage />
      </div>
    </div>
  )
}

export default OurPartner
