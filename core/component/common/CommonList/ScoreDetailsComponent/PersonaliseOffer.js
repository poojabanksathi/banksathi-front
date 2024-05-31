import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { InsuranceOffersJson } from '@/utils/alljsonfile/cardinsightsjson'
import axios from 'axios'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import { useEffect } from 'react'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import CommonArrowButton from '../CommonFieldComponent/ArrowButton'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'


const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  centerMode: true,
  centerPadding: '0px',
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
        slidesToScroll: 1
      }
    }
  ]
}

function PersonaliseOffer({ querySlug, productList }) {
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
  const [profileformData, setProfileFormdata] = useState([])
  const filteredDataCard = productList?.product_list?.filter((obj) =>
    profileformData?.url_slug?.includes(obj.url_slug.split('/').pop())
  )
  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

  const router = useRouter()


  


useEffect(()=>{
  if(token){
    
  const decordtoken =  jwt(token);

  const timecurrrunt = Date.now();
  const timestampexp = decordtoken?.exp; 

  const CurruntTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timecurrrunt)

  function formatUnixTimestamp(timestampexp) {
    const dateObj = new Date(timestampexp * 1000); 
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(minutes)}:${formatTimeexp(seconds)} ${ampm}`;
    return formattedDate;
  }
  
  function formatTimeexp(time) {
    return time < 10 ? '0' + time : time;
  }
  
  const formattedDateExp = formatUnixTimestamp(timestampexp);

  if (CurruntTime === formattedDateExp) {
    router.push('/login');
    toast.success(ApiMessage?.logoutmessage)
    handleRemoveLocalstorage()
  }



  }
},[])



  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const GetUserSetUp = (e) => {
    e?.preventDefault()

    axios
      .post(
        BASE_URL + USERSET?.getusersetup,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setProfileFormdata(response?.data?.data?.eligible_product)
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(response?.data?.data))
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        }else if (error?.response?.status == 401) {
          router.push('/login')
      toast.success(ApiMessage?.logoutmessage)
      handleRemoveLocalstorage()

      } 
         else if (error?.response?.status == 403) {
        }
      })
  }


  useEffect(() => {
    if (token) {
      GetUserSetUp()
    }
  }, [])
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  return (
    <>
    <Toaster/>
    {filteredDataCard?.length > 0 &&(
      <>
      <div className={querySlug === 'others' ? 'py-0' : 'py-10'}>
      <div>
        <div className='pb-4 flex justify-between max-[479px]:px-4'>
          <p className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center '>
            Personalised Offers
          </p>
          {querySlug === 'credit-reports' || querySlug === 'credit-insights' ? (
            <p className='text-[#212529] text-[15px] font-medium leading-[21px]'>{filteredDataCard?.length} Offers</p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div>
        {(querySlug !== 'others' && querySlug === 'credit-reports') || querySlug === 'credit-insights' ? (
          <div className=' profile-slider relative max-[479px]:px-4'>
            <Slider ref={sliderRef} {...settings} className='slide-box-ourleader'>
              {filteredDataCard?.map((carddata, index) => {
                return (
                  <div key={index}>
                    <div className='top-recomended-cards eligibility-card-resolve mx-auto  relative w-[95%] py-[40px] h-full  max-[820px]:w-full  max-[576px]:w-[98%] max-[771px]:mx-auto bg-[#fff]  px-12 max-[1440px]:px-5 max-[991px]:px-8 max-[320px]:px-2 rounded-[24px]'>
                      <div className='h-[160px] max-[1024px]:w-[240px] max-[1024px]:h-[160px] max-[576px]:h-[170px] max-[576px]:w-[260px] max-[479px]:w-full max-[479px]:h-full mx-auto top-card-img card-eligible-img'>
                        <Image
                          src={`${Img_URL}/${carddata?.product_image}`}
                          alt='card name'
                          width='80'
                          height='60'
                          className='w-full h-full mx-auto'
                          unoptimized={true}
                        />
                      </div>
                      <div className='mt-2 '>
                        <div className='pb-[20px]'>
                          <h3 className='text-[#212529] text-[20px] leading-7 font-medium pt-3 text-center max-[576px]:text-[20px] max-[479px]:text-[18px] max-[375px]:text-[15px] max-[479px]:pb-0 max-[479px]:leading-6 eligible-cards-title toprecome-card-text'>
                            {carddata.card_name}
                          </h3>
                          <div className=' mt-1  '>
                            <p className='text-[#212529] lg:text-[15px] md:text-[14px] max-[479px]:text-[15px] max-[375px]:text-[12px] font-normal text-center sm:ml-2 max-xs:mt-2 resolve-card-sub'>
                              {carddata.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className='text-center my-[12px] py-3 px-4 bg-white rounded-lg border border-[#000]'>
                          <Link
                            href={`/${carddata?.apply_url}`}
                            prefetch={false}
                            className='!text-[#212529] hover:!text-[#212529] head-text   text-[18px] max-[576px]:text-[16px] font-semibold '>
                            Explore Card
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
            <CommonArrowButton activeArrow={activeArrow} handleArrowClick={handleArrowClick}/>
          </div>
        ) : (
          InsuranceOffersJson.map((insuranceOffer, index) => {
            return (
              <div key={index}>
                <div className='rounded-3xl bg-white card-insight mb-8'>
                  <div className='px-6 pt-5 cards-details-filter border-b max-[479px]:border-b-0'>
                    <div>
                      <button className='bg-[#E5FFF5] cursor-pointer text-[#49D49D] py-2 px-3 gap-2 text-xs flex items-center font-[Poppins] font-semibold'>
                        <Image src={insuranceOffer.offer} alt='payment' className='w-3.5 h-4' width={10} height={10} />
                        Insurance Offer
                      </button>
                    </div>
                    <div className='flex justify-between gap-5 max-[479px]:flex-col'>
                      <div className='flex items-center gap-6 max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-0'>
                        <div className='w-[100px] h-[99px] flex'>
                          <Image
                            src={insuranceOffer?.insurancelogo}
                            alt='card image'
                            width={100}
                            height={99}
                            className='xl:w-full md:w-full max-[479px]:mx-auto'
                            unoptimized={true}
                          />
                        </div>
                        <div>
                          <p className='text-[24px] text-[#212529] font-medium leading-[33.6px] font-[Poppins] max-[479px]:text-[15px]'>
                            {insuranceOffer?.insurancetitle}
                          </p>
                          <p className='text-[15px] text-[#844FCF] font-medium leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                            {insuranceOffer?.insurancegetcover}
                          </p>
                        </div>
                      </div>
                      <div className='flex max-[479px]:hidden items-center gap-5'>
                        <Link href='#' prefetch={false}>
                          <button className='business-right-text cursor-pointer text-[15px] px-4 py-3.5 w-full rounded-lg text-white bg-[#49D49D] font-semibold max-[320px]:text-[14px] font-[Faktum]'>
                            {insuranceOffer?.insurancebutton}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-5 px-6  py-5 font-[Montserrat] max-[479px]:block'>
                    <div className='flex items-center gap-2 leading-[26px]'>
                      <Image src={insuranceOffer?.trueiconinsurance} width={15} height={15} alt='img' className='' />
                      <p className='text-[15px] font-medium'>{insuranceOffer?.rentlimit}</p>
                    </div>
                    <div className='flex items-center gap-2 leading-[26px]'>
                      <Image src={insuranceOffer?.trueiconinsurance} width={15} height={15} alt='img' className='' />
                      <p className='text-[15px] font-medium'>{insuranceOffer?.restorationunlimited}</p>
                    </div>
                    <div className='flex items-center gap-2 leading-[26px]'>
                      <Image src={insuranceOffer?.trueiconinsurance} width={15} height={15} alt='img' className='' />
                      <p className='text-[15px] font-medium'>{insuranceOffer?.claimbonus}</p>
                    </div>
                  </div>
                  <div className='hidden max-[479px]:block items-center gap-5 px-6 w-fit pb-5'>
                    <Link href='#' prefetch={false}>
                      <button className='business-right-text cursor-pointer text-[15px] px-4 py-3.5 w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold max-[320px]:text-[14px] font-[Faktum]'>
                        {insuranceOffer?.insurancebutton}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      </div>
      </>
      )}
    </>
  )
}

export default PersonaliseOffer
