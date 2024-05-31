import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'

function HomeAdvisor() {
const isMoboile = useWindowSize()
  const settings = {
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
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
  const Slidesettings = {
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
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
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },


     
    ]
  }
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`nav li a[href="#${id}"]`);

            if (navLink) {
                const navItem = navLink.parentElement;

                if (entry.intersectionRatio > 0) {
                    // Deactivate all active navigation items
                    document.querySelectorAll('nav li').forEach(item => {
                        item.classList.remove('activeSection');
                    });

                    // Activate the current navigation item
                    navItem.classList.add('activeSection');
                } else {
                    navItem.classList.remove('activeSection');
                }
            }
        });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });

    return () => {
        // Clean up the observer when the component unmounts
        observer.disconnect();
    };
}, []);

  return (
    <div className='mid-purple'>
      <div className='who  lg:py-24 p-8 '>
        <h2 className='lg:w-[25%] text-center mx-auto lg:text-[30px] text-[24px] text-black md:leading-[50px] sm:leading-[40px] leading-[30px]'>Who Can Be Banksathi Advisor</h2>
        <div className='swiper whoSwiper  mt-10'>
          <Slider {...settings}>
            <div className='swiper-slide border border-[#DCDCDC] p-8 rounded-[16px]'>
              <Image className='w-10 h-full mx-auto' src='/assets/who-1.svg' width={50} height={50} alt='image' />
              <h3 className='mt-2 text-[20px]'>Loan Agents</h3>
              <p className='who-details mt-2'>
                With your extensive knowledge, you can provide valuable advice to individuals seeking the best loan
                options.
              </p>
            </div>  
            <div className='swiper-slide border border-[#DCDCDC] p-8 rounded-[16px]'>
              <Image className='w-10 h-full mx-auto' src='/assets/logo/who-4.svg' width={50} height={50} alt='image' />
              <h3 className='mt-2 text-[20px]'>Insurance Advisors</h3>
              <p className='who-details mt-2 mb-6'>
                Use your strong network of professionals, diligently start sourcing for all financial products.
              </p>
            </div>
            <div className='swiper-slide border border-[#DCDCDC] p-8 rounded-[16px]'>
              <Image className='w-10 h-full mx-auto' src='/assets/logo/who-2.svg' width={50} height={50} alt='image' />
              <h3 className='mt-2 text-[20px]'>Ex Bankers</h3>
              <p className='who-details mt-2'>
                You are knowledgeable about current banking market trends & assist individuals in financing their
                aspirations.
              </p>
            </div>
            <div className='swiper-slide border border-[#DCDCDC] p-8 rounded-[16px]'>
              <Image className='w-10 h-full mx-auto' src='/assets/logo/who-3.svg' width={50} height={50} alt='image' />
              <h3 className='mt-2 text-[20px] '>Wealth Advisor</h3>
              <p className='who-details mt-2 mb-6'>
                You expertly serve wealthy clients, fulfilling investment needs, and guiding financial goal attainment.
              </p>
            </div>
            <div className='swiper-slide border border-[#DCDCDC] p-8 rounded-[16px]'>
              <Image className='w-10 h-full mx-auto' src='/assets/logo/who-5.svg' width={50} height={50} alt='image' />
              <h3 className='mt-2 text-[20px]'>BFSI Professionals</h3>
              <p className='who-details mt-2'>
                {' '}
                As a finance professional, utilize your skills to offer a variety of financial products and services.
              </p>
            </div>
            <div className='swiper-slide border border-[#DCDCDC] p-8 rounded-[16px]'>
              <Image className='w-10 h-full mx-auto' src='/assets/logo/who-2.svg' width={50} height={50} alt='image' />
              <h3 className='mt-2 text-[20px]'>Ex Bankers</h3>
              <p className='who-details mt-2'>
                You are knowledgeable about current banking market trends & assist individuals in financing their
                aspirations.
              </p>
            </div>
          </Slider>
        </div>
        <div className='lg:mt-20 mt-4  bg-[white] border  rounded-[24px] border-[#E5E5E5]'>
          <div className='lg:p-10 p-6 text-center'>
            <p>
              <span className='bg-[#14363D] pop py-2 px-4 text-[12px] text-white rounded-full'>
                Easy to use • Process
              </span>
            </p>
            <h2 className='mt-4 lg:text-[26px] text-[18px] text-black sm:leading-[50px] leading-[30px] max-[479px]:mt-6'>4 Easy Steps to Start Earning</h2>
          </div>
          <hr />
          {isMoboile.width <= 992 &&
          <div className='swiper processSwiper lg:hidden block mt-10'>
            <div className='swiper-wrapper '>
            <Slider {...Slidesettings}>
              <div className='swiper-slide p-2 text-center'>
                <Image
                  src='/assets/BankSathi On Board GIF 2.gif'
                  className='w-[170px] mx-auto'
                  width={50}
                  height={50}
                  alt='image'
                />
                <h3 className=' mb-1 text-[22px] text-center font-semibold text-gray-900 dark:text-black    mt-4 w-full'>
                  Register
                </h3>
                <p className='mb-4  text-[16px] text-gray-700 dark:text-gray-400  mt-2  pop'>
                  Download “Banksathi” app and register using Mobile number and OTP.
                </p>
              </div>
              <div className='swiper-slide p-2 text-center'>
                <Image src='/assets/Third Video.gif' className='w-[170px] mx-auto' width={50} height={50} alt='image' />
                <h3 className=' mb-1 text-[22px] text-center font-semibold text-gray-900 dark:text-black    mt-4 w-full'>
                  Complete KYC
                </h3>
                <p className='mb-4  text-[16px] text-gray-700 dark:text-gray-400  mt-2  pop'>
                  Complete your Aadhar and PAN Validation
                </p>
              </div>
              <div className='swiper-slide p-2 text-center'>
                <Image src='/assets/Earning Screen.gif' className='w-[170px] mx-auto' width={50} height={50} alt='image' />
                <h3 className=' mb-1 text-[22px] text-center font-semibold text-gray-900 dark:text-black    mt-4 w-full'>
                  Browse and Share Product
                </h3>
                <p className='mb-4  text-[16px] text-gray-700 dark:text-gray-400  mt-2  pop'>
                  Find the best financial product and share it with your leads.
                </p>
              </div>

              <div className='swiper-slide p-2 text-center'>
                <Image src='/assets/KYC GIF Video.gif' className='w-[170px] mx-auto' width={50} height={50} alt='image' />
                <h3 className=' mb-1 text-[22px] text-center font-semibold text-gray-900 dark:text-black    mt-4 w-full'>
                  Start Earning
                </h3>
                <p className='mb-4  text-[16px] text-gray-700 dark:text-gray-400  mt-2  pop'>
                  Get payout on lead conversion, withdraw to Bank Account instantly
                </p>
              </div>
              </Slider>
            </div>
            <div className='swiper-pagination'></div>
          </div>}

          <div className='grid lg:flex relative hidden lg:grid-cols-2 main'>
          <div className='relative'>
            <div className='sticky top-[3rem] lg:p-20 p-6'>
              <nav className='section-nav'>
                <ol>
                  <li className=''>
                    <a href='#section-1'>
                      <span className='lg:mb-10 lg:ml-0 mb-6 ml-0  p-4 pb-0 pl-8'>
                        <h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black pl-8 '>
                          Register
                        </h3>
                        <p className='mb-4  text-[14px] text-gray-700 dark:text-gray-400 pl-8  pop'>
                          Download “Banksathi” app and register using Mobile number and OTP.
                        </p>
                      </span>
                    </a>
                  </li>
                  <li className=''>
                    <a href='#section-2'>
                      <span className='lg:mb-10 lg:ml-0 mb-6 ml-0  p-4 pb-0 pl-8'>
                        <h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black pl-8 '>
                          Complete KYC
                        </h3>
                        <p className='mb-4  text-[14px] text-gray-700 dark:text-gray-400 pl-8  pop'>
                          Complete your Aadhar and PAN Validation
                        </p>
                      </span>
                    </a>
                  </li>
                  <li className=''>
                    <a href='#section-3'>
                      <span className='lg:mb-10 lg:ml-0 mb-6 ml-0  p-4 pb-0 pl-8'>
                        <h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black pl-8 '>
                          Browse and Share Product
                        </h3>
                        <p className='mb-4  text-[14px] text-gray-700 dark:text-gray-400 pl-8  pop'>
                          Find the best financial product and share it with your leads.
                        </p>
                      </span>
                    </a>
                  </li>
                  <li className=''>
                    <a href='#section-4'>
                      <span className='lg:mb-10 lg:ml-0 mb-6 ml-0  p-4 pb-0 pl-8'>
                        <h3 className='flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black pl-8 '>
                          Start Earning
                        </h3>
                        <p className='mb-4  text-[14px] text-gray-700 dark:text-gray-400 pl-8  pop w-[90%]'>
                          Get payout on lead conversion, withdraw to Bank Account instantly
                        </p>
                      </span>
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
            </div>
            <div className='w-full  overflow-auto main-content'>
            <div className=' h-auto mt-20'>
              <section
                id='section-1'
                className='h-[500px] my-20'
                >
                <Image
                  src='/assets/BankSathi On Board GIF 2.gif'
                  className='w-[50%] object-contain h-full mx-auto'
                  width={170}
                  height={170}
                  alt='img'
                />
              </section>
              <section
                id='section-2'
                className='h-[500px] my-20'
                >
                <Image src='/assets/KYC GIF Video.gif' className='w-[50%] object-contain h-full mx-auto' width={170} height={170} alt='image' />
              </section>
              <section
                id='section-3'
                className='h-[500px] my-20'
                >
                <Image src='/assets/Third Video.gif' className='w-[50%] object-contain h-full mx-auto' width={170} height={170} alt='image' />
              </section>
              <section
                id='section-4'
                className='h-[500px] my-20'
               >
                <Image src='/assets/Earning Screen.gif' className='w-[50%] object-contain h-full mx-auto' width={170} height={170} alt='image' />
              </section>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeAdvisor
