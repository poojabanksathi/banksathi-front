import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BannerDestop from '../../../../../public/assets/contactus-banner.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useWindowSize } from '@/hooks/useWindowSize'

function ContactUsV2Banner() {
  const style = {
    backgroundImage: `url(${BannerDestop.src})`,
    width: '100%'
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
      <div style={style}>
        <div
          className={`container mx-auto contact-banner max-[991px]:max-w-full bg-no-repeat bg-cover z-10 2xl:px-40 xl:py-30 xl:px-24 lg:px-20 lg:pb-36 md:pb-14 md:px-16 sm:py-6 sm:px-8 p-6 max-[576px]:h-[440px] max-sm:h-[613px] max-xs:h-[600px] ${
            scrollY > 0 ? 'contact-banner-scroll' : 'banner-contact-same'
          }`}>
          <div className=''>
            <div>
              <h1 className='head-text font-[faktum] md:p-[12px] xl:!leading-tight font-semibold xl:!text-[50px] lg:!text-[50px] md:text-[40px] sm:text-[38px] !leading-[66px] max-[475px]:text-[24px] text-white max-[479px]:!leading-8  max-[479px]:text-[24px]  max-[576px]:!leading-10  max-[576px]:text-[32px] relative text-center'>
                Hello! need assistance?
              </h1>
              <p className='text-white text-center text-[18px] max-[479px]:text-[16px]'>
                We are more than happy to help you.
              </p>
            </div>
            <div className='home-banner-slide pb-5 pt-7'>
              <Slider {...settings} className='homebanner-slider'>
                <div className='pb-[30px] px-[30px] max-xs:!px-[15px] max-[320px]:px-0'>
                  <div className='w-[40px] h-[40px] text-center border-2 border-white/[0.5] rounded-full'>
                    <Image
                      src='/assets/star-contact-one.svg'
                      width={16}
                      height={16}
                      className='mx-auto py-3 max-[479px]:py-2'
                      alt='img'
                    />
                  </div>
                  <div>
                    <p className='text-white mb-[4px] text-[18px] pt-[15px]'>Fast Revets</p>
                    <p className='text-white mt-0'>
                      All of your queries to be solved by us <br />
                      under 2-3 working days.
                    </p>
                  </div>
                </div>
                <div>
                  <div className='w-[40px] h-[40px] border-2 border-white/[0.5] rounded-full'>
                    <Image
                      src='/assets/star-contact-one.svg'
                      width={16}
                      height={16}
                      className='mx-auto py-3 max-[479px]:py-2'
                      alt='img'
                    />
                  </div>
                  <div>
                    <p className='text-white mb-[4px] text-[18px] pt-[15px]'>Helping Approach</p>
                    <p className='text-white mt-0'>
                      Our support staff is always there for <br /> your to resolve your issues.
                    </p>
                  </div>
                </div>
                <div>
                  <div className='w-[40px] h-[40px] border-2 border-white/[0.5] rounded-full'>
                    <Image
                      src='/assets/star-contact-one.svg'
                      width={16}
                      height={16}
                      className='mx-auto py-3 max-[479px]:py-2'
                      alt='img'
                    />
                  </div>
                  <div>
                    <p className='text-white mb-[4px] text-[18px] pt-[15px]'>Strong Support</p>
                    <p className='text-white mt-0'>
                      We have well trained support who have <br /> answer of all your queries.
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUsV2Banner
