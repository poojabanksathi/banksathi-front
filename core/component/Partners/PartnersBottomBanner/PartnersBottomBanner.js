import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import puzzleBanner from '../../../../public/assets/puzzle.svg'
import puzzleBannerMobile from '../../../../public/assets/puzzle-mobile.svg'
import contactUsIcon from '../../../../public/assets/contact-us-icon.svg'
import handsIcon from '../../../../public/assets/hand-icon.svg'
import chatIcon from '../../../../public/assets/chat-bg.svg'
import chatIconMobile from '../../../../public/assets/chat-icon-mob.svg'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { StackedCarousel } from 'react-stacked-carousel'
import 'react-stacked-carousel/dist/index.css'
import ReactStars from 'react-stars'
import CommonPartnersForm from './PartnersForm/CommonPartnersForm'
import sliderLeftArrow from '../../../../public/assets/slider-left.svg'
import sliderRightArrow from '../../../../public/assets/slider-right.svg'
import { mockData } from '../PartnersMain/data'

const PartnersBottomBanner = ({ windowSize, formRef }) => {
  const ref = useRef(null)
  const [isMobileView, setIsMobileView] = useState(false)

  const mockReviewData = mockData

  useEffect(() => {
    if (windowSize <= 1024 || window?.innerWidth <= 1024) {
      setIsMobileView(true)
    }
  }, [windowSize])

  const renderLeftButton = () => {
    return (
      <div
        className={`${isMobileView ? 'w-[27px] h-[26px] left-[33%] top-[185px]' : 'w-[55px] h-[53px]  left-[50%]'} 
        px-6 py-5 bg-white rounded-[90px] shadow justify-center items-center gap-2.5 relative top-[180px] inline-flex 
        ${windowSize === 1024 && 'top-[110px]'}
        `}>
        <Image src={sliderLeftArrow} width={7} height={13} alt='left' className='max-w-fit' />
      </div>
    )
  }
  const renderRightButton = () => {
    return (
      <div
        className={`${
          isMobileView
            ? `w-[27px] h-[26px] max-[320px]:left-[295px] left-[612px] top-[185px] ${
                windowSize === 1024 && 'left-[720px]  top-[110px]'
              }`
            : 'w-[55px] h-[53px] left-[572px]'
        } px-6 py-5 bg-white rounded-[90px] shadow justify-center items-center gap-2.5 inline-flex relative top-[180px] `}>
        <Image src={sliderRightArrow} width={7} height={13} alt='left' className='max-w-fit' />
      </div>
    )
  }
  const getSliderContent = () => {
    return (
      <>
        <StackedCarousel
          autoRotate={isMobileView && windowSize < 1024}
          slidesToShow={5}
          // onCardChange={onCardChange}
          rotationInterval={3000}
          containerClassName={isMobileView ? 'cards-box-mobile' : 'cards-box'}
          cardClassName='reviewSliderClass'
          leftButton={isMobileView && windowSize < 1024 ? <></> : renderLeftButton()}
          rightButton={isMobileView && windowSize < 1024 ? <></> : renderRightButton()}>
          {mockReviewData?.map((item) => {
            return (
              <div key={item?.key}>
                <div
                  className={`flex flex-col gap-[22px] items-center bg-white rounded-2xl shadow ${
                    isMobileView
                      ? ' max-sm:w-[320px] max-[320px]:w-[268px] min-[425px]:w-[377px] min-[768px]:w-[727px] w-[70vw] h-auto ml-[20px] relative bottom-[69px]'
                      : ' w-[601px] h-auto reviewSliderClass  relative'
                  }`}>
                  <div className='flex  h-[300px] items-center justify-center flex-col gap-[25px] px-[80px] py-[25px] max-sm:px-[20px]'>
                    {/* <div className='flex h-[37px] mx-auto w-[143px] rounded-xl border border-zinc-400 pl-[10px]'>
                      <ReactStars count={5} size={24} value={4.5} edit={false} color1={'#ccc'} color2={'#49d49d'} />
                    </div> */}
                    <div className='flex text-center text-neutral-600 text-lg font-medium max-sm:text-[18px] max-sm:leading-[21px]'>
                      {item?.experienceTitle}
                    </div>
                    <div className='flex items-center gap-[20px]'>
                      {/* <Image
                        src={item?.profile}
                        width={50}
                        height={50}
                        className='w-[50px] h-[50px] rounded-[90px]'
                        alt='img'
                      /> */}
                      <div className='flex flex-col gap-1 mt-2'>
                        <div className='text-black text-center text-sm font-semibold uppercase'>
                          {item?.partnerName}
                        </div>
                        <div className='text-neutral-400 text-center text-[14px] font-semibold'>{item?.company}</div>
                      </div>
                    </div>
                  </div>
                  {/* {item?.brandIcon && (
                    <>
                      <div className='w-full border border-zinc-300' />
                      <div className='flex'>
                        <Image
                          src={item?.brandIcon}
                          width={163}
                          height={294}
                          alt='contact us icon'
                          className='p-[20px] mb-[5px]'
                        />
                      </div>
                    </>
                  )} */}
                </div>
              </div>
            )
          })}
        </StackedCarousel>
      </>
    )
  }
  const getInTouch = () => {
    return (
      <div
        className={`${
          !isMobileView
            ? 'mt-[90px] ml-[87px] relative bottom-[354px] flex flex-col items-start'
            : 'flex flex-col justify-center mt-[25px] p-[20px] relative bottom-[8%]'
        }`}>
        <div className={`flex items-center gap-[26px] justify-center max-sm:gap-[32px]`}>
          <Image src={handsIcon} width={61} height={81} alt='contact us icon' className='' />
          <div
            className={`text-black text-base font-semibold font-medium' ${
              isMobileView ? 'text-[25px] leading-[31px]' : ''
            }`}>
            98 % Partner Satisfaction
          </div>
        </div>
        <div className='flex max-sm:items-center justify-center flex-col max-[1024px]:items-center'>
          <div>
            <span className='text-center text-cyan-950 text-4xl font-semibold max-sm:text-[20px] max-sm:leading-[25px]'>
              Check{' '}
            </span>
            <span className='text-center text-emerald-400 text-4xl font-semibold max-sm:text-[20px] max-sm:leading-[25px]'>
              what our <br />
              Partners{' '}
            </span>
            <span className='text-center text-cyan-950 text-4xl font-semibold max-sm:text-[20px] max-sm:leading-[25px]'>
              has to say
            </span>
          </div>
          <div
            className={`${
              isMobileView
                ? 'text-center flex items-center justify-center mt-[12px] text-black text-base font-medium'
                : 'w-[381px] text-black text-base font-medium mt-[16px]'
            }`}>
            These partnerships can take many forms, but they typically involve one partner providing the technology or
            expertise, while the other partner provides the customer base or distribution channels.
          </div>
        </div>
        {isMobileView && (
          <>
            <div className='flex justify-end items-end mt-[20px]'>
              <Image src={chatIconMobile} width={67} height={62} alt='contact us icon' className='' />
            </div>
            <div className={`cards-box-mobile  ${windowSize === 1024 && 'relative left-[8%]'}`}>
              {getSliderContent()}
            </div>
          </>
        )}
      </div>
    )
  }

  const title = 'Our Vision'
  const subTitle =
    'At Banksathi, our mission revolves around enhancing awareness regarding financial products and simplifying the process of selecting and utilizing them. We provide a platform to our users to connect with financial institutions in order to access top-notch deals that facilitate the creation of wealth.'

  return (
    <div className={`mt-[75px] h-[1750px] max-sm:h-[2000px] max-sm:mt-[45px] ${windowSize === 1024 && '!h-[2000px]'}`}>
      {windowSize >= 1200 ? (
        <>
          <Image src={puzzleBanner} width='' height={697} alt='puzzle banner' className=' w-[106vw]' />
          <div className='w-[560px] h-[248px] bg-white bg-opacity-30 border border-white border-opacity-10 backdrop-blur-[12.80px] relative bottom-[592px] left-[56%]'>
            <div ref={formRef} className='flex flex-col my-[35px] ml-[40px]'>
              <div className='text-white font-[Poppins] text-2xl font-semibold'>{title}</div>
              <div ref={ref} />
              <div className='w-[396px] h-[133px] text-white font-[Poppins] text-[15px] font-medium mt-[16px]'>
                {subTitle}
              </div>
            </div>
            <CommonPartnersForm partnerRef={ref} />
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col'>
            <Image
              src={windowSize >= 768 ? puzzleBanner : puzzleBannerMobile}
              width=''
              height={600}
              alt='puzzle banner'
              className='flex'
            />
            <div
              className={`flex flex-col items-start p-[10px] gap-[10px] pb-[10px] w-[260px] bg-white bg-opacity-30 border border-white border-opacity-10 backdrop-blur-[12.80px] max-sm:w-[260px] relative max-sm:bottom-[322px] max-sm:left-[19%] min-[768px]:w-[280px] ${
                windowSize === 375 && '!left-[30%]'
              } min-[425px]:left-[39%] tabletClass min-[768px]:bottom-[322px] min-[768px]:left-[63%] ${
                windowSize === 1024 && '!left-[72%]'
              }`}>
              <div className='flex text-white font-[Poppins] text-2xl font-semibold mt-[10px]'>{title}</div>
              <div className='flex text-white font-[Poppins] text-[15px] font-medium'>{subTitle}</div>
            </div>
          </div>
          <CommonPartnersForm isMobile />
          {getInTouch()}
        </>
      )}
      {windowSize >= 1200 && (
        <>
          <div
            className={`flex items-center relative bottom-[175px] ml-[88px] w-[50vw] ${
              windowSize >= 1700 ? 'w-[22vw]' : ''
            }`}>
            <div className='flex items-start flex-col'>
              <div className='text-black text-[32px] font-semibold'>
                Contact Information:
                <br />
                Reach Us Here
              </div>
              <div className=' w-[358px] text-neutral-500 text-base font-medium mt-[25px]'>
                Feel free to contact us for inquiries, collaboration opportunities, or any assistance you may need
              </div>
            </div>
            <div className='flex'>
              <Image src={contactUsIcon} width={163} height={294} alt='contact us icon' />
            </div>
          </div>
          <Image
            src={chatIcon}
            width={151}
            height={143}
            alt='contact us icon'
            className='flex items-center justify-center mx-auto relative bottom-[11%]'
          />
          <div className='w-fit h-[127px] bg-white rounded-2xl flex items-center pl-[34px] pr-[70px] relative bottom-[343px] ml-[84px]'>
            <div className='flex items-start flex-col'>
              <div className='text-black text-lg font-semibold'>Official Mail</div>
              <div className='text-black text-lg font-semibold'>partner@banksathi.com</div>
            </div>
            {/* <div className='w-[127px] h-[0px] rotate-90 border border-zinc-300' />
            <div className='flex items-start flex-col'>
              <div className='text-black text-lg font-semibold'>Phone Number</div>
              <div className='text-black text-lg font-semibold'>+91-88582 89224</div>
            </div> */}
          </div>
          {getInTouch()}
          <div className='cards-box'>{getSliderContent()}</div>
        </>
      )}
    </div>
  )
}

export default PartnersBottomBanner
