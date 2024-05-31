import { ScoreCreditWhy } from '@/utils/alljsonfile/scoreCreditWhy'
import Image from 'next/image'
import React from 'react'

function CheckWhy() {
  return (
    <div>
      <h1 className='pb-10 text-[#212529] head-text font-[faktum] max-[834px]:leading-[50px] max-[479px]:leading-10 text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[32px] max-[479px]:text-[26px] max-[375px]:text-[26px] max-[320px]:text-[22px] leading-[50.4px] w-[48%] max-[1440px]:w-[60%] max-[1200px]:w-[76%] max-[576px]:w-full font-semibold text-center mx-auto emproving-title'>
        Why check Credit Score with Banksathi?
      </h1>
      <div className='grid grid-cols-4 max-[771px]:grid-cols-2 max-[479px]:grid-cols-1  max-[1200px]:gap-4 px-20 gap-[30px] max-[1200px]:px-0'>
        {ScoreCreditWhy.map((scoredata, index) => {
          return (
            <div key={index}>
              <div className='w-full mx-auto max-[1200px]:w-full h-full bg-white rounded-3xl py-10 px-5'>
                <div>
                  <Image src={scoredata.checkimg} width={40} height={40} className='mx-auto pb-4' alt='image' />
                  <p className='head-text text-[18px] max-[834px]:text-[16px] text-center text-[#212529] font-semibold leading-[22.59px] mt-0 w-[58%] max-[1200px]:w-full mx-auto pb-3'>
                    {' '}
                    {scoredata.checktitle}
                  </p>
                  <p className=' text-[15px] max-[834px]:text-[14px] text-center text-[#212529] font-normal mt-0 font-[Poppins]'>
                    {' '}
                    {scoredata.checksub}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckWhy
