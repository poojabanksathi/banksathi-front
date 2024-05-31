import React from 'react'
import awardTree from '../../../../../public/assets/awards-tree.svg'
import Image from 'next/image'
import { AwardsAchivmentData } from '@/utils/alljsonfile/awardsAchivment'

export default function AwardsAbout() {
  const trees = {
    backgroundImage: `url(${awardTree.src})`,
    width: '100%'
  }

  return (
    <>
      <div className='bg-[#F4F8FB]'>
        <div className='px-10 max-[1024px]:px-8 pb-[50px] max-[576px]:px-6 max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4  partner-our-resolution'>
          <div className=' py-[30px] px-[125px] rounded-3xl bg-white max-[1200px]:px-[100px] max-[1024px]:px-16 max-[576px]:px-8 max-[375px]:px-4 max-w-full mx-auto max-[771px]:max-w-full max-[280px]:px-4'>
            <div>
              <div className='card-left'>
                <div className='mt-4'>
                  <h4 className='head-text text-[#212529] font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] leading-[64.4px]  font-semibold  pb-5 max-[1200px]:w-[90%] max-[479px]:w-full max-[479px]:leading-10 text-center mx-auto'>
                    Awards & Achievements
                  </h4>
                  <div className='grid grid-cols-3  gap-12 max-[1200px]:gap-8 max-[834px]:gap-4 py-14 max-[834px]:gap-10  max-[834px]:grid-cols-2  max-[576px]:grid-cols-1 max-[576px]:gap-10 max-[479px]:grid-cols-1  max-[479px]:pt-5 award-resolv'>
                    {AwardsAchivmentData?.map((data, index) => {
                      return (
                        <div key={index}>
                          <div className='award-tree-sec'>
                            <Image
                              src={data?.awardimgstar}
                              width={89}
                              height={27}
                              className='mx-auto max-[834px]:w-[70px]'
                              alt='img'
                            />
                            <div
                              className='text-center bg-cover bg-center  relative flex justify-center items-center h-[270px] max-[1600px]:h-[216px] max-[1440px]:h-[180px] max-[1200px]:h-[150px] max-[1024px]:h-[140px] max-[991px]:h-[136px] max-[834px]:h-[165px] max-[771px]:h-[155px] max-[576px]:h-[260px]  max-[479px]:h-[200px]  max-[375px]:h-[152px] max-[360px]:h-[148px] max-[320px]:h-[126px] award-tree-box'
                              style={trees}>
                              <p className='text-[20px] max-[1440px]:text-[18px] font-[Poppins] font-normal pb-2 text-[#212529] w-[52%] max-[1440px]:w-[58%] max-[1200px]:w-[72%] max-[1200px]:text-[17px] max-[1024px]:text-[16px] max-[991px]:text-[16px] max-[375px]:text-[15px] sub-award-data'>
                                {data.awardTitle}
                              </p>
                              <p className='text-[14px] font-normal text-[#212529] absolute bottom-0 left-0 right-0'>
                                {data?.awardYear}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
