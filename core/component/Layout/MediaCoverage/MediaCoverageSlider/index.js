import CommonArrowButton from '@/core/component/common/CommonList/CommonFieldComponent/ArrowButton'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'
import { useRef } from 'react'

const settings = {
  infinite: true,
  speed: 300,
  arrows: false,
  responsive: [
    {
      breakpoint: 1601,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1441,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 771,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    }
  ]
}

function MediaCoverageSlider({mediaCoverage}) {
  const [activeArrow, setActiveArrow] = useState('right')
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
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

  return (
    <div>
      <div
        className='container h-full  max-[885px]:px-6    mx-auto max-[991px]:max-w-full py-[50px] max-[834px]:py-[35px] max-[576px]:py-[52px] max-[479px]:py-[20px] max-[1024px]:px-8 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0'>
        <Slider {...settings} ref={sliderRef}>
          {mediaCoverage?.data?.sliderSection.map((item, index) => (
            <div key={index} className='px-8 w-full mx-auto '>
              <div
                className='relative bg-cover bg-center bg-gradient-to-b from-transparent to-gray-900  rounded-lg'
                style={{
                  backgroundImage: `url(${Img_URL}/${item?.image})`,
                  // backgroundImage: `url(${item.imge})`,

                  height: '450px'
                }}>
                <div className='z-50 w-full h-full bg-no-repeat bg-gradient-to-b from-transparent to-gray-900 rounded-lg'>
                <div className='absolute  bottom-0 left-0 px-8  p-4 w-full rounded-bl-lg rounded-br-lg'>
                  <h3 className='text-white text-[Poppins] text-[24px] leading-[33.6px] font-bold mb-2'>
                    {item.title}
                  </h3>
                  <p className='text-white  text-[Poppins] font-normal text-[15px] leading-[21px] mb-2'>
                    {item.subTitle}
                  </p>
                  <div className='flex items-center text-white  text-[Poppins] font-normal text-[15px] leading-[21px]'>
                    <span className='mr-2'>{item.time}</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className='flex justify-center gap-2 mt-4'>
          <div className=''>
            <CommonArrowButton activeArrow={activeArrow} handleArrowClick={handleArrowClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaCoverageSlider
