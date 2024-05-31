import React, { useRef, useState, useMemo } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TutorialVideo } from '@/utils/alljsonfile/tutorialvedio'
import CommonArrowButton from '../../../../common/CommonList/CommonFieldComponent/ArrowButton.js'
import { useWindowSize } from '@/hooks/useWindowSize'

const Reviews = () => {
  const size = useWindowSize()

  const [popup, setPopup] = useState(false)
  const [popupData, setPopupDatal] = useState(false)

  const toggleModal = (e) => {
    setPopup(!popup)
    setPopupDatal(e?.tutorialvideo)
  }

  const settings = {
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
          slidesToShow: 2,
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
          slidesToScroll: 3
        }
      }
    ]
  }
  const [activeArrow, setActiveArrow] = useState('right')
  const sliderRef = useRef(null)
  const handleArrowClick = (arrow) => {
    setActiveArrow(arrow)
    if (sliderRef.current) {
      if (arrow === 'left') {
        sliderRef.current.slickPrev()
      } else if (arrow === 'right') {
        sliderRef.current.slickNext()
      }
    }
  }
  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-[20px] mb-[44px] max-sm:mb-[30px]'>
        <div className='flex items-center justify-center text-center text-neutral-800 text-[46px] font-semibold leading-[64.40px] font-[Faktum] max-sm:text-[22px] max-sm:leading-[30px] max-sm:mx-[68px] max-[771px]:mx-[10px]'>
          Check what our Team has to say
        </div>
        <div
          className={`flex items-center justify-center text-center mx-[345px] text-neutral-800 text-[18px] font-normal leading-[28.80px] max-sm:text-[15px] max-sm:leading-[24px] max-sm:mx-[16px] max-[771px]:mx-[10px] ${
            size?.width === 1024 ? 'mx-[100px]' : 'mx-[345px]'
          }`}>
          Behind building India&apos;s fastest-growing financial service provider company, there are countless exciting
          stories of the people who made it happen!
        </div>
      </div>
      <div className='mx-[150px] max-sm:ml-[16px] max-sm:mr-0 max-[771px]:ml-[16px] max-[771px]:mr-0 max-lg:mx-[50px]'>
        <div className='career-reviews justify-between max-[1440px]:px-0 gap-12  max-[1200px]:w-full max-[771px]:gap-4 max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[576px]:block home-banner-slide tutorial-slide mt-[15px] max-sm:ml-16px]'>
          {size?.width >= 1200 || size?.width >= 771 ? (
            <Slider {...settings} ref={sliderRef}>
              {TutorialVideo?.map((videodata, index) => {
                return (
                  <div key={index}>
                    <div onClick={() => toggleModal(videodata)}>
                      <div
                        className={`rounded-3xl !h-[210px] video-tutorial max-[576px]:!h-[200px] ${
                          windowSize === 1024 || windowSize === 1440 ? 'w-[345px]' : 'w-[390px]'
                        }`}>
                        <iframe
                          width='100%'
                          height='100%'
                          src={videodata.tutorialvideo}
                          title='YouTube video player'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                          allowFullScreen></iframe>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          ) : (
            <div className='overflow-x-auto'>
              <div className='flex items-center justify-center w-max overflow-x-scroll'>
                {TutorialVideo?.map((videodata, index) => {
                  return (
                    <div key={index}>
                      <div onClick={() => toggleModal(videodata)}>
                        <div className='rounded-3xl w-[230px] mr-[20px] !h-[130px] video-tutorial max-[576px]:!h-[130px]'>
                          <iframe
                            width='100%'
                            height='100%'
                            src={videodata.tutorialvideo}
                            title='YouTube video player'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen></iframe>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {TutorialVideo?.length > 3 && (size?.width >= 1200 || size?.width >= 771) && (
            <div className='flex justify-center gap-2 mt-4 mb-[100px]'>
              <CommonArrowButton activeArrow={activeArrow} handleArrowClick={handleArrowClick} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Reviews
