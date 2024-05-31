import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import mediaCoverageImg from '../../../../../public/assets/media-coverage-img.svg'


function CalulatorBanner() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`container h-full  mx-auto max-[991px]:max-w-full py-[80px] max-[834px]:py-[35px] max-[576px]:py-[52px] max-[479px]:py-[20px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 ${
          scrollY > 0 ? 'scroll-banner' : 'scroll-same'
        }`}>
        <div className='grid grid-cols-2 px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 items-center max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[479px]:px-0  credit-list-banner'>
          <div>
            <div className=''>
              <p className='credit-list-title head-text font-[faktum] text-[46px] max-[1440px]:text-[42px] max-[1280px]:text-[37px] max-[834px]:text-[28px] max-[834px]:leading-9 max-[771px]:text-[27px] max-[576px]:text-[34px] max-[479px]:text-[24px] max-[375px]:text-[24px] max-[320px]:text-[20px] max-[576px]:text-center text-white mb-[20px] max-[479px]:mb-[12px] font-semibold leading-[50px] max-[771px]:!leading-[40px] max-[393px]:!leading-8'>
                Media Coverage
              </p>
              <p className='text-[24px] max-[1024px]:text-[22px] max-[834px]:text-[18px] max-[771px]:text-[17px] max-[479px]:text-[16px] max-[375px]:text-[15px] mt-0 text-white  font-normal max-[576px]:text-center list-banner-sub'>
                Stay updated with the latest buzz and don't miss a beat in the Media Spotlight. Engaging stories await!
              </p>
            </div>
          </div>
          <div>
            <Image
              src={mediaCoverageImg}
              alt='card image'
              width={276}
              height={270}
              className='mx-auto max-[1200px]:w-[78%]'
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CalulatorBanner
