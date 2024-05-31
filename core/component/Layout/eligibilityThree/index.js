import React from 'react'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'

const EligibilityCardThree = dynamic(() => import('./EligibilityCardThree'), {
  ssr: false
})

const CardsEligibilityBox = dynamic(() => import('@/core/component/common/CommonList/CardsEligibilityBox'), {
  ssr: false
})

function EligibilityThree() {
  return (
    <>
      <EligibilityCardThree />
      <div className='bg-[#F4F8FB]'>
        <div className='container mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  py-[35px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
          <div className='w-full h-auto  px-[80px] max-[1024px]:px-[50px] max-[834px]:p-[30px] max-[576px]:py-0 max-[576px]:px-0  card-cancel-eligibility'>
            <div className='flex justify-between pb-5 mx-auto  max-[1440px]:w-[90%] max-[1200px]:w-full max-[576px]:items-center  max-[1200px]:px-0 '>
              <h2 className='text-[#212529] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[22px] max-[375px]:text-[20px] max-[320px]:text-[18px] text-center font-semibold'>
                Related Card Offers
              </h2>
              <button className='max-[320px]:hidden cursor-pointer text-[#212529] text-[18px] p-4 w-[15%] h-full font-semibold border rounded-xl border-[#212529] max-[834px]:w-[20%] max-[576px]:w-[30%] max-[479px]:w-[36%] max-[375px]:text-[15px] max-[479px]:text-[16px]'>
                View More
              </button>
            </div>
            <CardsEligibilityBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default EligibilityThree
