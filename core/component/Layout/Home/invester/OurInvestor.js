import { Invastor } from '@/utils/alljsonfile/invastore'
import Image from 'next/image'
import React from 'react'

function OurInvestor() {
  return (
    <div className='bg-white'>
  <div className='container min-h-[500px] mx-auto max-[1024px]:px-8 py-[100px] invest-sec'>
    <h2 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold pb-[80px] text-[#212529] pb-[50px] pb-[30px]'>
      Our Investors
    </h2>
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

      {Invastor?.map((data, index) => {
        return (
          <div key={index} className='text-center'>
            <div className='mx-auto w-[140px] h-[140px] mb-3 md:w-[50%] lg:w-[50%] xl:w-[50%]'>
              <Image
                src={data.avatar}
                alt='img'
                className='w-full h-full'
                width={140}
                height={140}
              />
            </div>
            <h3 className='text-[20px] font-[Poppins] font-semibold md:text-[18px] text-[#212529] '>
              {data.name}
            </h3>
            <p className='text-[15px] font-[Poppins] md:text-[13px] text-[#212529] font-medium'>
              {data.professionsub}
            </p>
          </div>
        )
      })}
    </div>
  </div>
</div>

  
  )
}

export default OurInvestor
