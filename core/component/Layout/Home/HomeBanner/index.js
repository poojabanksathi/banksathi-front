import React, { useState } from 'react'
import arrowDown from '../../../../../public/assets/Down-arrow-banner.gif'
import arrowDownBg from '../../../../../public/assets/down-arrow-bg.svg'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'

function HomeBanner() {
  const [spin, setSpin] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  }

  const style = {
    backgroundImage: `url(${arrowDownBg.src})`
  }

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

  const size = useWindowSize()

  return (
    <>
      <div
        className={`container p-5 mx-auto text-center font-bold 2xl:pb-[100px] 2xl:pt-[80px]  max-[1280px]:!pb-[100px]   max-[1600px]:!pb-[100px] md:py-[50px] max-[475px]:mt-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 home-banner-slide banner-laptop ${
          scrollY > 0 ? 'scroll-banner' : 'scroll-same'
        }`}>
        <Slider {...settings} className='homebanner-slider z-[1]'>
          <div>
            <div className='head-text font-[faktum] md:p-[24px] md:!leading-tight  font-semibold xl:text-[50px] lg:text-[50px] max-[991px]:text-[40px] max-[834px]:text-[38px] sm:text-[32px] !leading-[66px]  max-[771px]:!leading-[50px] max-[475px]:text-[24px] text-white max-[479px]:!leading-8  max-[320px]:text-[23px]  max-[576px]:!leading-10  max-[576px]:text-[32px] max-[280px]:text-[20px]'>
              {size.width <= 576 ? (
                <>
                  A Personalised <span className='text-[#49D49D] '>Banking Solution</span> Curated Specially for You{' '}
                </>
              ) : (
                <>
                  A Personalised <span className='text-[#49D49D] '>Banking Solution</span>
                  <br /> Curated Specially for You{' '}
                </>
              )}
            </div>
            <p className='text-white font-normal text-[24px] max-[991px]:text-[20px] w-1/2 max-[1200px]:w-[65%] max-[771px]:text-[18px] max-[991px]:w-[80%] mx-auto  max-[991px]:pb-5 max-[479px]:w-full max-[479px]:text-[16px] max-[375px]:text-[15px] max-[479px]:pt-4 max-[576px]:w-full max-[576px]:text-[18px] max-[576px]:pt-4 max-[1024px]:pb-4 max-[479px]:leading-6 max-[479px]:pb-4  max-[280px]:text-[13px]'>
              Identify products, understand benefits and get AI recommendations based on your requirement
            </p>
          </div>
          <div>
            <div className='head-text font-[faktum] md:p-[24px] md:!leading-tight font-semibold xl:text-[50px] lg:text-[50px] max-[991px]:text-[40px] max-[834px]:text-[38px] sm:text-[32px] !leading-[66px] max-[771px]:!leading-[50px] max-[475px]:text-[24px] text-white max-[479px]:!leading-8  max-[320px]:text-[23px]  max-[576px]:!leading-10  max-[576px]:text-[26px] max-[280px]:text-[20px]'>
              Tired of <span className='text-[#49D49D] '>Spam Calls?</span>
              <br /> So are we!{' '}
            </div>
            <p className='text-white font-normal font-[Poppins] text-[24px] max-[991px]:text-[20px] w-1/2 max-[771px]:text-[18px] max-[991px]:w-[80%] mx-auto pb-10 max-[991px]:pb-5 max-[479px]:w-full max-[479px]:text-[16px] max-[375px]:text-[15px] max-[479px]:pt-4 max-[576px]:w-full max-[576px]:text-[18px] max-[576px]:pt-4 max-[1024px]:pb-4 max-[479px]:!leading-6 max-[479px]:pb-2 max-[280px]:text-[13px]'>
              We follow a strict NO-SPAM-CALL rule. {"You'll"} not receive any unwanted sales calls from our end.
            </p>
          </div>
          <div>
            <div className='head-text font-[faktum] md:p-[24px]  md:!leading-tight font-semibold xl:text-[50px] lg:text-[50px] max-[991px]:text-[40px] max-[834px]:text-[38px] sm:text-[32px] !leading-[66px]  max-[771px]:!leading-[50px] max-[475px]:text-[24px] text-white max-[479px]:!leading-8  max-[320px]:text-[23px]  max-[576px]:!leading-10  max-[576px]:text-[32px] max-[280px]:text-[20px]'>
              {size.width <= 576 ? (
                <>
                  Choose the best <span className='text-[#49D49D] '>Financial Products</span> that suit your lifestyle{' '}
                </>
              ) : (
                <>
                  Choose the best <span className='text-[#49D49D] '>Financial Products</span>
                  <br /> that suit your lifestyle{' '}
                </>
              )}
            </div>
            <p className='text-white font-normal text-[24px] max-[991px]:text-[20px] w-1/2 max-[771px]:text-[18px] max-[991px]:w-[80%] mx-auto  max-[991px]:pb-5 max-[479px]:w-full max-[479px]:text-[16px] max-[375px]:text-[15px] max-[479px]:pt-4 max-[576px]:w-full max-[576px]:text-[18px] max-[576px]:pt-4 max-[1024px]:pb-4 max-[479px]:!leading-6 max-[479px]:pb-2 max-[280px]:text-[13px]'>
              Select best product with the help of our smart AI algorithm &amp; stay on top of your financial journey
            </p>
          </div>
        </Slider>

        <div
          onAnimationEnd={() => setSpin(0)}
          spin={spin}
          style={style}
          className={`bg-no-repeat bg-center max-[479px]:hidden  w-full h-[150px] max-[1200px]:mb-[${
            scrollY > 0 ? '5rem' : '2rem'
          }]  mx-auto  !mb-16  max-[1024px]:mx-auto max-[1024px]:my-14  max-[576px]:mb-[${
            scrollY > 0 ? '5rem' : '2rem'
          }] max-[771px]:mt-14 max-[576px]:mt-[42px] banner-scroll-arrow max-[576px]:mb-0`}>
          <Image
            src={arrowDown}
            alt='img'
            className=' w-[10%] h-full max-[1200px]:w-[14%] max-[1024px]:w-[18%] max-[771px]:w-[25%]  max-[576px]:w-[30%] max-[375px]:w-[40%]  m-auto'
            height={20}
            width={40}
          />
        </div>
      </div>
    </>
  )
}

export default HomeBanner
