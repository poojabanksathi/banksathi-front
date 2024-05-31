import Image from 'next/image'
import React from 'react'
import HomeWhiteIcon from '../../../../../../public/assets/home-white.svg'
import Link from 'next/link'

const CareerBanner = () => {
  const handleScrollEvent = () => {
    // add scroll into view
  }
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className=' w-[79px] h-[21px] flex justify-center items-center gap-1.5 inline-flex'>
          <div className='w-[18px] h-[18px] relative'>
            <div className='w-[18px] h-[18px] left-0 top-0 absolute'></div>
            <Image
              src={HomeWhiteIcon}
              width={18}
              height={18}
              alt='img'
              className='max-[479px]:w-[12px] max-[479px]:h-[12px]'
            />
          </div>
          <div className='w-[3px] h-[3px] bg-zinc-300 rounded-full' />
          <div className='text-white text-[13px] font-semibold leading-[20.80px]'>Career</div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='container h-full  mx-auto max-[991px]:max-w-full py-[100px] max-[1440px]:pt-[50px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4  about-banner-resolve'>
          <div className=' px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 items-centermax-[576px]:gap-8 max-[479px]:px-0 '>
            <div className='pb-[40px] text-center max-[479px]:pb-[30px]'>
              <div className='flex flex-col items-center text-center'>
                <span className='text-white text-[46px] font-semibold leading-[55.20px] max-sm:text-[22px] max-sm:leading-[32px]'>
                  Safest Place to
                  <br />
                </span>
                <span className='text-emerald-400 text-[46px] font-semibold leading-[55.20px] max-sm:text-[22px] max-sm:leading-[32px]'>
                  Put your thoughts
                </span>
              </div>
            </div>
            <div className='flex items-center justify-center mb-12'>
              <button
                onClick={() => {
                  handleScrollEvent
                }}
                className='!text-[#212529] cursor-pointer head-text font-[faktum] md:block h-[50px] inline-flex max-[820px]:text-[14px] max-[771px]:text-[12px] items-center bg-gray-100 border-0 py-2 px-3 rounded-lg text-base max-[991px]:text-sm md:mt-0'>
                <Link href='' prefetch={false} passHref>
                  Job Opennings
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CareerBanner
