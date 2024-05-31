import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { OurLeaderData } from '@/utils/alljsonfile/ourleader'


function OurLeader() {


  return (
    <>
      <div className='bg-[#F4F8FB] '>
        <div className='container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pb-[100px] max-[834px]:pb-[50px]  max-[576px]:px-6 max-[576px]:py-[30px] max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4 about-partener-resol'>
          <h4 className='head-text text-[#212529] font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] leading-[64.4px] w-[48%] font-semibold text-center mx-auto pb-[60px] max-[1200px]:w-[90%] max-[479px]:w-full  max-[479px]:leading-10 max-[479px]:pb-8 partner-title-about'>
            Our leaders
          </h4>

          <div className='flex flex-col gap-y-[74px] max-[576px]:gap-y-[60px]'>
            {OurLeaderData?.map((leaderData, index) => {
              return(
              <div key={index}>
                <div className='flex gap-10 justify-center items-center   max-[576px]:flex-col max-[479px]:gap-5'>
                  <div className=''>
                    <Image src={leaderData?.leaderImage} className='' width={299} height={303} alt='img' />
                  </div>
                  <div className='w-[30%] max-[1440px]:w-[36%] max-[1200px]:w-[45%] max-[576px]:w-full max-[576px]:text-center'>
                    <div className='pb-[30px] max-[479px]:pb-[18px]'>
                      <h4 className='text-[24px] font-semibold font-[faktum] text-[#272334] max-[834px]:text-[21px] max-[1024px]:text-[24px] max-[771px]:text-[20px]'>
                        {leaderData?.leaderName}
                      </h4>
                      <p className='text-[12px] text-[#272334]'>{leaderData?.leaderposition}</p>
                    </div>
                    <div className='pb-[35px] max-[479px]:pb-[22px]'>
                      <p className='text-[15px] text-[#272334]'>{leaderData?.leadersubdetail}</p>
                    </div>
                    <Link href={leaderData?.leaderlinkdin} prefetch={false} rel='nofollow'>
                      <Image src={leaderData?.leaderlinkdinIcon} className='w-8 h-auto max-[576px]:mx-auto' alt='img' width={32} height={32} />
                    </Link>
                  </div>
                </div>
              </div>
              )})}
           
          </div>
        </div>
      </div>
    </>
  )
}

export default OurLeader
