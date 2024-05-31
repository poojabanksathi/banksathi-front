import VideoModal from '@/core/component/common/VideoModal'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
function HomeBanner() {
  const [showModalVideo, setShowModalVideo] = useState(false)
  const slides = ['Bank Accounts', 'Demat Accounts', 'Loans', 'Credit Cards']
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div className='bg-[#7F49CB] lg:mt-10 pt-10 main-header mt-8'>
      <div>
        <div className='lg:w-1/2 w-full min-[1550px]:w-[56%] lg:p-2 mx-auto'>
          <h1 className='text-white md:text-[32px] sm:w-5/5 w-[100%]  max-[576px]:text-[24px] max-[479px]:text-[18px] mx-auto text-center font-semibold leading-[48px] max-[479px]:leading-7   '>
            Become a financial advisor and start
          </h1>
         <h2 className='text-white md:text-[32px] sm:w-5/5 w-[100%]  max-[576px]:text-[24px] max-[479px]:text-[18px] mx-auto font-semibold leading-[48px] max-[479px]:leading-7 2xl:w-[55%] xl:w-[81%] lg:w-[40rem] md:w-[34rem] sm:w-[15rem] max-[479px]:w-[77%] max-xs:w-[77%] max-xs:mx-auto max-[320px]:w-[90%] selling-line-home'>
            Selling Online
            <span className='text-[#49D49D]'>
              &nbsp;<span id='slideText'>{slides[currentSlideIndex]}</span>
            </span>
          </h2>
          <p className='text-white sm:w-[60%] w-[80%] text-center mt-4 mx-auto text-[16px] second-heading'>
            No investment required
            <br />
            BankSathi - Earn Kar Befikar{' '}
          </p>
          <div className='sm:w-[55%] w-[80%] flex mx-auto mt-6  justify-center items-center'>
            <div>
              <Link
                target='_blank'
                href='https://click.trackier.io/c/QWpuAnRezz?click_id=click&sub_site_id=BS_Web&pid=qWqjLsqSRK&lbw=7d'
                prefetch={false}>
                <Image src='/assets/white-play.svg' className='w-[140px] h-full max-[320px]:w-[125px]' width={60} height={60} alt='image' />
              </Link>
              {/* <a target="_blank"
                       href="https://play.google.com/store/apps/details?id=com.app.banksathi">
                        <Image src="/assets/white-play.svg"
                             className="w-[140px] h-full"
                             width={60}
                             height={60}
                             alt=""/>
                    </a> */}
            </div>
            <div>
              <div>
                <div
                  className='ml-4 text-white text-[12px] flex items-center second-heading cursor-pointer'
                  onClick={() => setShowModalVideo(true)}>
                  Watch Video
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 20 20'
                    fill='none'
                    className='ml-4'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M13.2979 9.60789L9.14492 6.58902C8.99252 6.47854 8.79019 6.4619 8.62314 6.54775C8.45476 6.63294 8.34961 6.80598 8.34961 6.993V13.0287C8.34961 13.2177 8.45476 13.3901 8.62314 13.4753C8.69436 13.5113 8.77222 13.5292 8.85076 13.5292C8.95325 13.5292 9.05707 13.4966 9.14492 13.4321L13.2979 10.4158C13.429 10.3193 13.5055 10.1703 13.5055 10.0119C13.5062 9.85081 13.4276 9.70239 13.2979 9.60789Z'
                      fill='white'
                    />
                    <path
                      d='M10.0003 0C4.47639 0 0 4.47639 0 10.0003C0 15.5223 4.47639 19.9973 10.0003 19.9973C15.5229 19.9973 20 15.5216 20 10.0003C20.0007 4.47639 15.5229 0 10.0003 0ZM10.0003 18.3288C5.40015 18.3288 1.67049 14.6012 1.67049 10.0003C1.67049 5.40148 5.40015 1.66916 10.0003 1.66916C14.5998 1.66916 18.3288 5.40082 18.3288 10.0003C18.3295 14.6012 14.5998 18.3288 10.0003 18.3288Z'
                      fill='white'
                    />
                  </svg>
                </div>
                <VideoModal showModalVideo={showModalVideo} setShowModalVideo={setShowModalVideo} />
              </div>

              {/* <a
                target='_blank'
                href='https://www.youtube.com/watch?v=00PJ6qFigso'
                className='ml-4 text-white text-[12px] flex items-center second-heading'>
                Watch Video
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 20 20'
                  fill='none'
                  className='ml-4'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.2979 9.60789L9.14492 6.58902C8.99252 6.47854 8.79019 6.4619 8.62314 6.54775C8.45476 6.63294 8.34961 6.80598 8.34961 6.993V13.0287C8.34961 13.2177 8.45476 13.3901 8.62314 13.4753C8.69436 13.5113 8.77222 13.5292 8.85076 13.5292C8.95325 13.5292 9.05707 13.4966 9.14492 13.4321L13.2979 10.4158C13.429 10.3193 13.5055 10.1703 13.5055 10.0119C13.5062 9.85081 13.4276 9.70239 13.2979 9.60789Z'
                    fill='white'
                  />
                  <path
                    d='M10.0003 0C4.47639 0 0 4.47639 0 10.0003C0 15.5223 4.47639 19.9973 10.0003 19.9973C15.5229 19.9973 20 15.5216 20 10.0003C20.0007 4.47639 15.5229 0 10.0003 0ZM10.0003 18.3288C5.40015 18.3288 1.67049 14.6012 1.67049 10.0003C1.67049 5.40148 5.40015 1.66916 10.0003 1.66916C14.5998 1.66916 18.3288 5.40082 18.3288 10.0003C18.3295 14.6012 14.5998 18.3288 10.0003 18.3288Z'
                    fill='white'
                  />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className='sm:px-24 px-10'>
        <Image className='mt-10 w-full h-full' src='/assets/Web Gif (1).gif' width={60} height={60} alt='web gif' />
        {/* <div className="flex w-full justify-center relative mt-10 bg-red-400">
            <div className="w-[100%] relative"></div>
            <div className="w-[100%] relative  left-[-100px]"></div>
            <div className="w-[100%] bg-blue-400 relative left-[-200px]"><img className=" test-three"
                     src="assets/images/Mask group-1.png"
                     alt="image"></div>
            <div className="w-[100%] relative"><img className="absolute left-[-240px] bottom-0 "
                     src="assets/images/Mask group.png"
                     alt="image"></div>
            <div className="w-[100%] relative"><img className="absolute left-[-340px] bottom-0 "
                     src="assets/images/Mask group-4.png"
                     alt="image"></div>
        </div>  */}

        {/* <div className="swiper mobileSwiper mt-10">
            <div className="swiper-wrapper">
                <div className="swiper-slide"><img className="bottom-0"
                         src="assets/images/Mask group-3.png"
                         alt="image"></div>
                <div className="swiper-slide"><img src="assets/images/Mask group-2.png"
                         alt="image"></div>
                <div className="swiper-slide">Slide 3</div>
                <div className="swiper-slide">Slide 4</div>
                <div className="swiper-slide">Slide 5</div>
            </div>
            <div className="swiper-pagination"></div>
        </div>  */}
      </div>
    </div>
  )
}

export default HomeBanner
