/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function HomePathSucess() {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 300,
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1601,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 771,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className='bg-[#F4F8FB] lines-bg'>
      <div className=' lg:pt-20 lg:mb-0 mb-10 pt-10 text-center w-[80%]  mx-auto'>
        <span className='pop bg-[#14363D] text-[13px] text-white py-2 px-4 rounded-full'>Why BankSathi</span>
        <p className='lg:text-[34px] w-[100%] text-black text-center mx-auto mt-6 lg:mb-20 mb-0'>
          Your Path to Financial Success
        </p>
        <div className='grid lg:grid-cols-2 gap-x-12 lg:gap-y-10 gap-6 mt-10 why-cards'>
          <div className='bg-white hover:bg-[#14363D] transition-all hover:text-white lg:p-6 p-3 lg:py-6 py-4 flex items-center rounded-[16px] why-grid'>
            <div className='w-[120px] lg:p-4 p-2'>
              <Image src='/assets/transfer.svg' className='w-full h-full' alt='image' width={80} height={80} />
            </div>
            <div className=' text-left pl-4'>
              <p className='lg:text-[20px] text-[16px] mb-1 md:leading-[50.2px] leading-[24px]'>Fastest Payout</p>
              <p className='pop lg:text-[15px] text-[13px]'>
                Enjoy payout credited in your account under minimum time.
              </p>
            </div>
          </div>
          <div className='bg-white lg:p-6 p-3 lg:py-6 py-4 transition-all hover:bg-[#14363D] hover:text-white flex items-center rounded-[16px]'>
            <div className='w-[120px] lg:p-4 p-2'>
              <Image src='/assets/product.svg' className='w-full h-full' alt='image' width={80} height={80} />
            </div>
            <div className=' text-left pl-4'>
              <p className='lg:text-[20px] text-[16px] mb-1 md:leading-[50.2px] leading-[24px]'>Wide Range of Products</p>
              <p className='pop lg:text-[15px] text-[13px]'>
                Understand and offer a range of financial products to your clients.
              </p>
            </div>
          </div>
          <div className='bg-white lg:p-6 p-3 hover:bg-[#14363D] transition-all hover:text-white lg:py-6 py-4 flex items-center rounded-[16px]'>
            <div className='w-[120px] lg:p-4 p-2'>
              <Image src='/assets/zero.svg' className='w-full h-full' alt='image' width={80} height={80} />
            </div>
            <div className=' text-left pl-4'>
              <p className='lg:text-[20px] text-[16px] mb-1 md:leading-[50.2px] leading-[24px]'>Infinite Profit, 0 Investment</p>
              <p className='pop lg:text-[15px] text-[13px]'>
                Achieve unlimited earnings without having to invest anything upfront.
              </p>
            </div>
          </div>
          <div className='bg-white lg:p-6 p-3 hover:bg-[#14363D] transition-all hover:text-white lg:py-6 py-4 flex items-center rounded-[16px]'>
            <div className='w-[120px] lg:p-4 p-2'>
              <Image src='/assets/training.svg' className='w-full h-full' alt='image' width={80} height={80} />
            </div>
            <div className=' text-left pl-4'>
              <p className='lg:text-[20px] text-[16px] mb-1 md:leading-[50.2px] leading-[24px]'>Live Trainings & Support</p>
              <p className='pop lg:text-[15px] text-[13px]'>
                Enabling learning via interactive sessions and immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:p-20 p-8 pt-0'>
        <p className='mt-10 font-semibold text-[16px] text-black md:leading-[50px] sm:leading-[40px] leading-[30px]'>- Testimonials</p>
        <div className='swiper testSwiper mt-10 max-[479px]:mt-5'>
          <div className='swiper-wrapper'>
            <Slider {...settings}>
              <div className='swiper-slide bg-none'>
                <div className='flex '>
                  <div className=''>
                    <Image src='/assets/test1.png' width={80} height={80} className='w-[40px] rounded-full' alt='image' />
                  </div>
                  <div className='text-left pl-7'>
                    <h3 className='text-[16px] text-black'>Ankita Goyal</h3>
                    <p className='pop text-[#7C7C7C] text-[12px]'>Financial Advisor</p>
                  </div>
                </div>
                <p className='lg:pl-16 text-left pop text-[16px] lg:w-[70%] mt-6 text-black'>
                  I would like to express my heartfelt gratitude to BankSathi for being one of the best platform to earn
                  money online by selling financial Products. As a girl, the convenience of making money from home has
                  been invaluable, and I am truly grateful for all that BankSathi has provided. Thank you BankSathi, for
                  empowering me to succeed financially.
                </p>
              </div>
              <div className='swiper-slide p-0 rounded-[16px] bg-none'>
                <iframe
                  className='w-full lg:h-[350px] h-[200px]'
                  src='https://www.youtube.com/embed/7mrF2LudebA'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen></iframe>
              </div>

              <div className='swiper-slide bg-none'>
                <div className='flex '>
                  <div className=''>
                    <img
                      src={'/assets/gaurav-das.svg'}
                      className='rounded-full w-[40px]'
                      alt='image'
                    />
                  </div>
                  <div className='text-left pl-7'>
                    <h3 className='text-[16px] text-black'>Gaurav Das</h3>
                    <p className='pop text-[#7C7C7C] text-[12px]'>Financial Advisor</p>
                  </div>
                </div>
                <p className='lg:pl-16 text-left pop text-[16px] lg:w-[70%] mt-6 text-black'>
                  BankSathi is an amazing Platform for every age group. it gives you the opportunity to learn & earn
                  through its online webinars and featured videos. I receive timely payouts, trust me this is the most
                  trusted app to start extra income. Thank you BankSathi and the team.
                </p>
              </div>
              <div className='swiper-slide p-0 rounded-[16px] bg-none'>
                <iframe
                  className='w-full h-[350px]'
                  src='https://www.youtube.com/embed/39S-xEw8Uz4'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen></iframe>
              </div>
            </Slider>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </div>
    </div>
  )
}

export default HomePathSucess
