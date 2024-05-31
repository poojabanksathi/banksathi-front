import Image from 'next/image'
import React, { useRef, useState } from 'react'
import ReactStars from 'react-stars'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CommonArrowButton from '@/core/component/common/CommonList/CommonFieldComponent/ArrowButton'
const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

function TopRecommendationSell({ RecomendedTopselling }) {
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
  const router = useRouter()
  const starCount = 5

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
    <>
      {RecomendedTopselling?.productInfo?.length ? (
        <div className='pb-[140px] pt-[70px] max-[771px]:pb-[100px] max-[479px]:pb-[50px] max-[375px]:pb-[70px] top-product-box max-[576px]:pt-0'>
          <h2 className='head-text font-[faktum] font-semibold text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-left text-[#212529] w-[87%] max-[1440px]:w-[90%] mx-auto pb-5 max-[1200px]:w-full max-[479px]:leading-[33px] max-[280px]:pb-2 max-[393px]:pb-3 top-title-recome'>
            Top Recommended & Best Selling Products
          </h2>
          <div className=' top-sliderContainer relative gap-4  list-t w-[87%]  mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full  top-recome-slider'>
            <Slider ref={sliderRef} {...settings}>
              {RecomendedTopselling?.productInfo?.length > 0 &&
                RecomendedTopselling?.productInfo?.map((selproduct, index) => {
                  return (
                    <div key={index}>
                      <div className='top-recomended-cards relative m-4  h-full max-[1440px]:w-[360px] max-[1200px]:w-[320px] max-[1024px]:w-[300px] max-[991px]:w-[288px]  max-[820px]:w-[95%]  max-[576px]:w-[98%] max-[771px]:mx-auto bg-[#fff] border  border-[#212529] py-6 px-6 rounded-[24px] cursor-pointer'>
                        <div className='w-[240px] h-[160px]   mx-auto max-[820px]:w-full max-[820px]:h-[140px] top-card-img'>
                          <Image
                            src={`${Img_URL}/${selproduct?.product_image}`}
                            alt={`card name`}
                            width='80'
                            height='60'
                            className='w-full h-full mx-auto max-[820px]:object-contain'
                            unoptimized={true}
                            onClick={()=>router.push(`${selproduct?.url_slug}`)}
                          />
                        </div>
                        <div className='mt-2 '>
                          <div className='pb-[20px]'>
                            <Link
                              href={`${selproduct?.url_slug}`}
                              className='text-[#212529] font-[Poppins] text-[20px] font-bold pt-3 text-center max-[576px]:text-[18px] max-[479px]:text-[16px] toprecome-card-text max-[479px]:leading-6'
                              prefetch={false}>
                              {selproduct.card_name}
                            </Link>
                            {selproduct?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='m-auto flex  justify-center lg:gap-2 gap-1  items-center '>
                                <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[15px] font-bold whitespace-nowrap sm:ml-2 '>
                                  {selproduct.rating}/5
                                </p>
                                <div className='flex  justify-center lg:gap-2 md:gap-1  '>
                                  <ReactStars
                                    count={starCount}
                                    size={24}
                                    value={selproduct.rating}
                                    edit={false}
                                    color1={'#ccc'}
                                    color2={'#49d49d'}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='text-center '>
                            <button
                              onClick={() => router.push(`/${selproduct.url_slug}`)}
                              className='!text-[#212529] cursor-pointer hover:!text-[#212529] head-text font-[faktum] py-3 px-8 bg-white rounded-lg border border-[#000] text-[14px] max-[576px]:text-[16px] font-semibold recome-card-btn'>
                              Know More
                            </button>
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
      ) : (
        ''
      )}
    </>
  )
}

export default TopRecommendationSell
