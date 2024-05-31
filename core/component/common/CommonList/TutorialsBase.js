import Image from 'next/image'
import React, { useState } from 'react'

import CloseIcon from '../../../../public/assets/closeIcon.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TutorialVideo } from '@/utils/alljsonfile/tutorialvedio'
import Link from 'next/link'

function TutorialsBase() {
  const [popup, setPopup] = useState(false)
  const [popupData, setPopupDatal] = useState(false)

  const toggleModal = (e) => {
    setPopup(!popup)
    setPopupDatal(e?.tutorialvideo)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
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
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
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
          initialSlide: 1
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
    <>
      {popup ? (
        <div className='fixed z-[9999] top-0 w-full left-0 h-full ' id='modal'>
          <div className='flex items-center justify-center min-h-full pt-4 px-4 pb-20 text-center sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-900 opacity-75' />
            </div>
            <p className='sm:inline-block sm:align-middle '></p>
            <div
              className='inline-block align-center bg-white rounded-lg p-10 text-left h-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'>
              <div className='2xl:col-span-2 xl:col-span-2 md:col-span-2 bg-none '>
                <div className='text-right mb-3'>
                  <button
                    type='button'
                    className='  text-[#212529] cursor-pointer rounded  mr-2'
                    style={{ color: 'red' }}
                    onClick={(e) => setPopup(false)}>
                    <Image src={CloseIcon} alt='img' className='  w-[18px] h-[18px]' height={18} width={18} priority={true} />
                  </button>
                </div>
                <div className='rounded-2xl !h-[210px] mb-4 video-tutorial'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={popupData}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className='pb-[100px] max-[771px]:pb-[80px] max-[479px]:pb-[50px] max-[479px]:px-4 '>
        <div className='flex justify-between w-full px-20 max-[1440px]:px-0 mx-auto pb-10 max-[1440px]:w-[90%] max-[1200px]:w-full  max-[479px]:justify-center max-[479px]:py-6 tutorial-resolution'>
          <h2 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[32px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold text-[#212529]'>
            Tutorials to help you
          </h2>
          <Link
            href='https://www.youtube.com/@banksathiplus/videos'
            className='!text-[#212529]  hover:!text-[#212529] head-text font-[faktum] max-[479px]:hidden text-[18px] p-4 w-auto h-full font-semibold border rounded-xl border-[#212529] tutorial-seemore !text-center'
            prefetch={false}>
            <button className='text-center cursor-pointer'>Watch More Videos</button>
          </Link>
        </div>

        <div className='  justify-between w-full px-20 max-[1440px]:px-0 mx-auto gap-12 max-[1440px]:w-[90%] max-[1200px]:w-full max-[771px]:gap-4 max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[576px]:block home-banner-slide tutorial-slide'>
          <Slider {...settings}>
            {TutorialVideo?.map((videodata, index) => {
              return (
                <div key={index}>
                  <div onClick={() => toggleModal(videodata)}>
                    <div className='rounded-2xl w-[93%] !h-[210px] mb-6 video-tutorial max-[576px]:!h-[200px] max-[479px]:w-full'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={videodata.tutorialvideo}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen></iframe>

                      <p className='text-[18px] text-[#0E0C1A] font-semibold max-[771px]:text-[16px] max-[576px]:text-center mt-5 font-[Poppins]'>
                        {videodata.tutorialtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>

        <div className='text-center  mt-8'>
          <Link
            href='https://www.youtube.com/@banksathiplus/videos'
            className='!text-[#212529] hover:!text-[#212529] text-[18px] p-4 w-auto h-full font-semibold border rounded-xl border-[#212529] max-[576px]:text-[15px] max-[479px]:text-[13px] capitalize hidden max-[479px]:block'
            prefetch={false}>
            <button className='text-center cursor-pointer'>Watch More Videos</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TutorialsBase
