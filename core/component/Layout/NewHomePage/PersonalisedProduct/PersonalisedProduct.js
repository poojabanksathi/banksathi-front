import Image from 'next/image'
import React from 'react'
import rightArrow from '../../../../../public/assets/rightArrow.svg'
import stepper1 from '../../../../../public/assets/stepper-1.svg'
import stepper2 from '../../../../../public/assets/stepper-2.svg'
import stepper3 from '../../../../../public/assets/stepper-3.svg'
import { useWindowSize } from '@/hooks/useWindowSize'
import Link from 'next/link'

const PersonalisedProduct = () => {
  const size = useWindowSize()
  const isDesktop = size?.width >= 768

  const getStartedComp = () => {
    return (
      <>
        <Link href='/credit-cards/recommendation' className='mb-2' prefetch={false}>
          <div className='head-text font-[faktum] text-center bg-[#49D49D] text-[#212529] py-2 pl-2 pr-2 rounded-lg text-lg w-[190px] h-[56px] flex items-center justify-center gap-4'>
            <button className=' cursor-pointer'>Get Started</button>
            <Image src={rightArrow} alt='img' className='w-[34px] h-[30px]' height={40} width={50} priority={true}/>
          </div>
          <div className="text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[20.80px] md:mt-[30px] mt-[20px]">
            *Note: You don’t need to provide your mobile number to get product suggestions.
          </div>
        </Link>
      </>
    )
  }
  return (
    <>
      <Image
        src={'/assets/star-bg-home.svg'}
        height={23}
        width={23}
        alt='img'
        priority={true}
        className='relative left-[89%] top-[20px] pb-[10px] max-[768px]:w-[26px] max-[768px]:h-[26px]'
      />
      <div className='lg:pb-[90px] md:py-10 lg:py-0 h-auto bg-[#fff] max-w-[1550px] mx-auto w-full max-[1024px]:px-8 max-[991px]:max-w-full  max-[375px]:px-0 max-[320px]:px-0'>
        <div className='flex items-center justify-center flex-row gap-x-[30px] max-[768px]:flex-col lg:px-[135px]'>
          <div className='flex flex-col gap-y-[30px] items-start justify-start'>
            <div className="text-neutral-800 text-[40px] max-sm:px-[3px] font-semibold font-['Faktum'] leading-[48px] lg:pt-[90px] max-md:text-[22px] max-md:text-center max-md:leading-[26.4px] max-md:pt-[30px]">
              Personalized product recommendation in few steps
            </div>
            {isDesktop && getStartedComp()}
          </div>
          <div className='flex flex-row gap-x-[10px]  max-md:mt-[24px] max-[768px]:w-full max-[768px]:overflow-x-scroll category-btn-scroll'>
            <div className='w-[183px] h-[250px] bg-slate-50 rounded-3xl max-md:h-[210px] step-container'>
              <Image
                src={stepper1}
                alt='img'
                className={`pt-[13px] max-md:w-[110px] max-md:h-[120px] animationClass`}
                height={130}
                width={130}
                priority={true} 
              />
              <div className="text-left px-[20px] pt-[15px] max-md:px-[20px] text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-normal max-md:text-xs ">
                Share a few information with us
              </div>
            </div>
            <div className='w-[183px] h-[250px] max-md:h-[210px] step-container bg-slate-50 rounded-3xl'>
              <Image
                src={stepper2}
                alt='img'
                className={`pt-[8px] max-md:w-[120px] max-md:h-[115px] animationClass`}
                height={110}
                width={150}
                priority={true} 
              />
              <div className="text-left px-[20px] max-md:px-[20px] pt-[22px] text-neutral-800 text-[15px]  leading-normal max-md:text-xs font-medium font-['Poppins']">
                Banksathi’s smart algorithm does the processing
              </div>
            </div>
            <div className='w-[183px] h-[250px] max-md:h-[210px] step-container bg-slate-50 rounded-3xl'>
              <Image
                src={stepper3}
                alt='img'
                priority={true} 
                className={`pt-[14px] max-md:w-[138px] max-md:h-[125px] animationClass`}
                height={110}
                width={150}
              />
              <div className="text-left px-[20px] max-md:px-[20px] pt-[15px] text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-normal max-md:text-xs">
                Get the best product recommendation
              </div>
            </div>
          </div>
          {!isDesktop && (
            <>
              <div className='flex flex-col items-center justify-center pt-[24px] gap-y-[24px] px-4 pb-[20px] '>
                {getStartedComp()}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default PersonalisedProduct
