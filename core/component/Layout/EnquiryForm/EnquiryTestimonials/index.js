import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BannerDestop from '../../../../../public/assets/contactus-banner.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { createImageFromInitials, getRandomColor } from '@/utils/util'

function EnquiryTestimonials() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1400,
        responsive: [
            {
                breakpoint: 1601,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1441,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
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
        <>

            <div>

                <div className='flex flex-col gap-y-[30px] max-[768px]:gap-y-[24px] justify-center items-center lg:px-0 md:px-[32px] px-5'>
                    <div className="text-center text-neutral-800 text-[40px] max-[756px]:text-[22px] max-[756px]:leading-[26.4px] font-semibold font-['Faktum'] leading-[48px]">
                        Testimonials
                    </div>

                    <div className='w-[80%] max-[1550px]:w-[90%] max-[1200px]:w-full max-[1024px]:gap-4 max-[576px]:gap-8 home-banner-slide knowledge-slide enquiry-slider'>
                        <Slider {...settings}>
                            <div className='w-full  md:w-full max-h-[300px] bg-white rounded-3xl border  px-[40px] max-sm:px-[20px]  py-[42px] flex flex-col gap-y-[30px]'>
                                <div className=" text-left text-neutral-800 text-[15px]  font-normal font-['Poppins'] leading-normal italic xl:pt-4">
                                    “Sharing BankSathi links of top financial products helps our community and lets us earn while focusing on new content creation.”
                                </div>
                                <div className='flex flex-row justify-start items-center gap-[12px] mt-14'>
                                    <Image
                                        id='preview'
                                        width={40}
                                        height={40}
                                        className='h-[40px] w-[40px] rounded-full'
                                        alt='profile-pic'
                                        src={createImageFromInitials(500, 'Spendwisely', getRandomColor())}
                                    />
                                    <div className='flex flex-col'>
                                        <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
                                            Spendwisely
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full max-h-[300px] bg-white rounded-3xl border  px-[40px] max-sm:px-[20px]  py-[42px] flex flex-col gap-y-[30px]'>
                                <div className=" text-left text-neutral-800 text-[15px] h-[100px] font-normal font-['Poppins'] leading-normal italic xl:pt-4">
                                    “Real-time analytics allow me to deliver content that resonates with our community.”

                                </div>
                                <div className='flex flex-row justify-start items-center gap-[12px] pt-[38px] mt-2'>
                                    <Image
                                        id='preview'
                                        width={40}
                                        height={40}
                                        className='h-[40px] w-[40px] rounded-full'
                                        alt='profile-pic'
                                        src={createImageFromInitials(500, 'Techyimran', getRandomColor())}
                                    />
                                    <div className='flex flex-col'>
                                        <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">Techyimram</div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full max-h-[300px] bg-white rounded-3xl border  px-[40px] max-sm:px-[20px]  py-[42px] flex flex-col gap-y-[30px]'>
                                <div className=" text-left text-neutral-800 text-[15px]  overflow-auto font-normal font-['Poppins'] leading-normal italic xl:pt-4">
                                    “The insider insights and unique earning opportunities through BankSathi's Influencer Programme are invaluable. It grows with you.”

                                </div>
                                <div className='flex flex-row justify-start items-center gap-[12px] pt-[38px] mt-2'>

                                    <Image
                                        id='preview'
                                        width={40}
                                        height={40}
                                        className='h-[40px] w-[40px] rounded-full'
                                        alt='profile-pic'
                                        src={createImageFromInitials(500, 'Creditking', getRandomColor())}
                                    />
                                    <div className='flex flex-col'>
                                        <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">Creditking</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EnquiryTestimonials
