import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomerReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 1400,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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
    <div>
      <Image
        src={'/assets/green-star-bg.svg'}
        height={23}
        width={23}
        alt='img'
        priority={true}
        className='relative left-[26%] pb-[10px] max-[768px]:w-[26px] max-[768px]:h-[26px] max-[768px]:left-[10px]'
      />
      <div className='flex flex-col gap-y-[30px] max-[768px]:gap-y-[24px] justify-center items-center'>
        <div className="text-center text-neutral-800 text-[40px] max-[756px]:text-[22px] max-[756px]:leading-[26.4px] font-semibold font-['Faktum'] leading-[48px]">
          Check what our customers has to say
        </div>

        <div className='w-[80%] max-[1550px]:w-[90%] max-[1200px]:w-full max-[1024px]:gap-4 max-[576px]:gap-8 home-banner-slide knowledge-slide'>
          <Slider {...settings}>
            <div className='xl:!w-[560px] md:w-full lg:h-[350px] max-[768px]:w-[343px] md:h-full h-[300px] max-sm:h-auto bg-white rounded-3xl border  px-[40px] max-sm:px-[20px]  py-[42px] flex flex-col gap-y-[30px]'>
              <div className=" text-left text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-normal italic xl:pt-4">
                “ My experience with BankSathi while applying for a cashback credit card was fantastic. The platform
                made the entire process simple and efficient, removing any confusion I had. What I valued most was the
                transparency and ease with which I could compare different cards and choose the right one. BankSathi has
                undoubtedly streamlined my financial journey.”
              </div>
              <div className='flex flex-row justify-start items-center gap-[12px] mt-14'>
                <Image
                  src={'/assets/Faiqa.png'}
                  height={35}
                  width={35}
                  alt='img'
                  priority={true}
                  className='w-[35px] h-[35px] rounded-full border-2 border-white'
                />
                <div className='flex flex-col'>
                  <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
                  Faiqa Ziya
                  </div>
                </div>
              </div>
            </div>
            <div className='xl:!w-[560px] md:w-full lg:h-[350px] max-[768px]:w-[343px] md:h-full h-[300px] max-sm:h-auto bg-white rounded-3xl border  px-[40px] max-sm:px-[20px]  py-[42px] flex flex-col gap-y-[30px]'>
              <div className=" text-left text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-normal italic xl:pt-4">
                “I recently applied for a credit card through BankSathi, and the ease of the process amazed me. The
                platform guided me smoothly through every step, ensuring I understood each aspect of the card I applied
                for. The straightforward and user-friendly interface, with the assurance of secure and timely
                transactions, makes BankSathi my go-to for all my financial needs.”
              </div>
              <div className='flex flex-row justify-start items-center gap-[12px] pt-[38px] mt-2'>
                <Image
                  src='/assets/test1.png'
                  height={35}
                  width={35}
                  alt='img'
                  priority={true}
                  className='w-[35px] h-[35px] rounded-full border-2 border-white'
                />
                <div className='flex flex-col'>
                  <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">Neha</div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews
