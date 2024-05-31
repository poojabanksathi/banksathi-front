import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { KnowledgeBaseData } from '@/utils/alljsonfile/knowledgebasedata'

function KnowledgeBase({title}) {
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
      <div className='py-[100px] max-[479px]:py-[50px] knowledge-resolution max-[393px]:py-[30px] max-[479px]:px-4'>
        <div className='flex justify-between w-[78%] mx-auto pb-10 max-[1440px]:w-[90%] max-[1200px]:w-full max-[479px]:px-4 max-[479px]:justify-center max-[479px]:justify-center max-[375px]:px-4 max-[320px]:px-4  max-[479px]:pb-6 tutorial-resolution'>
          <h2 className='head-text font-[faktum] text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[32px] max-[479px]:text-[28px] max-[375px]:text-[24px] max-[320px]:text-[22px] text-center font-semibold text-[#212529]'>
          {title ? title :"Knowledge base"}
          </h2>
          <Link
            href='#'
            className='!text-[#212529] hover:!text-[#212529]  head-text font-[faktum] max-[479px]:hidden text-[18px] p-4 w-auto h-full font-semibold border rounded-xl border-[#212529]  tutorial-seemore !text-center'
            prefetch={false}
            >
            <button className='text-center cursor-pointer'>Read More Articles</button>
          </Link>
        </div>
        <div className='justify-between w-[78%] mx-auto max-[1440px]:w-[90%] max-[1200px]:w-full max-[1024px]:gap-4 max-[576px]:gap-8 home-banner-slide knowledge-slide'>
          <Slider {...settings}>
            {KnowledgeBaseData?.map((knowledgedata, index) => {
              return (
                <div key={index}>
                  <div className='max-w-sm max-[1440px]:max-w-[22rem] max-[1200px]:max-w-[20rem] max-[1024px]:max-w-[19rem]  overflow-hidden bg-white rounded-2xl w-full  p-[30px] max-[771px]:p-6  slider-knowl-responsive font-[Poppins]'>
                    <div className=''>
                      <Link href='#' prefetch={false} className='text-[#49D49D] hover:!text-[#49D49D]'>
                        <span className='inline-block text-[#49D49D]  rounded-full  text-sm font-normal uppercase tracking-[4px]'>
                          {knowledgedata?.toptitlesub}
                        </span>
                      </Link>
                    </div>
                    <div className='pt-[14px]'>
                      <Link href='#' prefetch={false} className='text-[#212529] hover:!text-[#212529]'>
                        <h3 className='font-medium leading-7 text-[20px] max-[1200px]:text-[18px] max-[1024px]:text-[17px] pb-6 w-[90%] max-[771px]:w-full max-[771px]:text-[12px]  max-[576px]:text-[16px] max-[576px]:pb-3 text-[#212529] max-[771px]:leading-7 know-title-resolution'>
                          {knowledgedata.knowledgetitle}
                        </h3>
                      </Link>
                      <p className='text-[#212529] text-[14px] flex items-center gap-2 pb-14 max-[771px]:pb-7 max-[576px]:pb-2'>
                        {knowledgedata?.postdate}{' '}
                        <span className='flex justify-center'>
                          <Image src={knowledgedata?.elipsicon} width={4} height={4} alt='img' />
                        </span>{' '}
                        {knowledgedata?.totaltime}
                        {knowledgedata?.readmore}
                      </p>
                    </div>

                    <Image className='w-full mx-auto' src={knowledgedata?.baseImage} alt='Sunset in the mountains' />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
        <div className='text-center cursor-pointer hidden max-[479px]:block mt-8'>
          <Link
            href='#'
            className='!text-[#212529] hover:!text-[#212529]head-text text-[18px] p-4 w-auto h-full font-semibold border rounded-xl border-[#212529]  max-[576px]:text-[15px] max-[479px]:text-[13px]  capitalize'
            prefetch={false}
            >
            <button className='text-center cursor-pointer'>Read More Articles</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default KnowledgeBase
