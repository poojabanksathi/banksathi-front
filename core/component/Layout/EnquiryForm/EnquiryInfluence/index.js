import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BannerDestop from '../../../../../public/assets/contactus-banner.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useWindowSize } from '@/hooks/useWindowSize'
import stepper1 from '../../../../../public/assets/stepper-1.svg'
import stepper2 from '../../../../../public/assets/stepper-2.svg'
import stepper3 from '../../../../../public/assets/stepper-3.svg'

function EnquiryInfluence() {
    const style = {
        backgroundImage: `url(${BannerDestop.src})`,
        width: '100%'
    }

    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 771,
                settings: {
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 479,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ] // Number of slides to scroll at a time
    }

    const size = useWindowSize()
    return (
        <>

            <div className='bg-[#F4F8FB] text-[#212529] h-full'>
                <div className='container mx-auto max-[991px]:max-w-full 2xl:px-40 2xl:py-6 xl:py-30 xl:px-24 lg:px-20 md:px-16 sm:px-8 px-4 py-8 max-[576px]:text-center'>
                    <h3 className='head-text md:p-[12px] xl:!leading-tight font-semibold xl:!text-[30px] lg:!text-[30px] md:text-[25px] sm:text-[25px] !leading-[66px] max-[475px]:text-[24px] text-black max-[479px]:!leading-8  max-[479px]:text-[24px]  max-[576px]:!leading-10  max-[576px]:text-[32px] relative '>
                        Monetise your content with the BankSathi Influencer Programme
                    </h3>
                    <p className='text-black p-[12px]'>
                        As a BankSathi Influencer, we provide you with the tools to recommend the best financial products and services to your followers. Earn commissions on qualifying referrals by curating a personalised page on BankSathi. Publish shoppable content and be featured across the BankSathi platform. Engage with BankSathi users and monetise your content effortlessly.
                    </p>
                    <div className='mt-2'>
                        <div>
                            <h3 className='head-text md:p-[12px] xl:!leading-tight font-semibold xl:!text-[30px] lg:!text-[30px] md:text-[25px] sm:text-[25px] !leading-[66px] max-[475px]:text-[24px] text-black max-[479px]:!leading-8  max-[479px]:text-[24px]  max-[576px]:!leading-10 max-[576px]:text-center  max-[576px]:text-[32px] relative '>
                                Build Your Influence
                            </h3>
                        </div>
                        <div className='home-banner-slide pb-5 pt-7 grid grid-cols-3  max-[576px]:grid-cols-1'>
                            {/* <Slider {...settings} className='homebanner-slider'> */}
                            <div className='pb-[30px] px-[30px] max-xs:!px-[15px] max-[320px]:px-0'>
                                <div className='flex justify-center'>
                                    <div className='w-[40px] h-[40px]'>
                                        <Image
                                            src={stepper1}
                                            height={130}
                                            width={130}
                                            className='mx-auto py-3 max-[479px]:py-2'
                                            alt='img'
                                        />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <p className='text-black mb-[4px] text-[18px] pt-[15px]'>Create Content</p>
                                    <p className='text-black mt-0'>
                                        Recommend financial products to <br />
                                        your audience.

                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-center'>
                                    <div className='w-[40px] h-[40px]'>
                                        <Image
                                            src={stepper2}
                                            height={130}
                                            width={130}
                                            className='mx-auto py-3 max-[479px]:py-2'
                                            alt='img'
                                        />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <p className='text-black mb-[4px] text-[18px] pt-[15px]'>Earn Commissions</p>
                                    <p className='text-black mt-0'>
                                        Maximise earnings with our competitive <br />
                                        commission rates.

                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-center'>
                                    <div className='w-[40px] h-[40px] '>
                                        <Image
                                            src={stepper3}
                                            height={130}
                                            width={130}
                                            className='mx-auto py-3 max-[479px]:py-2'
                                            alt='img'
                                        />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <p className='text-black mb-[4px] text-[18px] pt-[15px]'>Build Your Storefront</p>
                                    <p className='text-black mt-0'>
                                        Customise your page on BankSathi with <br />
                                        a personalised URL.
                                    </p>
                                </div>
                            </div>
                            {/* </Slider> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EnquiryInfluence
