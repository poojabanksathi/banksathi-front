import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BannerDestop from '../../../../../public/assets/top-banner_1x.jpg'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useWindowSize } from '@/hooks/useWindowSize'

function EnquiryBanner(businessmetaheadtag) {
  const style = {
    backgroundImage: `url(${BannerDestop.src})`,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    backgroundPosition : 'center',
    height:'340px'
  }

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
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 771,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 479,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ] // Number of slides to scroll at a time
  }

  const size = useWindowSize()
  return (
    <>
      <div className='bg-[#F4F8FB] text-[#212529] h-full'>
        <div className='container mx-auto max-[991px]:max-w-full 2xl:px-40 2xl:py-10 xl:py-30 xl:px-24 lg:px-20 md:px-16 sm:px-8 py-8'>
          <div className='baaner-image' style={style}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className={`container mx-auto contact-banner h-full  max-[576px]:h-full max-[991px]:max-w-full bg-no-repeat bg-cover z-10 2xl:px-28 xl:py-30 xl:px-24 lg:px-20 md:py-14 md:px-16 sm:py-6 sm:px-8 p-6 max-[576px]:h-[440px] max-sm:h-[613px] max-xs:h-[300px] flex  items-center justify-center`}>
              <div>
                <h2 className='head-text md:p-[12px] xl:!leading-tight font-semibold xl:!text-[42px] lg:!text-[42px] md:text-[40px] sm:text-[38px] md:!leading-[50px] !leading-[66px] max-[475px]:text-[24px] text-white max-[479px]:!leading-8 max-[479px]:text-[24px]  max-[576px]:!leading-10 max-[576px]:text-[32px]  relative text-center'>
                Inspire Financial Strength & Become A BankSathi Influencer
                </h2>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EnquiryBanner
