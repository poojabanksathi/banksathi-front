import Image from 'next/image'
import React from 'react'
import SuccessIcon from '../../../../public/assets/eligibility-seccess.svg'
import { useWindowSize } from '@/hooks/useWindowSize'
import { noCibilScore } from '@/utils/alljsonfile/noCibilScore'

import dynamic from 'next/dynamic'
const CibilProducts = dynamic(() => import('./NoCibilProducts'), { ssr: false })
const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
const userData = localUserData && JSON.parse(localUserData)
export const ScoreNotFoundCard = () => {
  return (
    <div className=' py-[30px] rounded-xl bg-white filter-card-box px-2 space-y-3 max-sm:space-y-2'>
      <p className='font-[poppins] text-[#212529] font-medium text-[18px] max-sm:text-[15px] leading-[25px] text-center'>
        {noCibilScore?.hey} {userData?.full_name}
      </p>
      <h2 className='font-[poppins] text-[#212529] font-semibold text-[24px] max-sm:text-[18px] leading-[36px] text-center'>
        {noCibilScore?.score_status}
      </h2>
      <p className='font-[poppins] text-[#212529] font-normal text-[15px] max-sm:text-[12px] leading-[21px] text-center'>
        {noCibilScore?.sub_title}
      </p>
    </div>
  )
}

const NoCibilScore = ({ noCibilProductsData }) => {
  const size = useWindowSize()

  return (
    <div className='container  mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
      <div className='xl:px-4'>
        <ScoreNotFoundCard />
      </div>
     {noCibilProductsData?.product_list?.length>0 && <><div className='py-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]   '>
        <Image
          src={SuccessIcon}
          alt='img'
          width={size?.width > 576 ? 70 : 50}
          height={size?.width > 576 ? 70 : 50}
          className='max-sm:pb-5 '
        />

        <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-xl xl:text-[28px] md:text-lg leading-[45px]  max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
          {noCibilScore?.title}
        </p>
      </div>
      <div className=' eligible-products-slider relative xl:px-4'>
        <CibilProducts noCibilProductsData={noCibilProductsData} />
      </div></>}
     
    </div>
  )
}

export default NoCibilScore
