import React from 'react'
import dynamic from 'next/dynamic'

const Leads = dynamic(() => import('@/core/component/Leads/Leads'), {
  ssr: false
})

export default function index({ referer, leadsField }) {

  return (
    <div className='container bg-[#F4F8FB] mx-auto px-14 max-[991px]:max-w-full max-[1440px]:px-12 max-md:px-8  max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[20px] pb-[60px] justify-around max-[576px]:pt-[10px] max-[576px]:pb-[30px] max-[479px]:pt-4 max-[479px]:pb-10 max-[479px]:h-auto'>
      <div className='   '>
        <Leads referer={referer} leadsField={leadsField} />
      </div>
    </div>
  )
}
