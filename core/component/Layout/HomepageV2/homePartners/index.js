import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'

function HomePartners() {
  const isMobile = useWindowSize()

  const settings = {
    infinite: true,
    speed: 300,
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1601,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 771,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  }

  return (
    <div className='bg-black'>
      <div className='lg:p-10 lg:py-20 py-10  partner-container text-center'>
        <span className='bg-[#49D49D] text-white pop text-[12px] py-2 px-4 rounded-full'>Our Partners</span>
        <p className='mt-4 text-white lg:text-[38px] lg:w-[50%] text-[24px] w-[84%] max-[479px]:w-full max-[479px]:px-4 mx-auto max-md:leading-5 max-xs:leading-[30px] max-[479px]:mt-6'>
          BankSathi: a trusted partner for your financial needs
        </p>
        {isMobile.width <= 992 ? (
          <>
            <div className='swiper partnerSwiper mt-10 px-4'>
              <div className=' justify-between partner'>
                <Slider {...settings}>
                  <div className='!w-[90%]  flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/hdfc.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 455.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>

                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 452.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 454.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%]]  flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 453.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>

                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 456.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>

                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 459.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div className='swiper partnerSwiper mt-10 px-4'>
              <div className='justify-between partner'>
                <Slider {...settings}>
                  <div className='!w-[90%]  flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 461.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 457.png'
                      className='w-[174px] h-[30px]  object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/2560px-Aubank.svg.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/Frame 2610644.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 464.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 463.png'
                      className='w-[174px] h-[30px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='!w-[90%] h-[62px] flex items-center justify-center  bg-white p-4'>
                    <p className='text-center text-[15px] font-semibold'>& More</p>
                  </div>
                </Slider>
              </div>
            </div>
          </>
        ) : (
         <>
         <div className='swiper partnerSwiper mt-10 px-10'>
              <div className='flex justify-between partner'>
                  <div className='w-[200px]  flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/hdfc.png'
                      className='w-[174px]  object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 455.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>

                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 452.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 454.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px]]  flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 453.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>

                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 456.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>

                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 459.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
              </div>
            </div>
            <div className='swiper partnerSwiper mt-10 px-10'>
              <div className='flex justify-between partner'>
                  <div className='w-[200px]  flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 461.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 457.png'
                      className='w-[174px]  object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/2560px-Aubank.svg.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/Frame 2610644.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 464.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center bg-white p-4'>
                    <Image
                      src='/assets/logo/brand/image 463.png'
                      className='w-[174px] object-contain '
                      width={80}
                      height={80}
                      alt='img'
                      unoptimized
                    />
                  </div>
                  <div className='w-[200px] flex items-center justify-center  bg-white p-4'>
                    <p className='text-center text-[20px] font-semibold'>& More</p>
                  </div>
              </div>
            </div>
         </>
        )}
      </div>
    </div>
  )
}

export default HomePartners
