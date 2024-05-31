import Image from 'next/image'
import React from 'react'
import Whoweare from '../../../../../public/assets/who-we-are.svg'
import dynamic from 'next/dynamic'

const OurMission = dynamic(() => import('../OurMission'), {
  ssr: false
});
const WeAreFinancial = dynamic(() => import('../WeArefinancial'), {
  ssr: false
});

export default function WhoWeAre() {
  return (
    <>
      <div className='bg-[#F4F8FB] '>
        <div className='container md:min-h-screen min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full  max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 relative z-[1]'>
          <Image
            src={Whoweare}
            className='absolute  z-[-1] left-[7%] top-[-3%] max-[1440px]:top-0 max-[1200px]:left-[7%]  w-2/4  max-[771px]:w-3/5 max-[771px]:left-[8%] max-[576px]:w-3/4 max-[576px]:left-[5%] max-[576px]:top-[-1%] max-[479px]:top-[-1%] max-[479px]:left-[12%]'
            alt='img'
          />

          <div className='py-10  w-full max-w-[86%] mx-auto max-[1200px]:w-[85%] max-[991px]:w-[90%] max-[576px]:w-full max-[576px]:py-0 centric-customer'>
            <div className=' pb-10 max-[479px]:pb-5 w-[64%] mr-auto max-[1440px]:w-[76%] max-[1200px]:w-[80%] max-[1024px]:w-[88%] max-[576px]:w-full'>
              <h1 className='head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[320px]:text-[20px] font-semibold mx-auto max-[479px]:text-center !leading-[50.4px] weare-title text-[#212529]  max-[991px]:!leading-10'>
                We are customer-centric platform that utilizes AI technology to empower individuals to achieve financial
                empowerment.
              </h1>
            </div>

            <div className='grid grid-cols-2 gap-16 max-[479px]:grid-cols-1'>
              <div>
                <p className='text-[18px] text-[#212529] leading-[28.8px] font-[Poppins] max-[479px]:text-center max-[479px]:text-[16px]'>
                  BankSathi is a platform that provides unbiased information on various banking products and services
                  such as savings accounts, credit cards, personal loans, insurance products, etc. The platform aims to
                  simplify the process of finding the right banking products that suit the needs of individuals.{' '}
                </p>
              </div>
              <div>
                <p className='text-[18px] text-[#212529] leading-[28.8px] font-[Poppins] max-[479px]:text-center max-[479px]:text-[16px]'>
                  BankSathi also provides information about , to help customers avoid financial pitfalls and
                  empower them to take control of their financial lives. BankSathi utilizes AI technology to provide
                  accurate and up-to-date information, ensuring a hassle-free experience for its users.
                </p>
              </div>
            </div>
          </div>
          <OurMission />
          <WeAreFinancial />
        </div>
      </div>
    </>
  )
}
