/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from 'react'
import SpeackBg from '../../../../../public/assets/speack-bg.svg'
import Image from 'next/image'
import { SpeakCustomer } from '@/utils/alljsonfile/speakCustomer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import CommonArrowButton from '@/core/component/common/CommonList/CommonFieldComponent/ArrowButton'

const FAQ = dynamic(() => import('../../../common/FAQ/FAQ'), {
  ssr: false
})
function CustomersSpeak({ faqdata }) {
  const style = {
    backgroundImage: `url(${SpeackBg.src})`,
    width: '100%',
    height: '100%'
  }
  const style2 = {
    width: '100%',
    height: '100%'
  }
  const size = useWindowSize()
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
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
          slidesToShow: 1,
          slidesToScroll: 1,
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
  return (
    <div className='bg-[#F4F8FB]'>
      <div
        style={size?.width <= 576 ? style2 : style}
        className='container  min-h-[730px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[100px] bg-center bg-no-repeat max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[576px]:py-[50px]  max-[479px]:pb-[40px] max-[576px]:min-h-[515px] max-[479px]:min-h-[450px] max-[375px]:min-h-[450px] max-[320px]:min-h-[500px] customer-sec'>
        <p className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold  text-[#212529]'>
          Our customers speak
        </p>

        <div className=' sliderContainer px-20 justify-center pt-24 pb-16  gap-12 max-[1024px]:gap-4 max-[1600px]:!pt-24 max-[576px]:flex-col max-[576px]:gap-14  Speak-destop-slide w-full mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full max-[1440px]:px-0 max-[576px]:!pt-4 max-[479px]:!pt-4 max-[479px]:pb-8'>
          <Slider ref={sliderRef} {...settings}>
            {SpeakCustomer?.map((data, index) => {
              return (
                <div key={index} className='max-[576px]:pb-8 max-[479px]:pb-3'>
                  <div className='w-[95%] mx-auto h-[220px] max-[834px]:h-[300px] '>
                    <div className=' relative speack-box-down h-full'>
                      <p className='bg-[#fff] text-[#212529] font-[Poppins] rounded-3xl h-full flex items-center text-center text-[15px] max-[479px]:italic resolution-speck max-[375px]:p-4 max-[280px]:text-[14px]'>
                        {data.reviewtext}
                      </p>
                    </div>
                    <div className='flex items-center gap-4 pt-5 justify-center'>
                      <Image src={data.reviewavatar} className='w-[50px] h-[50px]' width={50} height={50} alt='img' />
                      <div className='font-[Poppins]'>
                        <p className='text-[18px] font-bold text-[#212529] max-[320px]:text-[16px]'>
                          {data.avatarname}
                        </p>
                        <p className='text-[14px] text-[#212529] max-[320px]:text-[13px]'>{data.avatarprofession}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
          <CommonArrowButton activeArrow={activeArrow} handleArrowClick={handleArrowClick}/>
        </div>
      </div>

      <FAQ faqdata={faqdata} />
    </div>
  )
}

export default CustomersSpeak
